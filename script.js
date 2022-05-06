// DOM

const generatorForm = document.querySelector('.prime-generator');
const checkForm = document.querySelector('.prime-check');
const html = document.querySelector('html');
const app = document.querySelector('.wrapper');

// regex
const regEx = /^\b[0-9]+\b$/;

// create warning function
const createWarn = (form, text) => {
  const warn = document.createElement('div');
  warn.setAttribute('class', 'warn');
  warn.innerText = text;
  form.appendChild(warn);
  removeWarn(form);
}

// remove warning function
const removeWarn = form => {
  const warn = document.querySelectorAll(`.warn`)
  warn.forEach(warn => {
    setTimeout(() => {
      form.removeChild(warn);
    }, 500);
  });
}

// generate primes

const generatePrimes = range => {
  let primesArray = [];
  for(let num = 0; num <= range; num++) {
    const isPrime = num => {
      for(let i = 2, s = Math.sqrt(num); i <= s; i++) 
      if(num % i === 0) return false; 
      return num > 1;
    }
    if(isPrime(num) == true) {
      primesArray.push(num);
    }
  }
  console.table(primesArray);
  return primesArray;
};

// check if a single number is prime

const checkIfIsPrime = num => {
  const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) 
    if(num % i === 0) return false; 
    return num > 1;
  }
  if(isPrime(num) == true) {
    numberIsPrime(num);
  }
  else {
    numberIsNotPrime(num);
  }
};

// what do to if number is prime

const numberIsPrime = num => {
  const mess = document.createElement('div');
  mess.setAttribute('class', 'success');
  mess.innerText = `Number ${num} is a prime one!`;
  checkForm.appendChild(mess);
  removeMess();
}

// remove message function

const removeMess = () => {
  const mess = document.querySelectorAll('.success, .fail');
  mess.forEach(mess => {
    setTimeout(() => {
      checkForm.removeChild(mess);
    }, 1500);
  });
}

// what do to if number is not prime

const numberIsNotPrime = num => {
  const mess = document.createElement('div');
  mess.setAttribute('class', 'fail');
  mess.innerText = `Number ${num} is not prime!`;
  checkForm.appendChild(mess);
  removeMess();
}


// forms

generatorForm.addEventListener('submit', e => {
  e.preventDefault();
  const range = generatorForm.generator.value.trim();
  const regExTest = regEx.test(range);
  console.log(regExTest);
  if(!regExTest) {
    createWarn(generatorForm, 'Enter a single natural number');
  }
  else {
  generatorForm.reset();
  app.classList.toggle('wrapper-after');
  app.innerHTML = `<div class="output">${generatePrimes(range)}</div> <div class="quit">Quit to main page</div>`;
  const quit = document.querySelector('.quit');
  quit.addEventListener('click', () => {
    location.reload();
  })}
})

checkForm.addEventListener('submit', e => {
  e.preventDefault();
  const num = checkForm.generator.value.trim();
  const regExTest = regEx.test(num);
  console.log(regExTest);
  if(!regExTest) {
    createWarn(checkForm, 'Enter a single natural number');
  }
  else {
    checkIfIsPrime(num)
  }
  checkForm.reset();
})

generatorForm.generator.addEventListener('keyup', () => {
  const num = generatorForm.generator.value;
  if (num >= 1000000) {
    createWarn(generatorForm, 'Warning! High values may slow down your browser!');
  } 
})
