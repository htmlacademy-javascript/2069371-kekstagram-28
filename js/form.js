import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const submitButton = document.querySelector('.img-upload__submit');
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const commentLength = 140;
const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtags = {
  COUNT: 5,
  SYMBOLS: 20,
};

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
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
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag !== '') {
        result = result && hashtag[0] === '#';
      }
      return result;
    },
    true
  )
);

const validateMinLength = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length === 1) {
        result = result && hashtag !== '#';
      }
      return result;
    },
    true
  )
);

const validateLetterAndNumber = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length > 1) {
        result = result && regex.test(hashtag);
      }
      return result;
    },
    true
  )
);

const validateDivider = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length > 1) {
        result = result && !hashtag.includes('#', 1);
      }
      return result;
    },
    true
  )
);

const validateMaxLength = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => (result && hashtag.length <= hashtags.SYMBOLS),
    true
  )
);

const validateNumberOfHashtags = (value) => getHashtagsArr(value).length <= hashtags.COUNT;

const validateNotRepeat = (value) => (
  getHashtagsArr(value)
    .reduce(
      (result, hashtag, index, array) => {
        if (index + 1 < array.length) {
          result = result && !array.includes(hashtag, index + 1);
        }
        return result;
      },
      true,
    )
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};


uploadFile.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {setOnFormSubmit, hideModal, onModalKeydown};
