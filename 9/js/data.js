import {getRandomInteger, createIdComment, getRandomArrayElement} from './util.js';
const PICTURE_COUNT = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENTS_MIN = 1;
const COMMENTS_MAX = 15;

const USER_NAMES = [
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


const createComment = () => ({
  id: createIdComment(),
  name: getRandomArrayElement(USER_NAMES),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(COMMENTS),
});


const createPictures = (_, i) => {
  const id = i + 1;

  return {
    id: id,
    url: `photos/${ id }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_MIN, LIKE_MAX),
    comment: Array.from({length:getRandomInteger(COMMENTS_MIN ,COMMENTS_MAX)}, createComment),
  };
};

const getPictures = () => Array.from({length: PICTURE_COUNT}, createPictures);

export { getPictures };
