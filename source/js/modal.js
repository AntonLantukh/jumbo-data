import mask from './phone-mask.js';
import {checkName, checkMail, checkPhone} from './validation.js';

const buttonContact = document.querySelector(`.promo__button`);
const body = document.querySelector(`body`);
const ESC_KEYCODE = 27;

const modalTemplate = () => {
  return `<div class="modal-popup">
    <buttton class="modal-popup__close">Закрыть</buttton>
    <h2 class="modal-popup__header">Заполните форму</h2>
    <form class="modal-popup__wrapper" action="send.php" method="post" enctype="multipart/form-data">
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="name">Имя</label>
        <input class="modal-popup__input" type="text" id="name" name="name" placeholder="Как к Вам можно обращаться" required="true">
      </div>
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="phone">Телефон</label>
        <input class="modal-popup__input" type="text" id="phone" name="phone" placeholder="+7(___)___-__-__" required="true">
      </div>
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="mail">E-mail</label>
        <input class="modal-popup__input" type="text" id="mail" name="mail" placeholder="Укажите e-mail" required="true">
      </div>
      <div class="modal-popup__group modal-popup__group--wide">
        <label class="modal-popup__label" for="text">Сообщение</label>
        <textarea class="modal-popup__input" type="text" id="text" name="text" placeholder="Текст сообщения"></textarea>
      </div>
      <button class="main-button modal-popup__submit" type="submit">Отправить</button>
    </form>
  </div>`;
};

const modalOkTemplate = () => {
  return `<div class="modal-popup modal-popup--confirm">
            <buttton class="modal-popup__close">Закрыть</buttton>
            <h2 class="modal-popup__header">Спасибо за обращение</h2>
            <p class="modal-popup__label">
              Благодарим за обращение! В скором времени мы свяжемся с Вами и
              ответим на все интересующие Вас вопросы.
            </p>
         </div>`;
};

const modalOverlayTemplate = () => {
  return `<div class="modal-overlay"></div>`;
};

// Function to create a node from html template
const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  // Getting rid of div container
  const resultingElement = container.children[0];
  return resultingElement;
};

// Function to hide modal
const hideModal = () => {
  const modal = document.querySelector(`.modal-popup`);
  const modalOverlay = document.querySelector(`.modal-overlay`);
  modal.classList.add('modal-popup--close');
  modalOverlay.classList.add('modal-overlay--close');
  setTimeout(() => {
    body.removeChild(modal);
    body.removeChild(modalOverlay);
  }, 400);
};

// Function to delete popup at cross sign
const onPopEscPress = (evt) => {
  const modal = document.querySelector(`.modal`);
  if (modal && evt.keyCode === ESC_KEYCODE) {
    hideModal();
    document.removeEventListener(`keydown`, onPopEscPress);
  }
};

// Function to delete popup at overlay click
const onOverlayPress = () => {
  hideModal();
};

// Function to show confirm popup
const showConfirm = () => {
  const modal = getElementFromTemplate(modalOkTemplate());
  const modalOverlay = getElementFromTemplate(modalOverlayTemplate());
  // Appending to DOM
  body.insertAdjacentElement(`beforeEnd`, modal);
  body.insertAdjacentElement(`beforeEnd`, modalOverlay);
  // Setting variables
  const closeButton = modal.querySelector(`.modal-popup__close`);
  // Closing the modal at ESC
  document.addEventListener(`keydown`, onPopEscPress);
  // Closing at overlay click
  modalOverlay.addEventListener(`click`, onOverlayPress);
  // Closing the modal at cross sign
  closeButton.addEventListener(`click`, () => {
    hideModal();
  });
};

// If clicking contact button
buttonContact.addEventListener(`click`, () => {
  // Constructing nodes
  const modal = getElementFromTemplate(modalTemplate());
  const modalOverlay = getElementFromTemplate(modalOverlayTemplate());
  // Appending to DOM
  body.insertAdjacentElement(`beforeEnd`, modal);
  body.insertAdjacentElement(`beforeEnd`, modalOverlay);
  // Setting variables
  const inputs = modal.querySelectorAll(`input`);
  const closeButton = modal.querySelector(`.modal-popup__close`);
  const submitButton = modal.querySelector(`.modal-popup__submit`);
  const phone = modal.querySelector('#phone');
  const mail = modal.querySelector('#mail');
  const name = modal.querySelector('#name');
  // Closing the modal at ESC
  document.addEventListener(`keydown`, onPopEscPress);
  // Validation
  modal.querySelector('#phone').addEventListener('input', mask, false);
  phone.addEventListener('blur', checkPhone, false);
  mail.addEventListener('blur', checkMail, false);
  name.addEventListener('blur', checkName, false);
  // Closing at overlay click
  modalOverlay.addEventListener(`click`, onOverlayPress);
  // Closing the modal at cross sign
  closeButton.addEventListener(`click`, () => {
    hideModal();
  });
  // Closing the modal at submit
  submitButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    const formData = modal.querySelector(`.modal-popup__wrapper`);
    phone.addEventListener('blur', checkPhone(), false);
    mail.addEventListener('blur', checkMail(), false);
    name.addEventListener('blur', checkName(), false);
    const allRight =  Array.from(inputs).every((element) => {
      return element.checkValidity() !== false;
    });
    if (allRight) {
      formData.submit();
      hideModal();
      showConfirm();
    }
  });
});
