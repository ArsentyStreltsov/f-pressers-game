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

// used by Unity
var SetLoadProgress = function(progress)
{
	// console.log(`[ SetLoadProgress ] ${progress}`);
	
	let remapped = 0.0;
	if (progress <= 1.0)
	{
		remapped = 0.75 * progress;
	}
	else
	{
		remapped = 0.75 + 0.25 * (progress - 1.0);
	}

	let elemProgressFull = document.querySelector("#unity-progress-bar-full");
	elemProgressFull.style.width = `${100 * remapped}%`;
};

var NotifyLoaded = function()
{
	// console.log("[ NotifyLoaded ]");

	let elemCover = document.querySelector("#loading-cover");
	elemCover.style.display = "none";
};

let script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
	createUnityInstance(elemCanvas, config, SetLoadProgress)
	.catch(message =>
	{
		alert(message);
	});
};
document.body.appendChild(script);
