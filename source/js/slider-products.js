`use strict`;

const container = document.querySelector(`.slider-products__container--second`);
const buttonL = document.querySelector(`.slider-products__button--left`);
const buttonR = document.querySelector(`.slider-products__button--right`);
const elements = document.querySelectorAll(`.slider-products__element`);
const width = 240;
const shownElements = 4;
let position = 0;

// Button click
buttonL.addEventListener(`click`, function() {
    position = Math.min(position + width, 0);
    container.setAttribute(`style`, `margin-left:` + position + `px`);
})

buttonR.addEventListener(`click`, function() {
  position = Math.max(position - width, -width * (elements.length - shownElements));
  container.setAttribute(`style`, `margin-left:` + position + `px`);
})
