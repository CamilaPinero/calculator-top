let number1 = 0;
let number2 = 0;
let operator = false;
let op = 0;
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
equal.addEventListener("click", (event) => {
	result = executeOperation(number1, operator, number2);
	document.getElementById("result").innerText = result;
	display.innerHTML = result;
});

document.getElementById("c").addEventListener("click", (e) => {
	display.innerHTML = "";
	document.getElementById("result").innerText = "";
	result = number1 = number2 = 0;
	operator = false;
});

document.getElementById("ce").addEventListener("click", (e) => {
	document.getElementById("result").innerText = "";
});

buttonsNum.forEach((button) =>
	button.addEventListener("click", (e) => {
		document.getElementById("result").innerText += `${e.target.id}`;
	})
);

buttonsOpe.forEach((button) =>
	button.addEventListener("click", (e) => {
		display.innerText += `${document.getElementById("result").innerText}${
			e.target.id
		}`;
		operator = e.target.id;
	})
);

function executeOperation(number1, operator, number2) {
	try {
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
					result = "error";
				}
				break;
		}
		if (result - Math.floor(result) !== 0) result = result.toFixed(3);

		if (result.toString().length > 10) result = "ov err";
		return result;
	} catch (error) {
		console.log("Hubo un error");
		return;
	}
}

buttons.forEach((button) =>
	button.addEventListener("click", (event) => {
		switch (true) {
			case event.target.id === operator && !number1:
				number1 = parseFloat(
					document.getElementById("result").innerText
				);
				op = event.target.id;
				document.getElementById("result").innerText = "";

				console.log("primero", number1, operator, op);
				break;

			case Boolean(number1) && !result && !(event.target.id === operator):
				number2 = parseFloat(
					document.getElementById("result").innerText
				);
				console.log("segundo", number1, operator, number2, op);
				break;

			case event.target.id === operator &&
				Boolean(number1) &&
				Boolean(number2):
				result = executeOperation(number1, op, number2);
				document.getElementById("result").innerText = result;
				number1 = result;
				number2 = 0;
				op = event.target.id;
				console.log("tercero", number1, operator, number2, op);
				break;

			case !number2 && Boolean(number1) && Boolean(result):
				number2 = parseFloat(event.target.id);
				document.getElementById("result").innerText = number2;
				result = 0;
				console.log("cuarto", number1, operator, number2);
				break;

			default:
				console.log("ñoseñor");
		}
	})
);
