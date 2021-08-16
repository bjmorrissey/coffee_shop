const nav = document.querySelector('.nav');
const sectionOne = document.querySelector('.header-img')
const navButton = document.querySelector('.navBtn')
const navLinks = document.querySelector('.navbar-links')
const form = document.getElementById('form')



const obsOptions = {
  root: null,
  threshold: [0, 0.2],
}

const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const navObserver = new IntersectionObserver(stickyNav, obsOptions)
navObserver.observe(sectionOne)



navButton.addEventListener('click', e => {
  e.preventDefault();
  navLinks.classList.toggle('active')
 
})


const messageChoice =(input, message, type) => {
  const msg= input.parentNode.querySelector('small')
  msg.innerText = message;
  input.className = type ? 'success' : 'error';
  msg.className = type ? 'success' : 'small_error'
  return type;
}

const showError = (input, message) => {
  return messageChoice(input, message, false);
}

const showSuccess = input => {
  return messageChoice(input, "", true)
}

const hasValue = (input, message) => {
  if (input.value.trim() === '') {
    return showError(input, message);
  }
  return showSuccess(input)
}

const validateEmail = (input, rqMsg, invalidMsg) => {
  if (!hasValue(input, rqMsg)) {
    return false;
  }

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = input.value.trim();

  if(!emailRegex.test(email)) {
    return showError(input, invalidMsg)
  }

  return true
}


const nameRequired = "Please enter your name"
const emailRequired = "Please enter your email"
const emailInvalid = "Please enter a valid email"
const messageInvalid = "Please enter a message"


form.addEventListener('submit', e => {
  e.preventDefault();
  let name = form.elements['name']
  let email = form.elements['email']
  console.log('button pressed')
  
  let nameValid = hasValue(name, nameRequired);
  let emailValid = validateEmail(email, emailRequired, emailInvalid)


  if (nameValid && emailValid) {
    alert("Thanks for testing. This is only a demo - no message has been sent.")
  }
  


})