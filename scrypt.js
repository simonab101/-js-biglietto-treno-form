//1. Ottengo gli elementi html
const nameField = document.getElementById('name');
const kmsField = document.getElementById('kms');
const ageField = document.getElementById('age');
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');

const quoteSection = document.getElementById('ticket-quote');
const namePlaceholder = document.getElementById('passenger-name');
const offerPlaceholder = document.getElementById('offer');
const cpPlaceholder = document.getElementById('cp');
const carriagePlaceholder = document.getElementById('carriage');
const pricePlaceholder = document.getElementById('price');

//2. Collego Event a Generate Button
generateBtn.addEventListener('click', function () {

  //3. Computo il prezzo base
  const nameValue = nameField.value.trim();
  const kmsValue = parseInt(kmsField.value);
  const ageValue = ageField.value;
  const allowedAges = ['minor', 'adult', 'over'];

  let errorMessage;
  let fieldContainer; 

  if(!nameValue) {
    fieldContainer = document.getElementById('name-field-container');
    errorMessage = document.createElement('p');
    errorMessage.classList.add('red-text');
    errorMessage.innerText = 'Il nome è obbligatorio';
    fieldContainer.appendChild(errorMessage);
    return            
  }

  if (isNaN(kmsValue) || kmsValue <= 0) {
    fieldContainer = document.getElementById('kms-field-container');
    errorMessage = document.createElement('p');
    errorMessage.classList.add('red-text');
    errorMessage.innerText = 'I chilometri inseriti non sono validi';
    fieldContainer.appendChild(errorMessage);
    return              
  }

  if (!allowedAges.includes(ageValue)) {
    fieldContainer = document.getElementById('age-field-container');
    errorMessage = document.createElement('p');
    errorMessage.classList.add('red-text');
    errorMessage.innerText = "L'eta' inserita non è valida";
    fieldContainer.appendChild(errorMessage);
    return  
  }

  //4. Computo lo sconto
  let rate = 0.21 * kmsValue;
  let rateCategory;

  switch(ageValue) {
    case 'minor':
      rate *= 0.8;
      rateCategory = 'Tariffa Giovani';
      break;
    case 'over':
      rate *= 0.6;
      rateCategory = 'Tariffa Senior';
      break;
    default:
      rateCategory = 'Tariffa Ordinaria';
      break;
  }

  //5. Simulo il numero della Carrozza
  const carNumb = Math.floor(Math.random() * 12) + 1;


  //6. Simulo il CP
  const cpNumb = Math.floor(Math.random() * (100000 - 90000)) + 90000;


  //7.Display results
  namePlaceholder.innerText = nameValue;
  pricePlaceholder.innerText = '€' + ' ' + rate.toFixed(2);
  offerPlaceholder.innerText = rateCategory;
  carriagePlaceholder.innerText = 'N.' + ' ' +carNumb;
  cpPlaceholder.innerText = cpNumb;
  quoteSection.classList.add('visible');
})

  //8.Collego Event a Reset Button
  resetBtn.addEventListener('click', function () {

    const fields = document.querySelectorAll('.form-field');

    for (let i = 0; i < fields.length; i++){
      const currentField = fields[i];
      currentField.value = '';
    }
  
    quoteSection.classList.remove('visible');
})