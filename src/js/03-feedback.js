import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

// 1. Відстеження на формі події input, і занесення даних у локальне сховище.

formEl.addEventListener('input', throttle(handleInput, 500));

function handleInput(event) {
  const object = {
    email: `${emailEl.value}`,
    message: `${textareaEl.value}`,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(object));
}

// 2. Перевірка стану сховища від час завантаження сторінки та заповнення полів збереженими даними

populateInputs();

function populateInputs() {
  const feedbackFormState = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (feedbackFormState) {
    emailEl.value = feedbackFormState.email;
    textareaEl.value = feedbackFormState.message;
  }
}

// 3. Submit

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  if (emailEl.value.trim() === '' || textareaEl.value.trim() === '') {
    alert('Всі поля повинні бути заповнені!');
  }

  if (emailEl.value.trim() !== '' && textareaEl.value.trim() !== '') {
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
    event.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
  }
}
