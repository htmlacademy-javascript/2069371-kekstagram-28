import {renderFullPhoto} from './rendering-full-photo.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const renderingPhotos = (element) => {
  pictures.querySelectorAll('.picture').forEach((pictureElement) => {
    pictureElement.remove();
  });

  element.forEach((data) => {
    const picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = data.url;
    picturesElement.querySelector('.picture__likes').textContent = data.likes;
    picturesElement.querySelector('.picture__comments').textContent = data.comments.length;
    picturesFragment.appendChild(picturesElement);

    const openFullSize = () => renderFullPhoto(data);
    picturesElement.addEventListener('click', openFullSize);

  });

  pictures.append(picturesFragment);
};
export {renderingPhotos};
