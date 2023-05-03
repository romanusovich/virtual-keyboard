const EN_KEYBOARD = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
];

const EN_KEYBOARD_SHIFT = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?',
];

const RU_KEYBOARD = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
  'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
];

const RU_KEYBOARD_SHIFT = [
  'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+',
  'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
  'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
  'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',',
];

const KEY_CODES = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
  'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
  'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
  'BracketLeft', 'BracketRight', 'Backslash',
  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
];

class Keyboard {
  constructor() {
    this.keyboard = {};
    this.lng = localStorage.getItem('lng') ? localStorage.getItem('lng') : 'en';
  }

  setShift() {
    if (this.lng === 'en') this.setKeys(EN_KEYBOARD_SHIFT);
    else this.setKeys(RU_KEYBOARD_SHIFT);
  }

  unsetShift() {
    if (this.lng === 'en') this.setKeys(EN_KEYBOARD);
    else this.setKeys(RU_KEYBOARD);
  }

  setCaps() {
    const chars = Array.from(document.querySelectorAll('.char'));
    for (let i = 0; i < chars.length; i += 1) {
      chars[i].textContent = chars[i].textContent.toUpperCase();
    }
    return this;
  }

  unsetCaps() {
    const chars = Array.from(document.querySelectorAll('.char'));
    for (let i = 0; i < chars.length; i += 1) {
      chars[i].textContent = chars[i].textContent.toLowerCase();
    }
    return this;
  }

  changeLng() {
    if (this.lng === 'en') {
      this.lng = 'ru';
      localStorage.setItem('lng', 'ru');
      this.setKeys(RU_KEYBOARD);
    } else {
      this.lng = 'en';
      localStorage.setItem('lng', 'en');
      this.setKeys(EN_KEYBOARD);
    }
  }

