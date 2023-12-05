import "./global.css";

const obj = {
	min_v: 320,
	max_v: 1280,
	min: 32,
	max: 54,
};

const mixScreenInput = document.getElementById("mix_screen_input");
const maxScreenInput = document.getElementById("max_screen_input");
const minFontSize = document.getElementById("min_font_size");
const maxFontSize = document.getElementById("max_font_size");

const output = document.getElementById("output");

const copyBtn = document.getElementById("copy_btn");

function generateOutputString(obj, v, r) {
	console.log(obj);
	return `font-size: clamp(${(obj.min / 16).toFixed(2)}rem, ${v.toFixed(
		2
	)}vw + ${(r / 16).toFixed(2)}rem, ${(obj.max / 16).toFixed(2)}rem);`;
}

function setDefaultValue(obj) {
	mixScreenInput.value = obj.min_v;
	maxScreenInput.value = obj.max_v;
	minFontSize.value = obj.min;
	maxFontSize.value = obj.max;
}

function generateTypography(obj) {
	try {
		const v = (100 * (obj.max - obj.min)) / (obj.max_v - obj.min_v);
		const r =
			(obj.min_v * obj.max - obj.max_v * obj.min) / (obj.min_v - obj.max_v);
		const outputStr = generateOutputString(obj, v, r);
		console.log(outputStr);
		output.value = outputStr;
	} catch (error) {
		window.alert(error);
		console.log(error);
	}
}

function setObj(e) {
	// console.log("hello", e.target.value, e.target.name);
	const key = e.target.name;
	obj[key] = e.target.value;
	generateTypography(obj);
	console.log("hello");
}

function handleCopy() {
	const outputString = output.value;
	navigator.clipboard.writeText(outputString).then(
		() => {
			window.alert("css copied!");
		},
		() => {
			window.alert("something went wrong...");
		}
	);
}

mixScreenInput.addEventListener("change", (e) => setObj(e, obj));
maxScreenInput.addEventListener("change", setObj);
minFontSize.addEventListener("change", setObj);
maxFontSize.addEventListener("change", setObj);

copyBtn.addEventListener("click", handleCopy);

setDefaultValue(obj);
generateTypography(obj);
