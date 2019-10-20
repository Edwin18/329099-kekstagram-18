'use strict';

(function () {
  var AVATAR_SIZE = 35;
  var DEFAULT_COMMENTS_COUNT = 5;

  var pictureElement = document.querySelector('.pictures');
  var pictureBigElement = document.querySelector('.big-picture');
  var сloseBtnElement = pictureBigElement.querySelector('#picture-cancel');
  var commentsContainerElement = pictureBigElement.querySelector('.social__comments');
  var commentsLoadBtnElement = pictureBigElement.querySelector('.comments-loader');
  var bodyElement = document.querySelector('body');
  var currentPicture;

  var clearComments = function () {
    while (commentsContainerElement.firstChild) {
      commentsContainerElement.removeChild(commentsContainerElement.firstChild);
    }
  };

  var checkCommentsBtn = function (data) {
    if (data.comments.length <= DEFAULT_COMMENTS_COUNT) {
      window.util.hideElement(commentsLoadBtnElement);
    } else {
      window.util.showElement(commentsLoadBtnElement);
    }
  };

  var getCommentElement = function () {
    var containerElement = document.createElement('li');
    containerElement.classList.add('social__comment');

    var imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.alt = 'Аватар комментатора фотографии';
    imgElement.style.width = AVATAR_SIZE + 'px';
    imgElement.style.height = AVATAR_SIZE + 'px';

    var textElement = document.createElement('p');
    textElement.classList.add('social__text');

    containerElement.appendChild(imgElement);
    containerElement.appendChild(textElement);

    return containerElement;
  };

  var renderComments = function (picture, startCount, endCount) {
    var fragment = document.createDocumentFragment();

    for (var i = startCount; i < endCount; i++) {
      if (i <= picture.comments.length - 1) {
        var commentElement = getCommentElement();

        commentElement.querySelector('.social__picture').src = picture.comments[i].avatar;
        commentElement.querySelector('.social__picture').alt = picture.comments[i].name;
        commentElement.querySelector('.social__text').textContent = picture.comments[i].message;
        pictureBigElement.querySelector('.comments-count-start').textContent = i + 1;

        fragment.appendChild(commentElement);

        if (i >= picture.comments.length - 1) {
          window.util.hideElement(commentsLoadBtnElement);
        }
      } else {
        window.util.hideElement(commentsLoadBtnElement);
        pictureBigElement.querySelector('.comments-count-start').textContent = picture.comments.length;
      }
    }

    commentsContainerElement.appendChild(fragment);
  };

  var renderPictureBig = function (data) {
    currentPicture = data.link;
    clearComments();
    checkCommentsBtn(currentPicture);

    pictureBigElement.querySelector('.big-picture__img img').src = currentPicture.url;
    pictureBigElement.querySelector('.social__caption').textContent = currentPicture.description;
    pictureBigElement.querySelector('.likes-count').textContent = currentPicture.likes;
    pictureBigElement.querySelector('.comments-count-end').textContent = currentPicture.comments.length;

    renderComments(currentPicture, 0, DEFAULT_COMMENTS_COUNT);
    bodyElement.classList.add('modal-open');
  };

  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      window.util.closePopUp(pictureBigElement, onPictureEscPress);
      bodyElement.classList.remove('modal-open');
    }
  };

  pictureElement.addEventListener('click', function (evt) {
    var picture = evt.target;

    if (picture.tagName === 'IMG' && picture.closest('.picture')) {
      renderPictureBig(picture);
      window.util.openPopUp(pictureBigElement, onPictureEscPress);
    }
  });

  pictureElement.addEventListener('keydown', function (evt) {
    var picture = evt.target;

    if (evt.keyCode === window.constants.KEY_CODE.ENTER) {
      if (picture.tagName === 'A') {
        var pictureImg = picture.querySelector('img');
        renderPictureBig(pictureImg);
        window.util.openPopUp(pictureBigElement, onPictureEscPress);
      }
    }
  });

  сloseBtnElement.addEventListener('click', function () {
    window.util.closePopUp(pictureBigElement, onPictureEscPress);
    bodyElement.classList.remove('modal-open');
  });

  commentsLoadBtnElement.addEventListener('click', function () {
    var commentsCount = pictureBigElement.querySelectorAll('.social__comment').length;

    renderComments(currentPicture, commentsCount, commentsCount + DEFAULT_COMMENTS_COUNT);
  });
})();
