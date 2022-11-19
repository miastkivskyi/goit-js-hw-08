import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', saveMessage);
form.addEventListener('input', throttle(onTextareaInput, 500));
messageLocal();

function saveMessage(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onTextareaInput(evt) {
  let formData = localStorage.getItem(LOCALSTORAGE_KEY);
  formData = formData ? JSON.parse(formData) : {};
  formData[evt.target.name] = evt.target.value;
  const JSONformData = JSON.stringify(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, JSONformData);
}

function messageLocal() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedMessage) {
    const oldMessage = JSON.parse(savedMessage);

    Object.entries(oldMessage).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
