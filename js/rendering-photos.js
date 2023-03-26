import { getPictures } from './data.js';

const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const renderingPhotos = getPictures();

renderingPhotos.forEach(({url, likes, comment}) => {
  const picturesElement = pictureTemplate.cloneNode(true);
  picturesElement.querySelector('.picture__img').src = url;
  picturesElement.querySelector('.picture__likes').textContent = likes;
  picturesElement.querySelector('.picture__comments').textContent = comment.length;
  picturesFragment.appendChild(picturesElement);
});

picture.appendChild(picturesFragment);
