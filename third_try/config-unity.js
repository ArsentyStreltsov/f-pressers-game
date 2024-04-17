let buildUrl = "Unity";
let loaderUrl = buildUrl + "/fpressers.loader.js";
let config = {
	dataUrl: buildUrl + "/fpressers.data",
	frameworkUrl: buildUrl + "/fpressers.framework.js",
	codeUrl: buildUrl + "/fpressers.wasm",
	streamingAssetsUrl: "StreamingAssets",
	companyName: "F-Pressers",
	productName: "Disappearing In",
	productVersion: "1.0",
};

let elemCanvas = document.querySelector("#unity-canvas");

var SetLoadProgress = function (progress) {
	let remapped = 0.0;
	if (progress <= 1.0) {
		remapped = 0.75 * progress;
	} else {
		remapped = 0.75 + 0.25 * (progress - 1.0);
	}
	let elemProgressFull = document.querySelector("#unity-progress-bar-full");
	elemProgressFull.style.width = `${100 * remapped}%`;
};

var NotifyLoaded = function () {
	let elemCover = document.querySelector("#loading-cover");
	let video1 = document.getElementById('video1');
	let video3 = document.getElementById('video3');
	let fadeScreen = document.getElementById('fade-screen'); 
	let textDiv = document.getElementById('text_div'); 

	

	video1.style.display = 'none';
	video3.style.display = 'block';

	video3.onplay = function () {
		setTimeout(function () {
			video3.classList.add('expanded');
			textDiv.style.display = 'none';

		}, 500);
	};

	video3.onended = function () {
		elemCover.style.display = 'none';

		fadeScreen.style.display = 'block'; 
		fadeScreen.style.opacity = 1;
		fadeScreen.classList.add('fade-out');
		fadeScreen.addEventListener('animationend', function () {
			fadeScreen.style.display = 'none';
		});
	};
};

let script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
	createUnityInstance(elemCanvas, config, SetLoadProgress)
		.catch(message => {
			alert(message);
		});
};
document.body.appendChild(script);



document.addEventListener('DOMContentLoaded', function () {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	var videoPath1, videoPath3;

	// Проверяем, использует ли пользователь iPhone
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		videoPath1 = "TemplateData/Screenloader-for-IOS.mp4"; // Видео для iPhone
	} else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
		// Проверяем, использует ли пользователь Safari (не Chrome, который также включает слово "Safari" в userAgent)
		videoPath1 = "TemplateData/ScreenLoader-New-Animation.mp4"; // Отдельный путь видео для Safari
		videoPath3 = "TemplateData/ScreenLoader-New-Ending.mp4"; // Отдельный путь видео для Safari
	} else {
		videoPath1 = "TemplateData/ScreenLoader-New-Animation.webm"; // Видео для других устройств
		videoPath3 = "TemplateData/ScreenLoader-New-Ending.webm"; // Видео для других устройств
	}

	// Задаем путь видео для первого тега <video>
	var videoElement1 = document.getElementById('video1');
	videoElement1.querySelector('source').src = videoPath1;
	videoElement1.load(); // Перезагружаем видео после смены источника

	// Задаем путь видео для второго тега <video>
	var videoElement3 = document.getElementById('video3');
	videoElement3.querySelector('source').src = videoPath3;
	videoElement3.load(); // Перезагружаем видео после смены источника
});
