const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const container = document.querySelector('.img-upload__preview img');

const STEP = 25;
const MIN = 25;
const MAX = 100;
const DEFAULT_VALUE = 100;

const scaleImage = (value) => {
  container.style.transform = `scale(${value / 100})`;
  controlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue - STEP;
  if (newValue < MIN) {
    newValue = MIN;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue + STEP;
  if (newValue > MAX) {
    newValue = MAX;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_VALUE);

controlSmaller.addEventListener('click', onSmallerButtonClick);
controlBigger.addEventListener('click', onBiggerButtonClick);

export {resetScale};
