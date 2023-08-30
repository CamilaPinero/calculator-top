let number1;
let number2;
let operator;
let result = 0;

const display = document.getElementById("display");
const buttons = [...document.querySelectorAll("button")].filter(
	(button) =>
		button.id !== "c" &&
		button.id !== "ce" &&
		button.id !== "=" &&
		button.id !== "off" &&
		button.id !== "on"
);
const buttonsNum = buttons.filter(
	(button) =>
		button.id !== "-" &&
		button.id !== "+" &&
		button.id !== "*" &&
		button.id !== "/"
);
const buttonsOpe = buttons.filter(
	(button) =>
		button.id === "-" ||
		button.id === "+" ||
		button.id === "*" ||
		button.id === "/"
);
const equal = document.getElementById("=");

buttonsNum.forEach((button) =>
	button.addEventListener(
		"click",
		(e) => (document.getElementById("result").innerText = `${e.target.id}`)
	)
);

equal.addEventListener("click", (e) => {
	let result = executeOperation(number1, operator, number2);
	document.getElementById("result").innerText = result;
});

buttons.forEach((button) =>
	button.addEventListener("click", (e) => {
		display.innerHTML += `${e.target.id}`;
		recibirOperacion(display.innerHTML);
	})
);

buttonsOpe.forEach((button) =>
	button.addEventListener("click", (e) => {
		let res = executeOperation(number1, operator, number2);
		result = res;
		result === NAN
			? true
			: (document.getElementById("result").innerText = res);
	})
);

function recibirOperacion(string) {
	let operatorFinder = /\+|-|\/|\*/g;
	operator = string.match(operatorFinder).join("");
	number1 = parseFloat(string.split(operatorFinder)[0]);
	number2 = parseFloat(string.split(operatorFinder)[1]);
	console.log(number1, number2);
}

function executeOperation(number1, operator, number2) {
	try {
		let result = 0;
		switch (true) {
			case operator === "+":
				result = number1 + number2;
				break;
			case operator === "-":
				result = number1 - number2;
				break;
			case operator === "*":
				result = number1 * number2;
				break;
			case operator === "/":
				result = number1 / number2;
				if (result === Infinity) {
					throw error;
				}
				break;
		}

		return result;
	} catch (error) {
		console.log("Hubo un error");
		return;
	}
}

document
	.getElementById("c")
	.addEventListener("click", (e) => (display.innerHTML = ""));
