const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const body = document.querySelector('body');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');

const socialCaption = document.querySelector('.social__caption');
const sociaComments = document.querySelector('.social__comments');

const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPhoto();
  }
};

function closeFullPhoto() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', closeEsc);
}

function addListComments (data) {
  const element = document.createElement('li');
  element.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = data.avatar;
  img.alt = data.name;
  element.append(img);

  const commentContent = document.createElement('p');
  commentContent.classList.add('social__text');
  commentContent.textContent = data.message;
  element.appendChild(commentContent);

  bigPicture.querySelector('.social__comments').append(element);
}

function renderFullPhoto (data) {

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  bigPictureImg.src = data.url;
  likesCount.textContent = data.likes;
  socialCaption.textContent = data.description;

  sociaComments.innerHTML = '';
  const commentMass = data.comment;
  for (let i = 0; i < commentMass.length; i++) {
    addListComments(commentMass[i]);
  }
  document.addEventListener('keydown', closeEsc);
}

closeButton.addEventListener('click', closeFullPhoto);
export {renderFullPhoto};
