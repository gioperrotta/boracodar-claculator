const keys = document.querySelectorAll('.key')
const operators = document.querySelectorAll('.operator')
const lastCalc = document.querySelector('#last-calc')
const keyEquals = document.querySelector('.key-equals')
const displayResult = document.querySelector('#display-result')

let operator = ''
let number1 = ''
let number2 = ''

clearAll()

keys.forEach(key => {
  key.addEventListener('click', () => {
    if (key.textContent === 'CE') {
      clearAll()
      return
    }
    if (key.textContent === 'C') {
      clearNumber()
      return
    }
    setDigit(key.textContent)
  })
})

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    if (operator.firstChild.alt === '+/-') {
      toggleSignNumber()
      return
    }
    setOperator(operator.firstChild.alt)
  })
})

keyEquals.addEventListener('click', () => {
  if (isNaN(number1) || isNaN(number2) || operator === '') {
    console.log('ESTOU AQUI 02', number1, number2, operator)
    return
  }
  calculateResult(number1, number2, operator);
})

function clearNumber() {
  if (number1 !== '' & number2 === '') {
    clearAll()
    return
  }
  if (number1 !== '' & operator !== '' ) {
    number2 = ''
    setDiplayLastOperation(number1, operator, number2)
  }
}

function clearAll() {
  number1 = ''
  number2 = ''
  operator = ''
  setDiplayLastOperation(number1, operator, number2)
  setDiplayResult()
}

function setDiplayLastOperation(num1, op, num2) {
  lastCalc.innerHTML = num1 + op + num2
}

function setDiplayResult(result = 0) {
  displayResult.innerHTML = result.toFixed(2);
  if (operator === '' & number1 === '' & number2 === '') {
    return
  }
  number1 = result
  operator = ''
  number2 = ''
  setDiplayLastOperation(number1, operator, number2)
}

function setNumber(num) {
  if (operator === '') {
    if (num === '.' & number1.indexOf('.') >= 0)
      return
    number1 = number1 + num
    setDiplayLastOperation(number1, operator, number2)
    return
  }
  if (num === '.' & number2.indexOf('.') >= 0)
    return
  number2 = number2 + num
  setDiplayLastOperation(number1, operator, number2)
}

function setOperator(op) {
  if (operator === '') {
    operator = op
    setDiplayLastOperation(number1, operator, number2)
    return
  }
}

function setDigit(digit) {
  if (!isNaN(digit)) {
    setNumber(digit)
  }
  if (digit === ',') {
    setNumber('.')
  }
}

function toggleSignNumber() {
  if (operator === '') {
    if (number1.startsWith('-')) {
      number1 = number1.slice(1, number1.length)
    } else {
      number1 = '-' + number1
    }
  } else {
    if (number2.startsWith('-')) {
      number2 = number2.slice(1, number2.length)
    } else {
      number2 = '-' + number2
    }
  }
  setDiplayLastOperation(number1, operator, number2)
}

function calculateResult(number1, number2, operator) {
  let result = ''
  switch (operator) {
    case '+':
      result = parseFloat(number1) + parseFloat(number2)
      break
    case '-':
      result = parseFloat(number1) - parseFloat(number2)
      break
    case 'x':
      result = parseFloat(number1) * parseFloat(number2)
      break
    case '/':
      result = parseFloat(number1) / parseFloat(number2)
      break
    default:
      break
  }
  setDiplayResult(result)
}







