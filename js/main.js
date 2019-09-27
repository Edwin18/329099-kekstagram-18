'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую зеркалку!*)', 'Тестим новый телефон!^)', 'Тестим новый фотик!:)', 'Тестим новую камеру!-)'];
var LIKES = {
  MIN: 15,
  MAX: 250
};
var PHOTO_COUNT = 25;
// var AVATAR_COUNT = 6;
// var AVATAR_SIZE = 35;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureElement = document.querySelector('.pictures');
// var pictureBig = document.querySelector('.big-picture');
var photos = [];

// var socialCommentCount = document.querySelector('.social__comment-count');
// var commentsLoader = document.querySelector('.comments-loader');
// var socialComment = document.querySelector('.social__comments');

var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var showElement = function (elem) {
  if (elem) {
    elem.classList.remove('hidden');
  }
};

var hideElement = function (elem) {
  if (elem) {
    elem.classList.add('hidden');
  }
};

var getRandomComments = function () {
  var tempComments = [];
  var randomCount = getRandomNumber(0, COMMENTS.length - 1);

  for (var i = 0; i <= randomCount; i++) {
    tempComments.push(COMMENTS[getRandomNumber(0, COMMENTS.length - 1)]);
  }

  return tempComments;
};

var getPhoto = function (count) {
  return {
    url: 'photos/' + (count + 1) + '.jpg',
    likes: getRandomNumber(LIKES.MIN, LIKES.MAX),
    comments: getRandomComments(),
    description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)]
  };
};

var getPhotos = function (photoCount) {

  for (var i = 0; i < photoCount; i++) {
    photos.push(getPhoto(i));
  }

  return photos;
};

var getPhotoElement = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var renderPhotos = function (photoCount) {
  var fragment = document.createDocumentFragment();
  var object = getPhotos(photoCount);

  for (var i = 0; i < photoCount; i++) {
    var template = getPhotoElement(object[i]);
    fragment.appendChild(template);
  }

  pictureElement.appendChild(fragment);
};

// var renderPictureBig = function (element, data) {
//   element.querySelector('.big-picture__img img').src = data.url;
//   element.querySelector('.likes-count').textContent = data.likes;
//   element.querySelector('.comments-count').textContent = data.comments.length;
//   element.querySelector('.social__caption').textContent = data.description;
// };

// var getCommentElement = function () {
//   var containerElement = document.createElement('li');
//   containerElement.classList.add('social__comment');

//   var imgElement = document.createElement('img');
//   imgElement.classList.add('social__picture');
//   imgElement.alt = 'Аватар комментатора фотографии';
//   imgElement.style.width = AVATAR_SIZE + 'px';
//   imgElement.style.height = AVATAR_SIZE + 'px';

//   var textElement = document.createElement('p');
//   textElement.classList.add('social__text');

//   containerElement.appendChild(imgElement);
//   containerElement.appendChild(textElement);

//   return containerElement;
// };

// var renderComments = function (avatarCount, data) {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < data.comments.length; i++) {
//     var commentElement = getCommentElement();
//     commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, avatarCount) + '.svg';
//     commentElement.querySelector('.social__text').textContent = data.comments[i];
//     fragment.appendChild(commentElement);
//   }

//   socialComment.appendChild(fragment);
// };

renderPhotos(PHOTO_COUNT);
// showElement(pictureBig);
// hideElement(socialCommentCount);
// hideElement(commentsLoader);

// renderPictureBig(pictureBig, photos[0]);
// renderComments(AVATAR_COUNT, photos[0]);

// 8. Личный проект: подробности

var uploadFiles = document.querySelector('#upload-file');
var photoForm = document.querySelector('.img-upload__overlay');
var hashtags = document.querySelector('.text__hashtags');
var img = document.querySelector('.img-upload__preview img');
var effectsBar = document.querySelector('.img-upload__effect-level');
var effectsList = document.querySelector('.effects__list');

var removeEffects = function () {
  img.removeAttribute('class');
};

effectsList.addEventListener('change', function (evt) {
  var eventTarget = evt.target;
  removeEffects();
  if (!(eventTarget.value === 'none')) {
    img.classList.add('effects__preview--' + eventTarget.value);
    if (!(effectsBar.classList.contains === 'hiden')) {
      showElement(effectsBar);
    }
  } else {
    hideElement(effectsBar);
  }
});

uploadFiles.addEventListener('change', function () {
  showElement(photoForm);
  hideElement(effectsBar);
});

hashtags.addEventListener('change', function () {
  var tempArray = hashtags.value.split(' ');

  for (var i = 0; i < tempArray.length; i++) {
    if (tempArray[i].length >= 20) {
      hashtags.setCustomValidity('Ваш хеш-тег' + tempArray[i] + ' длинее 20 символов, укоротите)');
    } else {
      hashtags.setCustomValidity('');
    }
  }
});
