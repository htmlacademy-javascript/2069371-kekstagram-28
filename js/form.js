import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const commentLength = 140;
const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtags = {
  COUNT: 5,
  SYMBOLS: 20,
};

const errorMessage = {
  firstGrid: 'хэш-тег начинается с символа # (решётка)',
  lettersAndNumbers: 'строка после решётки должна состоять из букв и чисел',
  notOnlyGrid: 'хеш-тег не может состоять только из одной решётки',
  maxLength: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  divider: 'хэш-теги разделяются пробелами',
  notRepeat: 'один и тот же хэш-тег не может быть использован дважды',
  numberOfHashtags: 'нельзя указать больше пяти хэш-тегов',
  lengthSymbol: 'длина комментария не может составлять больше 140 символов',
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const getHashtagsArr = (hashtagsStr) => (
  hashtagsStr.toUpperCase()
    .split(' ')
    .filter((hashtag) => hashtag !== '')
);

const validateFirstSymbol = (value) => (
  getHashtagsArr(value).every((hashtag) => hashtag[0] === '#')
);

const validateMinLength = (value) => {
  const hashtagsArr = getHashtagsArr(value);
  return hashtagsArr.every((hashtag) => hashtag.length > 1 || hashtag !== '#');
};

const validateLetterAndNumber = (value) => (
  getHashtagsArr(value).every((hashtag) => {
    if (hashtag.length > 1) {
      return regex.test(hashtag);
    }
    return true;
  })
);


const validateDivider = (value) => (
  getHashtagsArr(value).every((result, hashtag) => {
    if (hashtag.length > 1) {
      result = result && !hashtag.includes('#', 1);
    }
    return result;
  },
  true
  )
);

const validateMaxLength = (value) => (
  getHashtagsArr(value).every((hashtag) => (hashtag.length <= hashtags.SYMBOLS))
);

const validateNumberOfHashtags = (value) => getHashtagsArr(value).length <= hashtags.COUNT;

const validateNotRepeat = (value) => (
  getHashtagsArr(value).every((hashtag, index, array) => (!array.includes(hashtag, index + 1)))
);

pristine.addValidator(hashTagInput, validateFirstSymbol, errorMessage.firstGrid);
pristine.addValidator(hashTagInput, validateMinLength, errorMessage.notOnlyGrid);
pristine.addValidator(hashTagInput, validateLetterAndNumber, errorMessage.lettersAndNumbers);
pristine.addValidator(hashTagInput, validateDivider, errorMessage.divider);
pristine.addValidator(hashTagInput, validateMaxLength, errorMessage.maxLength);
pristine.addValidator(hashTagInput, validateNumberOfHashtags, errorMessage.numberOfHashtags);
pristine.addValidator(hashTagInput, validateNotRepeat, errorMessage.notRepeat);


//для комментария
const validateLengthComment = (value) => value.length <= commentLength;
pristine.addValidator(commentInput, validateLengthComment, errorMessage.lengthSymbol);

const isTextFieldFocused = () => document.activeElement === hashTagInput || document.activeElement === commentInput;

const onModalKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

const showModal = function () {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalKeydown);
};

function hideModal () {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalKeydown);
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

uploadFile.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
