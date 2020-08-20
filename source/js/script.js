var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


var successButton = document.querySelector('.success-popup__button');
var successPopup = document.querySelector('.success-popup');

if (successButton && successPopup){

  successButton.addEventListener('click', function() {
    if (!successPopup.classList.contains('hidden')){
      successPopup.classList.add('hidden');
    }
  });
}

var failureButton = document.querySelector('.failure-popup__button');
var failurePopup = document.querySelector('.failure-popup');

if (failureButton && failurePopup){
  failureButton.addEventListener('click', function() {
    if (!failurePopup.classList.contains('hidden')){
      failurePopup.classList.add('hidden');
    }
  });
}

var form = document.querySelector('.form');

if (form){

  var formButton = document.querySelector('.form__button');
  var formName = document.querySelector('#name');
  var formLastname = document.querySelector('#lastname');
  var formEmail = document.querySelector('#email');

  function formSubmit(evt) {
    evt.preventDefault();
    if (!formName.value || !formLastname.value || !formEmail.value){
      if (failurePopup.classList.contains('hidden')){
        failurePopup.classList.remove('hidden');

        if (!formLastname.value) formLastname.focus();
        else if (!formName.value) formName.focus();
        else formEmail.focus();

        failurePopup.classList.remove("popup-animation-apear");
        failurePopup.offsetWidth = failurePopup.offsetWidth;
        failurePopup.classList.add("popup-animation-apear");
      }
    }
    else{
      if (successPopup.classList.contains('hidden')){
        successPopup.classList.remove('hidden');
        successPopup.classList.remove("popup-animation-apear");
        successPopup.offsetWidth = successPopup.offsetWidth;
        successPopup.classList.add("popup-animation-apear");
      }
    }
  }

  formButton.addEventListener('click', formSubmit);
  formButton.addEventListener('onSubmit', formSubmit);
}

window.addEventListener("keydown", function(evt){
  if (evt.keyCode === 27){
    if (failurePopup && !failurePopup.classList.contains('hidden')){
      evt.preventDefault();
      failurePopup.classList.add("hidden");
    }

    if (successPopup && successPopup.classList.contains('hidden')){
      evt.preventDefault();
      successPopup.classList.add("hidden");
    }
  }
})
