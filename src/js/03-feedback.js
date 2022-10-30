import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
  const { name, value } = evt.target;
  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
  } else {
    savedData = {};
  }
  savedData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  if (savedData) {
    Object.entries(parsedData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}
