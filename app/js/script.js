// bill html elements
let billInput = document.getElementById('bill-input');
let billLog = document.getElementById('bill-log');

// tip html elements
let tipButtons = document.getElementsByClassName('button--cyan');
let customButton = document.getElementsByClassName('button--grey');
let tipLog = document.getElementById('tip-log');

// num. of people html elements
let numPeopleInput = document.getElementById('number-people-input');
let numPeopleLog = document.getElementById('number-people-log');

// results html elements
let tipAmountOutput = document.getElementById('tip-amount');
let totalOutput = document.getElementById('total');

// reset html element
let resetButton = document.getElementsByClassName('button--reset');

// variables
let bill = '', numPeople = '', tip = '';


//RESET
document.onload = reset();
resetButton[0].onclick = reset();
function reset() {
    // reset bill log, input and border
    billLog.textContent = '';
    billInput.value = '';
    billInput.style.border = `none`;

    // reset tip log, selected and custom value
    tipLog.textContent = '';
    resetTips();
    customButton[0].type = `button`;
    customButton[0].value = `Custom`;
    customButton[0].style.textAlign = `center`;
    customButton[0].style.border = `none`;
 
    // reset number of people log, input and border
    numPeopleLog.textContent = '';
    numPeopleInput.value = '';
    numPeopleInput.style.border = `none`;

    // reset results
    tipAmountOutput.textContent = '0.00';
    totalOutput.textContent = '0.00';

    // reset variables
    bill = '';
    numPeople = '';
    tip = '';
}
function resetTips () {
    for (const button of tipButtons) {
        button.style.color = `white`; 
        button.style.backgroundColor = `hsl(183, 100%, 15%)`; // very dark cyan
    }
}


// BILL
billInput.oninput = function handleBillInput(e) {
    if (e.target.validity.badInput || e.target.validity.rangeUnderflow) {
        // controllo se il valore è valido
        billLog.textContent = `Invalid input`;
        billLog.style.color = `red`;
        billInput.style.border = `1px solid red`;
    } else {
        // se è valido lo salvo
        bill = e.target.value;
        billLog.textContent = `Your input is ${bill}`;
        billLog.style.color = `green`;
        billInput.style.border = `1px solid green`;
        calculateResults();
    }
}


// TIP
for (const button of tipButtons) {
    button.onclick = handleTip;
}
function handleTip(e) {
    tip = (e.target.value).slice(0, -1) / 100;
    tipLog.textContent = `Your tip is ${tip}`;
    tipLog.style.color = `green`;
    resetTips();
    e.target.style.color = `hsl(183, 100%, 15%)`; // very dark cyan
    e.target.style.backgroundColor = `hsl(172, 67%, 45%)`; // strong cyan
    calculateResults();
}

// Custom tip
customButton[0].onclick = handleCustomTip;
function handleCustomTip(e) {
    if (e.target.type === `button`) {
        e.target.type = `number`;
        e.target.value = ``;
        e.target.style.textAlign = `right`;
    }
}
customButton[0].oninput = handleCustomTipInput;
function handleCustomTipInput(e) {
    if (e.target.validity.badInput) {
        // controllo se il valore è valido
        tipLog.textContent = `Invalid input`;
        tipLog.style.color = `red`;
        e.target.style.border = `1px solid red`;
    } else {
        // se è valido lo salvo
        tip = e.target.value;
        tipLog.textContent = `your custom tip is ${tip}`;
        tipLog.style.color = `green`;
        e.target.style.border = `1px solid green`;
        calculateResults();
    }
}


// NUMBER OF PEOPLE
numPeopleInput.oninput = function handleNumPeopleInput(e) {
    if (e.target.validity.rangeUnderflow || e.target.validity.rangeOverflow) {
        // il numero di persone non può essere uguale a zero e deve essere compreso tra 1 e 100
        e.target.value === `0` ? numPeopleLog.textContent = `Can't be zero` : numPeopleLog.textContent = `Invalid input`;
        numPeopleLog.style.color = `red`;
        numPeopleInput.style.border = `1px solid red`;
    } else {
        // se è valido lo salvo
        numPeople = e.target.value;
        numPeopleLog.textContent = `Your input is ${numPeople}`;
        numPeopleLog.style.color = `green`;
        numPeopleInput.style.border = `1px solid green`;
        calculateResults();
    }
}


// RESULTS
function calculateResults() {
    console.log('calcolo...');
    // controllo se mi manca uno dei valori necessari
    /* billInput.validity.valid
    if (bill === '') {
        billLog.textContent = 'Insert bill';
        
    }
    if (numPeople === '') {
        numPeopleLog.textContent = 'Insert num. of people';
        // rosso
    }
    if (tip === '') {
        tipLog.textContent = 'Insert tip';
        // rosso
    }*/

    // se ho tutti i valori, calcolo i risultati
    if (bill !== '' && numPeople !== '' && tip !== '') {
        console.log(bill / numPeople * tip);
        let tipAmount = bill / numPeople * tip;
        let total = bill / numPeople + (bill / numPeople * tip);
        tipAmountOutput.textContent = Math.floor(tipAmount * 100) / 100;
        totalOutput.textContent = Math.ceil(total * 100) / 100;
    }
}