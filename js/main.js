const PICTURE_COUNT = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;

const USER_NAME = [
  'Михаил',
  'Данил',
  'Матвей',
  'Кирилл',
  'Александр',
  'Анна',
  'Яна',
  'Татьяна',
  'София',
  'Евгения',
];

const DESCRIPTIONS = [
  'Кто не падал, тот не поднимался!',
  'Есть цель? Добегайся его!',
  'Нравится, не нравится, терпи моя красавица',
  'Орлом был, орлом и остался',
  'Неважно кто ты, важно кто ты',
  'Дайте мне вести Спокойной ночи, малыши. Все заснут в девять часов - и дети, и взрослые',
  'Сознание определяет бытие',
  'Если ты шаришь, то ты шаришь',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


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

const createId = createRandomId(1, 25);
const createIdUrl = createRandomId(1, 25);
const createIdComment = createRandomId(1, 25);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: createIdComment(),
  name: getRandomArrayElement(USER_NAME),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(COMMENTS),
});

const createPictures = () => ({
  id: createId(),
  url: `photos/${ createIdUrl() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN, LIKE_MAX),
  comment: createComment(),
});

const getPictures = () => Array.from({length: PICTURE_COUNT}, createPictures);
