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