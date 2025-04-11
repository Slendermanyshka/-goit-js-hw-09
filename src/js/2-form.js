const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (savedData) {
  formData.email = savedData.email;
  formData.message = savedData.message;
  emailInput.value = formData.email;
  messageTextarea.value = formData.message;
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name === 'email') {
    formData.email = value;
  } else if (name === 'message') {
    formData.message = value;
  }

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
});