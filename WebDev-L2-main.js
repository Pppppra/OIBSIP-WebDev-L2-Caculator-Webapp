const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// Number buttons
numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const number = button.dataset.number;

        if (display.value === "Error") {
            display.value = number;
            return;
        }

        if (waitingForSecondNumber) {
            display.value = number;
            waitingForSecondNumber = false;
        } 
        else if (display.value === "0") {
            display.value = number;
        } 
        else {
            display.value += number;
        }
    });

});


// Operator buttons
operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const currentNumber = parseFloat(display.value);
        const selectedOperator = button.dataset.operator;

        if (display.value === "Error") {
            return;
        }

        if (firstNumber === null) {
            firstNumber = currentNumber;
        } 
        else if (operator !== null && !waitingForSecondNumber) {

            const result = calculate(firstNumber, currentNumber, operator);

            if (result === "Error") {
                display.value = "Error";
                firstNumber = null;
                operator = null;
                return;
            }

            display.value = result;
            firstNumber = result;
        }

        operator = selectedOperator;
        waitingForSecondNumber = true;
    });

});


// Equals button
equalsButton.addEventListener("click", function() {

    if (firstNumber === null || operator === null) {
        return;
    }

    const secondNumber = parseFloat(display.value);

    const result = calculate(firstNumber, secondNumber, operator);

    if (result === "Error") {
        display.value = "Error";
    } 
    else {
        display.value = result;
    }

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
});


// Clear button
clearButton.addEventListener("click", function() {

    display.value = "0";

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
});


// Backspace button
backspaceButton.addEventListener("click", function() {

    if (display.value === "Error" || display.value.length === 1) {
        display.value = "0";
    } 
    else {
        display.value = display.value.slice(0, -1);
    }

});


// Decimal button
decimalButton.addEventListener("click", function() {

    if (display.value === "Error") {
        display.value = "0.";
        return;
    }

    if (waitingForSecondNumber) {
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }

});


// Calculation function
function calculate(number1, number2, operator) {

    let result;

    switch (operator) {

        case "+":
            result = number1 + number2;
            break;

        case "-":
            result = number1 - number2;
            break;

        case "*":
            result = number1 * number2;
            break;

        case "/":

            if (number2 === 0) {
                return "Error";
            }

            result = number1 / number2;
            break;

        default:
            return number2;
    }

    return result;
}
