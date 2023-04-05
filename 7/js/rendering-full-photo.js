const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const body = document.querySelector('body');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');
const socialCaption = document.querySelector('.social__caption');
const commentList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');

let commentShow = 0;
let comments = [];
const COMMENTS_PORTION = 5;

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
  const comment = commentItem.cloneNode(true);

  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
}

const renderComments = () => {
  commentShow += COMMENTS_PORTION;

  if (commentShow >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentShow = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentShow; i++) {
    const commentElement = addListComments(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  socialCommentCount.innerHTML = `${commentShow} из <span class="comments-count">${comments.length}</span> комментариев`;
};

function renderDescriptionPhoto (data) {
  bigPictureImg.src = data.url;
  likesCount.textContent = data.likes;
  socialCaption.textContent = data.description;
}

function renderFullPhoto (data) {

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  renderDescriptionPhoto(data);
  document.addEventListener('keydown', closeEsc);

  comments = data.comment;
  if (comments.length > 0) {
    renderComments();
  }
}

commentsLoader.addEventListener('click', renderComments);
closeButton.addEventListener('click', closeFullPhoto);

export {renderFullPhoto};
