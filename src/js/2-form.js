//: ARRAY ===============

let formData = {
  email: '',
  message: '',
};

//: DOM SEARCH ===============

const form = document.querySelector('.feedback-form');

let emailElem = document.querySelector('#user-email');
let messageElem = document.querySelector('#user-msg');
const STORAGE_KEY = 'feedback-form-state';

//: INPUT ===============

form.addEventListener('input', evt => {
  const inputData = new FormData(form);

  formData = {
    email: inputData.get('email').trim(),
    message: inputData.get('message').trim(),
  };

  saveData(STORAGE_KEY, formData);
});

//:  SUBMIT =============

form.addEventListener('submit', evt => {
  evt.preventDefault();

  if (emailElem.value === '' || messageElem.value === '') {
    alert('«Fill please all fields»');
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  const data = loadData(STORAGE_KEY);
  emailElem.value = data?.email || '';
  messageElem.value = data?.message || '';

  if (data) {
    formData.email = data.email;
    formData.message = data.message;
  }
});

//: Functions =============

function saveData(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

function loadData(key) {
  const data = localStorage.getItem(key);
  try {
    const value = JSON.parse(data);
    return value;
  } catch {
    return data;
  }
}
