// Определение конфигурации Unity
let buildUrl = "Unity";
let config = {
	dataUrl: buildUrl + "/fpressers.data",
	frameworkUrl: buildUrl + "/fpressers.framework.js",
	codeUrl: buildUrl + "/fpressers.wasm",
	streamingAssetsUrl: "StreamingAssets",
	companyName: "F-Pressers",
	productName: "Disappearing In",
	productVersion: "1.0",
};

// Подгрузка и создание Unity Instance
let elemCanvas = document.querySelector("#unity-canvas");
let script = document.createElement("script");
script.src = buildUrl + "/fpressers.loader.js";
script.onload = () => {
	createUnityInstance(elemCanvas, config, SetLoadProgress)
		.catch(message => {
			alert(message);
		});
};
document.body.appendChild(script);

// Функция обновления прогресса загрузки Unity
var SetLoadProgress = function (progress) {
	let remapped = progress <= 1.0 ? 0.75 * progress : 0.75 + 0.25 * (progress - 1.0);
	document.querySelector("#unity-progress-bar-full").style.width = `${100 * remapped}%`;
};

// Обработка завершения загрузки Unity
var NotifyLoaded = function () {
	let elemCover = document.querySelector("#loading-cover");
	let finalShotVideo = document.getElementById('final-shot-video');

	document.getElementById('moving-logo').style.display = 'none';
	finalShotVideo.style.display = 'block';

	finalShotVideo.onplay = () => {
		setTimeout(() => {
			finalShotVideo.classList.add('expanded');
		}, 450);
	};

	finalShotVideo.onended = () => {
		elemCover.style.display = 'none';
		document.getElementById('fade-screen').classList.add('fade-out');
	};
};

// Проверка ориентации устройства и управление видео
function checkOrientation() {
	let prompt = document.getElementById('rotate-screen-prompt');
	if (window.orientation === 0 || window.orientation === 180) {
		prompt.style.display = 'flex';
	} else {
		prompt.style.display = 'none';
		tryPlayVideo();
	}
}

function tryPlayVideo() {
	let finalShotVideo = document.getElementById('final-shot-video');
	if (finalShotVideo.style.display === 'block' && (window.orientation === 90 || window.orientation === -90)) {
		finalShotVideo.play().catch(error => {
			console.log("Не удалось автоматически запустить видео: ", error);
		});
	}
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
