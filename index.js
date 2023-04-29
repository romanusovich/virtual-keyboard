const EN_KEYBOARD = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'",
    "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"
];

const EN_KEYBOARD_SHIFT = [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\"',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'
];

const RU_KEYBOARD = [
    "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
    "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
    "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."
];

const RU_KEYBOARD_SHIFT = [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+',
    'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
    'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
    'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ','
];

class Keyboard {
    constructor() {
        this.keyboard = {};
        this.lng = localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";
    }

    setShift() {
        if (this.lng === "en") this.setKeys(EN_KEYBOARD_SHIFT);
        else this.setKeys(RU_KEYBOARD_SHIFT);
    }

    unsetShift() {
        if (this.lng === "en") this.setKeys(EN_KEYBOARD);
        else this.setKeys(RU_KEYBOARD);
    }

    setCaps() {
        let chars = Array.from(document.querySelectorAll(".char"));
        chars.map(char => char.textContent = char.textContent.toUpperCase());
    }

    unsetCaps() {
        let chars = Array.from(document.querySelectorAll(".char"));
        chars.map(char => char.textContent = char.textContent.toLowerCase());
    }

    changeLng() {
        if (this.lng === "en") {
            this.lng = "ru";
            localStorage.setItem("lng", "ru");
            this.setKeys(RU_KEYBOARD);
        }
        else {
            this.lng = "en";
            localStorage.setItem("lng", "en");
            this.setKeys(EN_KEYBOARD);
        }
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
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start - 1) + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start - 1;
                            ta.selectionEnd = end - 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start;
                            ta.selectionEnd = start;
                        }
                        ta.focus();
                    });
                    break;
                case 14:
                    key.classList.add('tab');
                    key.textContent = 'Tab';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + '\t' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + '\t' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = start + 1;
                        }
                        ta.focus();
                    });
                    break;
                case 28:
                    key.classList.add('del');
                    key.textContent = 'Del';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + ta.value.substring(end + 1, ta.value.length);
                            ta.selectionStart = start;
                            ta.selectionEnd = end;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start;
                            ta.selectionEnd = start;
                        }
                        ta.focus();
                    });
                    break;
                case 29:
                    key.classList.add('caps');
                    key.textContent = 'Caps';
                    key.addEventListener("click", (event) => {
                        let caps = event.target;
                        caps.classList.toggle("active");
                        let isAnyActive = Array.from(document.querySelectorAll(".shift"))
                            .filter(shift => shift.classList.contains("active")).length > 0;
                        if (!isAnyActive) {
                            if (caps.classList.contains("active")) this.setCaps();
                            else this.unsetCaps();
                        } else {
                            if (!caps.classList.contains("active")) this.setCaps();
                            else this.unsetCaps();
                        }
                    });
                    break;
                case 41:
                    key.classList.add('enter');
                    key.textContent = 'Enter';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + '\n' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + '\n' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = start + 1;
                        }
                        ta.focus();
                    });
                    break;
                case 42:
                case 54:
                    key.classList.add('shift');
                    key.textContent = 'Shift';
                    key.addEventListener("click", (event) => {
                        let isAnyActive = Array.from(document.querySelectorAll(".shift"))
                            .filter(shift => shift.classList.contains("active")).length > 1;
                        let shift = event.target;
                        shift.classList.toggle("active");
                        let caps = document.querySelector(".caps");
                        if (!isAnyActive) {
                            if (!caps.classList.contains("active")) {
                                if (shift.classList.contains("active")) this.setShift();
                                else this.unsetShift();
                            } else {
                                if (!shift.classList.contains("active")) { 
                                    this.unsetShift(); 
                                    this.setCaps(); 
                                }
                                else { 
                                    this.setShift();
                                    this.unsetCaps(); 
                                }
                            }
                        }

                        let lalt = document.querySelector(".alt");
                        let lshift = document.querySelector(".shift");
                        if (lshift.classList.contains("active") && lalt.classList.contains("active")) {
                            this.changeLng();
                            lalt.classList.remove("active");
                            lshift.click();
                        }
                    });
                    break;
                case 55:
                case 63:
                    key.classList.add('ctrl');
                    key.textContent = 'Ctrl';
                    key.addEventListener("click", (event) => {
                        event.target.classList.toggle("active");
                    });
                    break;
                case 56:
                    key.classList.add('win');
                    key.textContent = 'Win';
                    key.addEventListener("click", (event) => {
                        event.target.classList.toggle("active");
                    });
                    break;
                case 57:
                case 59:
                    key.classList.add('alt');
                    key.textContent = 'Alt';
                    key.addEventListener("click", (event) => {
                        event.target.classList.toggle("active")
                        let lalt = document.querySelector(".alt");
                        let lshift = document.querySelector(".shift");
                        if (lshift.classList.contains("active") && lalt.classList.contains("active")) {
                            this.changeLng();
                            lalt.classList.remove("active");
                            lshift.click();
                        }
                    });
                    break;
                case 58:
                    key.classList.add('space');
                    key.textContent = '_____';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + ' ' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + ' ' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = start + 1;
                        }
                        ta.focus();
                    });
                    break;
                case 53:
                    key.classList.add('arrow-up');
                    key.textContent = '↑';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + '↑' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + '↑' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = start + 1;
                        }
                        ta.focus();
                    });
                    break;
                case 60:
                    key.classList.add('arrow-left');
                    key.textContent = '←';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + '←' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + '←' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = start + 1;
                        }
                        ta.focus();
                    });
                    break;
                case 61:
                    key.classList.add('arrow-down');
                    key.textContent = '↓';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + '↓' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + '↓' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = start + 1;
                        }
                        ta.focus();
                    });
                    break;
                case 62:
                    key.classList.add('arrow-right');
                    key.textContent = '→';
                    key.addEventListener("click", () => {
                        let ta = document.querySelector('.textarea');
                        let start = ta.selectionStart;
                        let end = ta.selectionEnd;
                        if (start === end) {
                            ta.value = ta.value.substring(0, start) + '→' + ta.value.substring(end, ta.value.length);
                            ta.selectionStart = start + 1;
                            ta.selectionEnd = end + 1;
                        }
                        else {
                            ta.value = ta.value.substring(0, start) + '→' + ta.value.substring(end, ta.value.length);
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
        let chars = Array.from(this.keyboard.children).filter(key => key.classList.contains('char'));
        for (let i = 0; i < keys.length; i++) {
            chars[i].textContent = keys[i];
            chars[i].onclick = (event) => {
                let ta = document.querySelector('.textarea');
                let start = ta.selectionStart;
                let end = ta.selectionEnd;
                if (start === end) {
                    ta.value = ta.value.substring(0, start) + event.target.textContent + ta.value.substring(end, ta.value.length);
                    ta.selectionStart = start + 1;
                    ta.selectionEnd = end + 1;
                }
                else {
                    ta.value = ta.value.substring(0, start) + event.target.textContent + ta.value.substring(end, ta.value.length);
                    ta.selectionStart = start + 1;
                    ta.selectionEnd = start + 1;
                }
                ta.focus();
                let shifts = Array.from(document.querySelectorAll(".shift"));
                shifts.map(shift => shift.classList.remove("active"));
                let caps = document.querySelector(".caps");
                if (!caps.classList.contains("active")) {
                    this.setShift();
                    this.unsetCaps();
                } else {
                    this.unsetShift();
                    this.setCaps();
                }
            };
        }
        return this;
    }

    get() {
        return this.keyboard;
    }
}

let textarea = document.createElement("textarea");
textarea.classList.add("textarea");
document.body.append(textarea);

let keyboard = new Keyboard();
if (keyboard.lng === "en") keyboard.setBase().setKeys(EN_KEYBOARD);
else keyboard.setBase().setKeys(RU_KEYBOARD);
document.body.append(keyboard.get());

let info = document.createElement("h2");
info.classList.add("info");
info.innerText = `Клавиатура создана в операционной системе Windows. 
                  Для переключения языка комбинация: левыe shift + alt`;
document.body.append(info);