  setBase() {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    for (let i = 0; i < 64; i += 1) { // 64 is the number of keys
      const key = document.createElement('div');
      key.classList.add('key');
      switch (i) {
        case 13:
          key.classList.add('backspace');
          key.textContent = 'Backspace';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = ta.value.substring(0, start - 1)
                                + ta.value.substring(end, ta.value.length);
              ta.selectionStart = start - 1;
              ta.selectionEnd = end - 1;
            } else {
              ta.value = ta.value.substring(0, start)
                                + ta.value.substring(end, ta.value.length);
              ta.selectionStart = start;
              ta.selectionEnd = start;
            }
            ta.focus();
          });
          break;
        case 14:
          key.classList.add('tab');
          key.textContent = 'Tab';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)}\t${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)}\t${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        case 28:
          key.classList.add('delete');
          key.textContent = 'Del';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = ta.value.substring(0, start)
                                + ta.value.substring(end + 1, ta.value.length);
              ta.selectionStart = start;
              ta.selectionEnd = end;
            } else {
              ta.value = ta.value.substring(0, start)
                                + ta.value.substring(end, ta.value.length);
              ta.selectionStart = start;
              ta.selectionEnd = start;
            }
            ta.focus();
          });
          break;
        case 29:
          key.classList.add('capslock');
          key.textContent = 'Caps';
          key.addEventListener('click', (event) => {
            const caps = event.target;
            caps.classList.toggle('active');
            const isAnyActive = Array.from(document.querySelectorAll('.shift'))
              .filter((shift) => shift.classList.contains('active')).length > 0;
            if (!isAnyActive) {
              if (caps.classList.contains('active')) this.setCaps();
              else this.unsetCaps();
            } else if (!caps.classList.contains('active')) this.setCaps();
            else this.unsetCaps();
          });
          break;
        case 41:
          key.classList.add('enter');
          key.textContent = 'Enter';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)}\n${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)}\n${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        case 42:
        case 54:
          key.classList.add('shift');
          if (i === 42) key.classList.add('shiftleft');
          else key.classList.add('shiftright');
          key.textContent = 'Shift';
          key.addEventListener('click', (event) => {
            const isAnyActive = Array.from(document.querySelectorAll('.shift'))
              .filter((shift) => shift.classList.contains('active')).length > 1;
            const shift = event.target;
            shift.classList.toggle('active');
            const caps = document.querySelector('.capslock');
            if (!isAnyActive) {
              if (!caps.classList.contains('active')) {
                if (shift.classList.contains('active')) this.setShift();
                else this.unsetShift();
              } else if (!shift.classList.contains('active')) {
                this.unsetShift();
                this.setCaps();
              } else {
                this.setShift();
                this.unsetCaps();
              }
            }

            const lalt = document.querySelector('.alt');
            const lshift = document.querySelector('.shift');
            if (lshift.classList.contains('active') && lalt.classList.contains('active')) {
              this.changeLng();
              if (!event.target.classList.contains('real')) {
                lalt.classList.remove('active');
                lshift.click();
              }
            }
          });
          break;
        case 55:
        case 63:
          key.classList.add('control');
          if (i === 55) key.classList.add('controlleft');
          else key.classList.add('controlright');
          key.textContent = 'Ctrl';
          key.addEventListener('click', (event) => {
            event.target.classList.toggle('active');
          });
          break;
        case 56:
          key.classList.add('metaleft');
          key.textContent = 'Win';
          key.addEventListener('click', (event) => {
            event.target.classList.toggle('active');
          });
          break;
        case 57:
        case 59:
          key.classList.add('alt');
          if (i === 57) key.classList.add('altleft');
          else key.classList.add('altright');
          key.textContent = 'Alt';
          key.addEventListener('click', (event) => {
            event.target.classList.toggle('active');
            const lalt = document.querySelector('.alt');
            const lshift = document.querySelector('.shift');
            if (lshift.classList.contains('active') && lalt.classList.contains('active')) {
              this.changeLng();
              if (!event.target.classList.contains('real')) {
                lalt.click();
                lshift.click();
              }
            }
          });
          break;
        case 58:
          key.classList.add('space');
          key.textContent = '_____';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)} ${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)} ${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        case 53:
          key.classList.add('arrowup');
          key.textContent = '↑';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)}↑${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)}↑${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        case 60:
          key.classList.add('arrowleft');
          key.textContent = '←';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)}←${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)}←${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        case 61:
          key.classList.add('arrowdown');
          key.textContent = '↓';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)}↓${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)}↓${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        case 62:
          key.classList.add('arrowright');
          key.textContent = '→';
          key.addEventListener('click', () => {
            const ta = document.querySelector('.textarea');
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            if (start === end) {
              ta.value = `${ta.value.substring(0, start)}→${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = end + 1;
            } else {
              ta.value = `${ta.value.substring(0, start)}→${ta.value.substring(end, ta.value.length)}`;
              ta.selectionStart = start + 1;
              ta.selectionEnd = start + 1;
            }
            ta.focus();
          });
          break;
        default:
          key.classList.add('char');
          break;
      }
      this.keyboard.append(key);
    }
    return this;
  }

  setKeys(keys) {
    const chars = Array.from(this.keyboard.children).filter((key) => key.classList.contains('char'));
    for (let i = 0; i < keys.length; i += 1) {
      chars[i].textContent = keys[i];
      chars[i].classList.add(KEY_CODES[i]);
      chars[i].onclick = (event) => {
        const ta = document.querySelector('.textarea');
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        if (start === end) {
          ta.value = ta.value.substring(0, start) + event.target.textContent
                        + ta.value.substring(end, ta.value.length);
          ta.selectionStart = start + 1;
          ta.selectionEnd = end + 1;
        } else {
          ta.value = ta.value.substring(0, start) + event.target.textContent
                        + ta.value.substring(end, ta.value.length);
          ta.selectionStart = start + 1;
          ta.selectionEnd = start + 1;
        }
        ta.focus();
        if (!event.target.classList.contains('real')) {
          const shifts = Array.from(document.querySelectorAll('.shift'));
          shifts.map((shift) => shift.classList.remove('active'));
          this.unsetShift();
          const caps = document.querySelector('.capslock');
          if (!caps.classList.contains('active')) this.unsetCaps();
          else this.setCaps();
        }
      };
    }
    return this;
  }

  get() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Tab'
                || event.key === 'Alt'
                || event.code === 'ArrowLeft'
                || event.code === 'ArrowRight'
                || event.code === 'ArrowUp'
                || event.code === 'Backspace'
                || event.code === 'Space'
                || event.code === 'Delete'
                || event.code === 'ArrowDown') event.preventDefault();

      document.querySelector('.textarea').focus();
      try {
        if (event.key.length > 1 || event.key === ' ') {
          if (!event.repeat) {
            const pressed = document.querySelector(`.${event.code.toLowerCase()}`);
            pressed.classList.add('real');
            pressed.click();
            if (event.code !== 'CapsLock') pressed.classList.add('active');
          }
        } else {
          event.preventDefault();
          const pressed = document.querySelector(`.${event.code}`);
          pressed.classList.add('active');
          pressed.classList.add('real');
          pressed.click();
        }
      } catch {
        console.log('key is not found');
      }
    });

    document.addEventListener('keyup', (event) => {
      document.querySelector('.textarea').focus();
      try {
        if (event.key.length > 1 || event.key === ' ') {
          if (event.code !== 'CapsLock') {
            const pressed = document.querySelector(`.${event.code.toLowerCase()}`);
            pressed.classList.remove('real');
            if (event.code !== 'Tab'
                            && event.key !== 'Alt'
                            && event.code !== 'ArrowLeft'
                            && event.code !== 'ArrowRight'
                            && event.code !== 'ArrowUp'
                            && event.code !== 'Backspace'
                            && event.code !== 'Space'
                            && event.code !== 'Delete'
                            && event.code !== 'ArrowDown') pressed.click();
            pressed.classList.remove('active');
          }
        } else {
          event.preventDefault();
          const pressed = document.querySelector(`.${event.code}`);
          pressed.classList.remove('active');
          pressed.classList.remove('real');
        }
      } catch {
        console.log('key is not found');
      }
    });

    return this.keyboard;
  }
}

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
document.body.append(textarea);

const keyboard = new Keyboard();
if (keyboard.lng === 'en') keyboard.setBase().setKeys(EN_KEYBOARD);
else keyboard.setBase().setKeys(RU_KEYBOARD);
document.body.append(keyboard.get());

const info = document.createElement('h2');
info.classList.add('info');
info.innerText = `Клавиатура создана в операционной системе Windows. 
                  Для переключения языка комбинация: левыe shift + alt.
                  Для корректной работы язык на ОС должен совпадать с языком клавиатуры`;
document.body.append(info);
