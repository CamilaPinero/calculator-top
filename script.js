let number1;
let number2;
let operator;
function recibirOperacion(string) {
	let operatorFinder = /\+|-|\/|\*/g;
	operator = string.match(operatorFinder).join("");
	number1 = parseFloat(string.split(operatorFinder)[0]);
	number2 = parseFloat(string.split(operatorFinder)[1]);
}
recibirOperacion(prompt("Ingrese su operación"));

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
		alert(
			`El resultado de ${number1} ${operator} ${number2} es igual a ${result}`
		);
		return result;
	} catch (error) {
		console.log("Hubo un error");
		return;
	}
}
executeOperation(number1, operator, number2);
