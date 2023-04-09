import { onModalKeydown } from './form.js';
const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');

const onSuccessAnywhereClick = (evt) => {
  if (evt.target === successTemplate) {
    successTemplate.remove();
    document.removeEventListener('click', onSuccessAnywhereClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  }
};

function onSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (successTemplate) {
      successTemplate.remove();
    }
  }
}

const onSuccessButtonClick = () => {
  if (successTemplate) {
    successTemplate.remove();
  }
};

const showSuccessMessage = () => {
  successTemplate.cloneNode(true);
  body.append(successTemplate);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessAnywhereClick);
};

const onErrorAnywhereClick = (evt) => {
  if (evt.target === errorTemplate) {
    errorTemplate.remove();
    document.removeEventListener('click', onErrorAnywhereClick);
    document.removeEventListener('keydown', onErrorKeydown);
  }
};

function onErrorKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (successTemplate) {
      errorTemplate.remove();
      document.addEventListener('keydown', onModalKeydown);
    }
  }
}

const onErrorButtonClick = () => {
  if (errorTemplate) {
    errorTemplate.remove();
  }
};

const showErrorMessage = () => {
  errorTemplate.cloneNode(true);
  body.append(errorTemplate);
  document.removeEventListener('keydown', onModalKeydown);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorAnywhereClick);
};

successButton.addEventListener('click', onSuccessButtonClick);
errorButton.addEventListener('click', onErrorButtonClick);

export {showSuccessMessage, showErrorMessage};
