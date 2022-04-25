// bill html elements
let billInput = document.getElementById('bill-input');
let billLog = document.getElementById('bill-log');

// tip html elements
let tipButtons = document.getElementsByClassName('button--cyan');
let customButton = document.getElementById('custom-btn');
let tipLog = document.getElementById('tip-log');

// num. of people html elements
let numPeopleInput = document.getElementById('number-people-input');
let numPeopleLog = document.getElementById('number-people-log');

// results html elements
let tipAmountOutput = document.getElementById('tip-amount');
let totalOutput = document.getElementById('total');

// reset html element
let resetButton = document.getElementById('reset-btn');

// variables
let bill = '', numPeople = '', tip = '';


//RESET
resetButton.addEventListener(`click`, reset);
function reset() {
    // reset bill log, input and border
    billLog.textContent = '';
    billInput.value = '';
    billInput.style.border = `none`;

    // reset tip log, selected and custom value
    tipLog.textContent = '';
    if (customButton.type === `button`) {
        // reset default tips
        resetTips();
    } else {
        // reset custom button
        customButton.type = `button`;
        customButton.value = `Custom`;
        customButton.style.textAlign = `center`;
        customButton.style.border = `none`;
        customButton.style.color = `hsl(186, 14%, 40%)`;
    }

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
        // check validity
        billLog.textContent = `Invalid input`;
        billLog.style.color = `red`;
        billInput.style.border = `1px solid red`;
    } else {
        // if it's valid, save it
        bill = e.target.value;
        //billLog.textContent = `Your input is ${bill}`;
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
    //tipLog.textContent = `Your tip is ${tip}`;
    tipLog.style.color = `green`;
    resetTips();
    e.target.style.color = `hsl(183, 100%, 15%)`; // very dark cyan
    e.target.style.backgroundColor = `hsl(172, 67%, 45%)`; // strong cyan
    calculateResults();
}

// Custom tip
customButton.onclick = handleCustomTip;
function handleCustomTip(e) {
    if (e.target.type === `button`) {
        e.target.type = `number`;
        e.target.value = ``;
        e.target.style.textAlign = `right`;
    }
}
customButton.oninput = handleCustomTipInput;
function handleCustomTipInput(e) {
    if (e.target.validity.badInput) {
        // check validity
        tipLog.textContent = `Invalid input`;
        tipLog.style.color = `red`;
        e.target.style.border = `1px solid red`;
    } else {
        // if it's valid, save it
        tip = e.target.value;
        //tipLog.textContent = `your custom tip is ${tip}`;
        tipLog.style.color = `green`;
        e.target.style.border = `1px solid green`;
        calculateResults();
    }
}


// NUMBER OF PEOPLE
numPeopleInput.oninput = function handleNumPeopleInput(e) {
    if (e.target.validity.rangeUnderflow || e.target.validity.rangeOverflow) {
        // number of people can't be zero and I set it to be between 1 and 100
        e.target.value === `0` ? numPeopleLog.textContent = `Can't be zero` : numPeopleLog.textContent = `Invalid input`;
        numPeopleLog.style.color = `red`;
        numPeopleInput.style.border = `1px solid red`;
    } else {
        // if it's valid, save it
        numPeople = e.target.value;
        //numPeopleLog.textContent = `Your input is ${numPeople}`;
        numPeopleLog.style.color = `green`;
        numPeopleInput.style.border = `1px solid green`;
        calculateResults();
    }
}


// RESULTS
function calculateResults() {
    //console.log('calculating...');
    if (bill !== '' && numPeople !== '' && tip !== '') {
        // if I have all the values, calculate the results
        let tipAmount = bill / numPeople * tip;
        let total = bill / numPeople + (bill / numPeople * tip);
        tipAmountOutput.textContent = Math.floor(tipAmount * 100) / 100;
        totalOutput.textContent = Math.ceil(total * 100) / 100;
    }
}