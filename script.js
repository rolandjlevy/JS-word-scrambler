const sneakerizer = document.querySelector(".scrambler");
const input = document.querySelector(".user-input");
const button = document.querySelector(".btn.start");
const thumbsup = document.querySelector(".thumbs-up");

const specialChars = '#*~%&@£$,.":;!?()-+=___';
const keyCodeA = 97;
const abcArr = String.fromCharCode(...[...Array(26)].map(_=>i++,i=keyCodeA));
const abc = [...abcArr, abcArr.toUpperCase(), specialChars].join('');
const SPEED = 50;
const CONVERTED_MAX = parseInt('ffffff', 16);

const generate = (message) => {
  init();
  let display = [...message].fill({char:'', col:'', complete:false});
  const timer = setInterval(() => {
    display = display.map((letter, i) => {
      if (!letter.complete) {
        letter.char = getRandomChar();
        letter.col = letter.char === '_' ? 'FFFFFF' : randomHex();
        console.log({char: letter.char, col: letter.col})
        letter.complete = letter.char === message[i];
      }
      return {...letter};
    });
    sneakerizer.innerHTML = display.map(letter =>`<span style="color:#${letter.col}">${letter.char}</span>`).join('');
    const allComplete = display.every(letter => letter.complete);
    if (allComplete) {
      clearInterval(timer);
      completed();
    };
  }, SPEED);
}

const completed = () => {
  thumbsup.classList.add('completed');
  button.disabled = false;
}

const init = () => {
  thumbsup.classList.remove('completed');
  button.disabled = true;
  sneakerizer.innerHTML = '';
}

const getRandomChar = () => {
  const abcLength = abc.length - 1;
  const randomNum = Math.floor(Math.random() * abcLength);
  return abc[randomNum];
}

const randomHex = () => {
  return randomNum(CONVERTED_MAX).toString(16).padStart(6, '0').toUpperCase();
}

const randomNum = n => Math.floor(Math.random() * Math.floor(n));

const randomChar = n => Math.random().toString(n);

button.addEventListener('click', () => {
  const inputString = input.value.replace(/ /g, "_");
  const message = Array.from(inputString);
  generate(message);
});