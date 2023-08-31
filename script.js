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

function clear() {
	display.innerHTML = "";
	document.getElementById("result").innerText = "";
	result = number1 = number2 = 0;
	operator = false;
}
document.getElementById("c").addEventListener("click", (e) => {
	clear();
});

document.getElementById("ce").addEventListener("click", (e) => {
	document.getElementById("result").innerText = "";
});

buttons.forEach((button) =>
	button.addEventListener("click", (e) => {
		if (document.getElementById("result").innerText == "error") {
			clear();
			return;
		}
	})
);

buttonsNum.forEach((button) =>
	button.addEventListener("click", (e) => {
		if (
			document.getElementById("result").innerHTML.includes(".") &&
			e.target.id === "."
		) {
			return;
		} else {
			document.getElementById("result").innerText += `${e.target.id}`;
			buttonsOpe.forEach((button) => button.removeAttribute("disabled"));
		}
	})
);

buttonsOpe.forEach((button) =>
	button.addEventListener("click", (e) => {
		e.target.setAttribute("disabled", "");
		display.innerText += `${document.getElementById("result").innerText}${
			e.target.id
		}`;
		operator = e.target.id;
	})
);

function executeOperation(number1, operator, number2) {
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
		case operator === "/" && number2 === 0:
			result = "error";
			return result;
		case operator === "/":
			result = number1 / number2;
			if (result === Infinity) {
				result = "error";
				break;
			}
			break;
	}

	if (result % 1 != 0) result = parseFloat(parseFloat(result).toFixed(3));

	if (result.toString().length > 10) result = "ov err";
	return result;
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
				console.log("1ero", number1, operator, number2, op, result);

				break;

			case Boolean(number1) && !result && !(event.target.id === operator):
				number2 = parseFloat(
					document.getElementById("result").innerText
				);
				console.log("2do", number1, operator, number2, op, result);
				break;

			case event.target.id === operator &&
				Boolean(number1) &&
				Boolean(number2):
				result = executeOperation(number1, op, number2);
				document.getElementById("result").innerText = result;
				display.innerHTML = result + operator;
				number1 = result;
				number2 = 0;
				op = event.target.id;
				console.log("3ero", number1, operator, number2, op, result);
				break;

			case !number2 && Boolean(number1) && Boolean(result):
				number2 = parseFloat(event.target.id);
				document.getElementById("result").innerText = number2;
				result = 0;
				console.log("4to", number1, operator, number2, op, result);
				break;

			default:
				break;
		}
		console.log("fuera", number1, operator, number2);
	})
);

//if (result === "error") clear();
//case document.getElementById("result").innerText =="0":

document.getElementById("off").addEventListener("click", (e) => {
	display.innerHTML = "";
	document.getElementById("result").innerHTML = "";
	document.querySelectorAll("button").forEach((button) => {
		if (button.id !== "on") button.setAttribute("disabled", "");
	});
});

document.getElementById("on").addEventListener("click", (e) => {
	document
		.querySelectorAll("button")
		.forEach((button) => button.removeAttribute("disabled"));
});
