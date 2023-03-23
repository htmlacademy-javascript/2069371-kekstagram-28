//Для проверки длины строки
function lengthString (string, number) {
  if (string.length <= number){
    return true;
  }
  return false;
}

lengthString('проверяемая строка', 20);
lengthString('проверяемая строка', 18);
lengthString('проверяемая строка', 10);


//Проверка строк на палиндром
function palindromCheck (word) {
  const temp = word.toLowerCase().replaceAll(' ', '');
  let reverseWord = '';
  for (let i = temp.length - 1; i >= 0; i--) {
    reverseWord += temp[i];
  }

  if (temp === reverseWord) {
    return true;
  }
  return false;
}

palindromCheck('топот');
palindromCheck('ДовОд');
palindromCheck('Кекс');
palindromCheck('Лёша на полке клопа нашёл ');

// Извлекает цифры из строки
function stringToNumber (string) {
  let result = '';
  for (let i = 0; i <= string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

stringToNumber('2023 год');
stringToNumber('ECMAScript 2022');
stringToNumber('1 кефир, 0.5 батона');
stringToNumber('агент 007');
stringToNumber('а я томат');

function addSymbolToString (strDefault, minLength, symbolAdd) {
  let result = minLength - strDefault.length;
  if(result <= 0) {
    return strDefault;
  }
  result = symbolAdd.slice(0, result % symbolAdd.length) + symbolAdd.repeat(result / symbolAdd.length) + strDefault;
  return result;
}

addSymbolToString('1', 2, '0');
addSymbolToString('1', 4, '0');
addSymbolToString('q', 4, 'werty');
addSymbolToString('q', 4, 'we');
addSymbolToString('qwerty', 4, '0');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createIdComment = createRandomId(1, 111);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, createIdComment, getRandomArrayElement};
