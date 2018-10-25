console.log("hello from app.js");

let baseNumSelected = false;
let xNumSelected = false;
let numPadEnabled = false;
let calcEnabled = false;
let clearEnabled = false;

let allNumPadItems = [...document.getElementsByClassName('btnNumPad')];
let baseNum = document.getElementById('subscript');
let baseNumButton = document.getElementById('btnBase');
let xNum = document.getElementById('xNum');
let xNumButton = document.getElementById('btnNum');
let ansNum = document.getElementById('ans');
let calcBtn = document.getElementById('calc');
let clearBtn = document.getElementById('clear');

// console.log(baseNum.innerText);
// console.log(xNum.innerText);

calcBtn.addEventListener('click', (e) => {
  if (calcEnabled) {
    console.log('run calculation');
    
    // get nums
    let base = parseInt(baseNum.innerText, 10);
    let xVar = parseInt(xNum.innerText, 10);
    
    //calc log
    let ans = getBaseLog(base, xVar);
    ans = parseFloat(ans.toFixed(15));
    
    // update y with answer
    ansNum.innerText = `${ans}`;

    calcEnabled = false;
  }
});

clearBtn.addEventListener('click', (e) => {
  if (clearEnabled) {
    clear();
  }
});

allNumPadItems.forEach( item => {
  item.addEventListener('click', (e) => {
    console.log(item.innerText);

    // add numbers to the base variable
    if (baseNumSelected) {
      if (baseNum.innerText === 'b') {
        baseNum.innerText = item.innerText;
      } else {
        baseNum.innerText += item.innerText;
      }
    }

    // add numbers to the x variable
    if (xNumSelected) {
      if (xNum.innerText === 'x') {
        xNum.innerText = item.innerText;
      } else {
        xNum.innerText += item.innerText;
      }
    }

    // enable the calc button if both variables are filled
    if (baseNum.innerText !== 'b' && xNum.innerText !== 'x') {
      enableCalc();
    }
    // enable the clear button if at least one of the variables are filled
    if (baseNum.innerText !== 'b' || xNum.innerText !== 'x') enableClear();
  });
})

baseNumButton.addEventListener('click', (event) => {
  console.log('btnBase clicked');
  
  // if clicked for the first time, do this stuff:
  if (!baseNumSelected) {
    console.log('firstClick');
    baseNumSelected = true;
    xNumSelected = false;

    if (!numPadEnabled) enableNumPad();

    baseNum.style.color = 'red';
    xNum.style.color = 'gray';
  }
});

document.getElementById('btnNum').addEventListener('click', (event) => {
  console.log('btnNum clicked');

  // if clicked for the first time, do this stuff:
  if (!xNumSelected) {
    console.log('firstClick');
    baseNumSelected = false;
    xNumSelected = true;
    
    if (!numPadEnabled) enableNumPad();

    xNum.style.color = 'red';
    baseNum.style.color = 'gray';
  }
});



function enableNumPad() {
  numPadEnabled = true;
  allNumPadItems.map( item => {
    item.classList.add('btnClickable');
  });
}
function disableNumPad() {
  numPadEnabled = false;
  baseNumSelected = false;
  xNumSelected = false;
  allNumPadItems.map( item => {
    item.classList.remove('btnClickable');
  });
}

function enableCalc() {
  calcEnabled = true;
  calcBtn.style.opacity = 1.0;
  calcBtn.style.cursor = 'pointer';
  calcBtn.classList.add('btnClickable');
}
function disableCalc() {
  calcEnabled = false;
  calcBtn.style.opacity = 0.20;
  calcBtn.style.cursor = 'default';
  calcBtn.classList.remove('btnClickable');
}

function enableClear() {
  clearEnabled = true;
  clearBtn.style.opacity = 1.0;
  clearBtn.style.cursor = 'pointer';
  clearBtn.classList.add('btnClickable');
}
function disableClear() {
  clearEnabled = false;
  clearBtn.style.opacity = 0.20;
  clearBtn.style.cursor = 'default';
  clearBtn.classList.remove('btnClickable');
}

function clearVars() {
  baseNum.innerText = 'b';
  baseNum.style.color = 'gray';
  xNum.innerText = 'x';
  xNum.style.color = 'gray';
  ansNum.innerText = 'y';
}
function clear() {
  disableNumPad();
  disableCalc();
  disableClear();
  clearVars();
}

function getBaseLog(base, x) {
  return Math.log(x) / Math.log(base);
}
