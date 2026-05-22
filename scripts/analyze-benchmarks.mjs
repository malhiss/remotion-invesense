import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const benchmarksRoot = path.join(projectRoot, 'benchmarks');
const modelPath = path.join(projectRoot, 'tools', 'whisper-models', 'ggml-base.en.bin');
const safeSourceRoot = path.join(benchmarksRoot, '.cache', 'source');
const ffmpegPath = resolveBinary('ffmpeg.exe');
const ffprobePath = resolveBinary('ffprobe.exe');

const batches = process.argv.length > 2
	? process.argv.slice(2)
	: fs.readdirSync(benchmarksRoot).filter((name) => name.startsWith('batch-')).sort();

if (!fs.existsSync(modelPath)) {
	console.error(`Missing Whisper model at ${modelPath}`);
	process.exit(1);
}

fs.mkdirSync(safeSourceRoot, {recursive: true});

for (const batch of batches) {
	const batchRoot = path.join(benchmarksRoot, batch);
	const sourceDir = path.join(batchRoot, 'source');
	const analysisRoot = path.join(batchRoot, 'analysis');

	if (!fs.existsSync(sourceDir)) {
		console.warn(`Skipping ${batch}: no source directory found`);
		continue;
	}

	fs.mkdirSync(analysisRoot, {recursive: true});

	const files = fs.readdirSync(sourceDir, {withFileTypes: true})
		.filter((entry) => entry.isFile())
		.map((entry) => entry.name)
		.sort((a, b) => a.localeCompare(b));

	for (const fileName of files) {
		analyzeVideo(analysisRoot, path.join(sourceDir, fileName), fileName);
	}
}

function analyzeVideo(analysisRoot, sourcePath, fileName) {
	const baseName = path.basename(fileName, path.extname(fileName));
	const videoId = makeVideoId(baseName);
	const safeSourcePath = ensureSafeSourceAlias(sourcePath, `${videoId}${path.extname(fileName).toLowerCase()}`);
	const safeSourceRelative = relativeFromProject(safeSourcePath);
	const videoDir = path.join(analysisRoot, videoId);
	const framesDir = path.join(videoDir, 'frames');

	fs.mkdirSync(framesDir, {recursive: true});

	const probe = probeMedia(safeSourcePath);
	const duration = Number(probe.format.duration);
	const bitRate = probe.format.bit_rate ? Number(probe.format.bit_rate) : null;
	const videoStreams = probe.streams.filter((stream) => stream.codec_type === 'video').map((stream) => ({
		codec: stream.codec_name,
		width: stream.width,
		height: stream.height,
		avgFrameRate: stream.avg_frame_rate,
		rawFrameRate: stream.r_frame_rate,
	}));
	const audioStreams = probe.streams.filter((stream) => stream.codec_type === 'audio').map((stream) => ({
		codec: stream.codec_name,
		sampleRate: stream.sample_rate,
		channels: stream.channels,
	}));

	const sampleCount = Math.min(12, Math.max(6, Math.round(duration / 8)));
	const timestamps = evenlySpacedTimestamps(duration, sampleCount);

	for (let i = 0; i < timestamps.length; i += 1) {
		const framePath = path.join(framesDir, `frame-${String(i + 1).padStart(2, '0')}.jpg`);
		if (!fs.existsSync(framePath)) {
			runCommand(ffmpegPath, [
				'-y',
				'-ss',
				String(timestamps[i]),
				'-i',
				safeSourcePath,
				'-frames:v',
				'1',
				'-update',
				'1',
				'-q:v',
				'2',
				framePath,
			]);
		}
	}

	const contactPath = path.join(videoDir, 'contact.jpg');
	runCommand(ffmpegPath, [
		'-y',
		'-framerate',
		'1',
		'-i',
		path.join(framesDir, 'frame-%02d.jpg'),
		'-frames:v',
		'1',
		'-vf',
		'tile=3x4',
		'-update',
		'1',
		'-q:v',
		'2',
		contactPath,
	]);

	const sceneLogPath = path.join(videoDir, 'scene-log.txt');
	const sceneResult = runCommand(ffmpegPath, [
		'-hide_banner',
		'-i',
		safeSourcePath,
		'-vf',
		'scdet=t=12',
		'-an',
		'-f',
		'null',
		nullDevice(),
	], {captureStderr: true});
	fs.writeFileSync(sceneLogPath, sceneResult.stderr);

	const transcriptPath = path.join(videoDir, 'transcript.srt');
	const transcriptRelative = relativeFromProject(transcriptPath);
	if (!fs.existsSync(transcriptPath)) {
		runCommand(ffmpegPath, [
			'-hide_banner',
			'-y',
			'-i',
			safeSourceRelative,
			'-vn',
			'-af',
			`whisper=model=${relativeFromProject(modelPath)}:language=en:destination=${transcriptRelative}:format=srt`,
			'-f',
			'null',
			nullDevice(),
		]);
	}

	const transcriptTextPath = path.join(videoDir, 'transcript.txt');
	if (fs.existsSync(transcriptPath)) {
		const plainText = srtToPlainText(fs.readFileSync(transcriptPath, 'utf8'));
		fs.writeFileSync(transcriptTextPath, plainText);
	}

	const summaryPath = path.join(videoDir, 'summary.json');
	const summary = {
		fileName,
		relativePath: relativeFromProject(sourcePath),
		durationSeconds: duration,
		bitRate,
		videoStreams,
		audioStreams,
		sampleTimestampsSeconds: timestamps,
		sceneChangeTimesSeconds: parseSceneTimes(sceneResult.stderr),
		contactSheet: relativeFromProject(contactPath),
		frames: timestamps.map((_, index) => relativeFromProject(path.join(framesDir, `frame-${String(index + 1).padStart(2, '0')}.jpg`))),
		transcriptSrt: transcriptRelative,
		transcriptText: relativeFromProject(transcriptTextPath),
		sceneLog: relativeFromProject(sceneLogPath),
	};

	fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
	console.log(`Analyzed ${fileName}`);
}

