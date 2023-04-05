const html = document.querySelector("html");
const inputs = document.querySelectorAll("input");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const deleteButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperationText = document.querySelector("[data-previous-operation]");
const currentOperationText = document.querySelector("[data-current-operation]");
/*
Fast Click Library for eliminating the 300ms delay
between a physical tap and the firing of a click event on mobile browsers
*/
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      FastClick.attach(document.body);
    },
    false
  );
}
// A script to save themes to the browser's local storage
function loadTheme() {
  const theme = localStorage.getItem("data-theme");
  if (theme) {
    html.setAttribute("data-theme", theme);
    inputs.forEach((input) => {
      input.checked = input.getAttribute("id") === theme;
    });
  }
}
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    const theme = input.getAttribute("id");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  });
});

//Calculator class
class calc {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.reset()
  }
  delete() {
    if (this.currentOperand == "Infinity" || this.currentOperand == "-Infinity" || this.currentOperand == "NaN" || !this.currentOperand.toString().slice(0, -1)) {
      this.currentOperand = "0"
      return
    }
    this.currentOperand = this.currentOperand.slice(0, -1)
  }
  reset() {
    this.previousOperand = ''
    this.currentOperand = '0'
  }
  addNumber(number) {
    const operators = ['x','/','+','-']
    if (!operators.includes(number) && operators.includes(this.currentOperand.slice(-1))) {
      this.previousOperand = (this.previousOperand + this.currentOperand).replace(/x/g, '*')
      this.currentOperand = number
      return
    }
    if (this.currentOperand == 'Infinity' || this.currentOperand == 'NaN' || this.currentOperand == '-Infinity') {
      this.currentOperand = number
      return
    }
    if (number === '.' && this.currentOperand.includes('.')) return
    if (this.currentOperand === '0' && !operators.includes(number)) this.currentOperand = ''
    if (operators.includes(number) && operators.includes(this.currentOperand.slice(-1))) {
      this.currentOperand = `${this.currentOperand.slice(0, -1)}${number}`
      return
    }
    this.currentOperand += number
  }
  calculate() {
    const result = eval(this.previousOperand.replace(/x/g, '*') + this.currentOperand.replace(/x/g, '*'));
    this.previousOperand = ''
    this.currentOperand = parseFloat(result.toFixed(10)).toString()
  }
  updateDisplay() {
    this.previousOperationText.innerText = this.previousOperand
    this.currentOperationText.innerText = this.currentOperand
  }
}

const calculator = new calc(previousOperationText, currentOperationText)

numbers.forEach(numberButton => {
  numberButton.addEventListener('click', () => {
    calculator.addNumber(numberButton.innerText)
    calculator.updateDisplay();
  })
});
operators.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    calculator.addNumber(operatorButton.innerText)
    calculator.updateDisplay();
  })
});
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})
resetButton.addEventListener('click', () => {
  calculator.reset();
  calculator.updateDisplay();
})
equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
})














// Load theme on page load
loadTheme();
