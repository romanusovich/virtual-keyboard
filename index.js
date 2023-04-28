class Keyboard {
    constructor() {
        this.keyboard = {};
    }

    setBase() {
        this.keyboard = document.createElement('div');
        this.keyboard.classList.add('keyboard');
        for (let i = 0; i < 64; i++) { // 64 is the number of keys
            let key = document.createElement('div');
            key.classList.add('key');
            switch (i) {
                case 13:
                    key.classList.add('backspace');
                    key.textContent = 'Backspace';
                    break;
                case 14:
                    key.classList.add('tab');
                    key.textContent = 'Tab';
                    break;
                case 28:
                    key.classList.add('del');
                    key.textContent = 'Del';
                    break;
                case 29:
                    key.classList.add('caps');
                    key.textContent = 'Caps';
                    break;
                case 41:
                    key.classList.add('enter');
                    key.textContent = 'Enter';
                    break;
                case 42:
                case 54:
                    key.classList.add('shift');
                    key.textContent = 'Shift';
                    break;
                case 53:
                    key.classList.add('arrow-up');
                    key.textContent = '↑';
                    break;
                case 55:
                case 63:
                    key.classList.add('ctrl');
                    key.textContent = 'Ctrl';
                    break;
                case 56:
                    key.classList.add('win');
                    key.textContent = 'Win';
                    break;
                case 57:
                case 59:
                    key.classList.add('alt');
                    key.textContent = 'Alt';
                    break;
                case 58:
                    key.classList.add('space');
                    key.textContent = '_____';
                    break;
                case 60:
                    key.classList.add('arrow-left');
                    key.textContent = '←';
                    break;
                case 61:
                    key.classList.add('arrow-down');
                    key.textContent = '↓';
                    break;
                case 62:
                    key.classList.add('arrow-right');
                    key.textContent = '→';
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
        let chars = Array.from(this.keyboard.children).filter(key => key.classList.contains('char'));
        for (let i = 0; i < keys.length; i++) {
            chars[i].textContent = keys[i];
        }
        return this;
    }

    get() {
        return this.keyboard;
    }
}

const EN_KEYBOARD = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'",
    "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

const EN_KEYBOARD_SHIFT = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\"',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'];

const RU_KEYBOARD = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
    "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
    "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."];

const RU_KEYBOARD_SHIFT = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+',
    'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
    'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
    'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ','];

let textarea = document.createElement("textarea");
textarea.classList.add("textarea");
document.body.append(textarea);

let CURRENT_LANG = localStorage.getItem("lng") || "en";
let keyboard = new Keyboard();
keyboard.setBase().setKeys(EN_KEYBOARD);
document.body.append(keyboard.get());

let info = document.createElement("h2");
info.classList.add("info");
info.innerText = `Клавиатура создана в операционной системе Windows. 
                  Для переключения языка комбинация: левыe shift + alt`;
document.body.append(info);