function probeMedia(filePath) {
	const result = runCommand(ffprobePath, [
		'-v',
		'error',
		'-print_format',
		'json',
		'-show_entries',
		'format=duration,size,bit_rate:stream=index,codec_type,codec_name,width,height,avg_frame_rate,r_frame_rate,sample_rate,channels',
		filePath,
	]);
	return JSON.parse(result.stdout);
}

function evenlySpacedTimestamps(duration, sampleCount) {
	const start = duration < 20 ? 0.05 : 0.08;
	const end = duration < 20 ? 0.95 : 0.92;
	const timestamps = [];

	for (let index = 0; index < sampleCount; index += 1) {
		const ratio = sampleCount === 1 ? 0.5 : index / (sampleCount - 1);
		const position = start + ((end - start) * ratio);
		timestamps.push(Number((duration * position).toFixed(3)));
	}

	return timestamps;
}

function parseSceneTimes(stderr) {
	return stderr
		.split(/\r?\n/u)
		.map((line) => {
			const match = line.match(/lavfi\.scd\.time:\s*([0-9.]+)/u);
			return match ? Number(match[1]) : null;
		})
		.filter((time) => Number.isFinite(time));
}

function srtToPlainText(srt) {
	return srt
		.split(/\r?\n\r?\n/u)
		.map((block) => block
			.split(/\r?\n/u)
			.filter((line) => line && !/^\d+$/u.test(line) && !/-->/u.test(line))
			.join(' ')
			.trim())
		.filter(Boolean)
		.join('\n');
}

function slugify(input) {
	return input
		.normalize('NFKD')
		.replace(/[^\w\s-]/gu, '')
		.trim()
		.replace(/[-\s]+/gu, '-')
		.replace(/^-+/u, '')
		.replace(/-+$/u, '')
		.toLowerCase();
}

function makeVideoId(baseName) {
	const slug = slugify(baseName).slice(0, 48).replace(/-+$/u, '');
	const hash = createHash('sha1').update(baseName).digest('hex').slice(0, 8);
	return `${slug}-${hash}`;
}

function ensureSafeSourceAlias(sourcePath, fileName) {
	const aliasPath = path.join(safeSourceRoot, fileName);

	if (fs.existsSync(aliasPath)) {
		return aliasPath;
	}

	try {
		fs.linkSync(sourcePath, aliasPath);
	} catch {
		fs.copyFileSync(sourcePath, aliasPath);
	}

	return aliasPath;
}

function relativeFromProject(targetPath) {
	return path.relative(projectRoot, targetPath).split(path.sep).join('/');
}

function nullDevice() {
	return process.platform === 'win32' ? 'NUL' : '/dev/null';
}

function resolveBinary(fileName) {
	if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
		const candidate = path.join(process.env.LOCALAPPDATA, 'Programs', 'ffmpeg-bin', fileName);
		if (fs.existsSync(candidate)) {
			return candidate;
		}
	}

	return fileName;
}

function runCommand(command, args, options = {}) {
	const result = spawnSync(command, args, {
		cwd: projectRoot,
		encoding: 'utf8',
		stdio: options.captureStderr ? ['ignore', 'ignore', 'pipe'] : 'pipe',
	});

	if (result.status !== 0) {
		const stdout = result.stdout || '';
		const stderr = result.stderr || '';
		throw new Error(`Command failed: ${command} ${args.join(' ')}\n${stdout}\n${stderr}`);
	}

	return {
		stdout: result.stdout || '',
		stderr: result.stderr || '',
	};
}
