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
    switch (key.textContent) {
      case 'CE':
        clearAll()
        break
      case 'C':
        clearNumber()
        break
      case ',':
        setDisplayDigit('.')
      break

      default:
        setDisplayDigit(key.textContent)
      break;
    }
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
  if ((number1+operator+number2).indexOf('%') > 0) {
   calculatePercentageResult(number1, number2, operator)
   return
  }

  if (isSomeElementIsEmpty(number1, number2, operator)) return
 
  if (isInvalidExpression(number1, number2, operator)) return

  calculateResult(number1, number2, operator)
})




function isSomeElementIsEmpty(num1, num2, op) {
  if (num1 === '' || num2 === '' || op === '') {
    displayResult.innerHTML = 'Erro'
    return true
  }
}

function isInvalidExpression(num1, num2, op) {
  if ((num1 === '-' || num2 === '-') & op !== '') {
    displayResult.innerHTML = 'Erro'
    return true
  }
} 
 
function clearNumber() {
  if (number1 !== '' & number2 === '') {
    clearAll()
    return
  }
  if (number1 !== '' & operator !== '') {
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

function isPercentageNotValidValue(dg, num){
    if (num === '' & dg === '%') 
      return true
    if (num.endsWith('%'))
      return true
    return false
}

function setDiplayLastOperation(num1, op, num2) {
  lastCalc.innerHTML = num1 + op + num2
}

function setDiplayResult(result = 0) {
  displayResult.innerHTML = result.toFixed(2)
  if (operator === '' & number1 === '' & number2 === '') {
    return
  }
  number1 = result.toString()
  operator = ''
  number2 = ''
  setDiplayLastOperation(number1, operator, number2)
}

function setDisplayDigit(digit) {
  if (operator === '') {
    if (digit === '.' & number1.indexOf('.') >= 0)
      return
    if (isPercentageNotValidValue(digit, number1)) return
    number1 = number1 + digit
    setDiplayLastOperation(number1, operator, number2)
    return
  }
  if (digit === '.' & number2.indexOf('.') >= 0)
    return
  if (isPercentageNotValidValue(digit, number2)) return
  number2 = number2 + digit
  setDiplayLastOperation(number1, operator, number2)
}

function setOperator(op) {
  if (operator === '') {
    operator = op
    setDiplayLastOperation(number1, operator, number2)
    return
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

function calculatePercentageResult(num1, num2, op){
  let result = ''
  let n1, n2
  num1.endsWith('%') ? n1 = parseFloat(num1)/100 : n1 = parseFloat(num1) 
  num2.endsWith('%') ? n2 = parseFloat(num2)/100 : n2 = parseFloat(num2)
  switch (op) {
    case '':
      result =  n1
      break
    case '+' :
      num2.endsWith('%') ? result = n1 * (1 + n2) : result  = n1 + n2
      break
    case '-' :
      num2.endsWith('%') ? result = n1 * (1 - n2) : result  = n1 + n2
      break
    case 'x':
      result = n1 * n2
    break
    case '/':
      result = n1 / n2
    break
    default:
      result = Erro
    break
  }
  setDiplayResult(result)

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
      result = Erro
      break
  }
  setDiplayResult(result)
}







