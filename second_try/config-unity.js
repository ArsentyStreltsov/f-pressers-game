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

window.addEventListener('orientationchange', function () {
	checkOrientation();
	tryPlayVideo();
});

function checkOrientation() {
	var orientation = window.orientation;
	var prompt = document.getElementById('rotate-screen-prompt');
	if (orientation === 0 || orientation === 180) {
		prompt.style.display = 'flex'; // Показать уведомление при вертикальной ориентации
	} else {
		prompt.style.display = 'none'; // Скрыть уведомление при горизонтальной ориентации
	}
}

function tryPlayVideo() {
	var finalShotVideo = document.getElementById('final-shot-video');
	if (window.orientation === 90 || window.orientation === -90) {
		// Попытаться воспроизвести видео, если устройство находится в горизонтальной ориентации
		finalShotVideo.play().catch(function (error) {
			console.log("Видео не удалось запустить автоматически: ", error);
		});
	}
}

// При загрузке страницы проверяем ориентацию и пытаемся воспроизвести видео
document.addEventListener('DOMContentLoaded', function () {
	checkOrientation();
	tryPlayVideo();
});


var NotifyLoaded = function () {
	let elemCover = document.querySelector("#loading-cover");
	let movingLogo = document.getElementById('moving-logo');
	let finalShotVideo = document.getElementById('final-shot-video');
	let fadeScreen = document.getElementById('fade-screen'); 

	movingLogo.style.display = 'none';
	finalShotVideo.style.display = 'block';

	finalShotVideo.onplay = function () {
		setTimeout(function () {
			finalShotVideo.classList.add('expanded');
		}, 450);
	};

	finalShotVideo.onended = function () {
		elemCover.style.display = 'none';

		fadeScreen.style.display = 'block'; 
		fadeScreen.style.opacity = 1; 
		fadeScreen.classList.add('fade-out'); 
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
