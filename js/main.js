'use strict';

var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION_ARRAY = ['Тестим новую зеркалку!*)', 'Тестим новый телефон!^)', 'Тестим новый фотик!:)', 'Тестим новую камеру!-)'];
var MIN_LIKES = 15;
var MAX_LIKES = 250;
var PHOTO_COUNT = 25;
var AVATAR_COUNT = 6;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureElement = document.querySelector('.pictures');
var pictureBig = document.querySelector('.big-picture');
var photoObjectsArray = [];

var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var socialComment = document.querySelector('.social__comments');

var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var showElement = function (elem) {
  elem.classList.remove('hidden');
};

var hideElement = function (elem) {
  elem.classList.add('visually-hidden');
};

var getRandomComment = function (commentsArray) {
  var tempComments = [];

  for (var i = 0; i <= getRandomNumber(0, commentsArray.length - 1); i++) {
    tempComments.push(commentsArray[getRandomNumber(0, commentsArray.length - 1)]);
  }

  return tempComments;
};

var getPhotoObjects = function (minLikes, maxLikes, commentsArray, descriptionArray, photoCount) {
  for (var i = 0; i < photoCount; i++) {
    var tempObject = {};
    tempObject.url = 'photos/' + (i + 1) + '.jpg';
    tempObject.likes = getRandomNumber(minLikes, maxLikes);
    tempObject.comments = getRandomComment(commentsArray);
    tempObject.description = descriptionArray[getRandomNumber(0, descriptionArray.length - 1)];
    photoObjectsArray.push(tempObject);
  }

  return photoObjectsArray;
};

var getPhotoTemplate = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var renderPhotos = function (minLikes, maxLikes, commentsArray, descriptionArray, photoCount) {
  var fragment = document.createDocumentFragment();
  var object = getPhotoObjects(minLikes, maxLikes, commentsArray, descriptionArray, photoCount);

  for (var i = 0; i < photoCount; i++) {
    var template = getPhotoTemplate(object[i]);
    fragment.appendChild(template);
  }

  pictureElement.appendChild(fragment);
};

var renderPictureBig = function (photoArray, element) {
  element.querySelector('.big-picture__img img').src = photoArray[0].url;
  element.querySelector('.likes-count').textContent = photoArray[0].likes;
  element.querySelector('.comments-count').textContent = photoArray[0].comments.length;
  element.querySelector('.social__caption').textContent = photoArray[0].description;
};

var getCommentElement = function () {
  var liElement = document.createElement('li');
  liElement.classList.add('social__comment');

  var imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.alt = 'Аватар комментатора фотографии';
  imgElement.style.width = 35 + 'px';
  imgElement.style.height = 35 + 'px';

  var pElement = document.createElement('p');
  pElement.classList.add('social__text');

  liElement.appendChild(imgElement);
  liElement.appendChild(pElement);

  return liElement;
};

var renderComments = function (photoArray, avatarCount) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoArray[0].comments.length; i++) {
    var commentElement = getCommentElement();
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, avatarCount) + '.svg';
    commentElement.querySelector('.social__text').textContent = photoArray[0].comments[i];
    fragment.appendChild(commentElement);
  }

  socialComment.appendChild(fragment);
};

renderPhotos(MIN_LIKES, MAX_LIKES, COMMENTS_ARRAY, DESCRIPTION_ARRAY, PHOTO_COUNT);
showElement(pictureBig);
hideElement(socialCommentCount);
hideElement(commentsLoader);
renderPictureBig(photoObjectsArray, pictureBig);
renderComments(photoObjectsArray, AVATAR_COUNT);
