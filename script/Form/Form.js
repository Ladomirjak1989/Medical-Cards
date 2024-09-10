import Button from "../Button/Button.js";
import Input from "../Input/Input.js";
import api from "../API/API.js";
import Select from "../Select/Select.js";
import cardList from "../CardList/CardList.js";
import Textarea from "../Textarea/Textarea.js";
import main from "../Main/Main.js";
import VisitCardio from "../VisitCardio/VisitCardio.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";

class Form {
    constructor() {
        this.form = document.createElement("form"); // Створюємо елемент <form>, який буде контейнером для полів вводу та кнопок.
        this.wrapper = document.createElement("div"); // Створюємо обгортку для додавання кнопок в форму.
        this.form.className = "border p-6 rounded-lg shadow-md bg-white mx-auto space-y-6"; // Примусовий скрол додано

        this.config = {
            login: {
                className: "border p-6 rounded-lg shadow-md bg-white mx-auto space-y-6",
                inputs: ["email", "password"],
                buttons: ["submitLogin", "cancel", "demo"],
                onSubmit: async (e) => {
                    e.preventDefault(); // Зупиняємо стандартну поведінку браузера (перезавантаження сторінки).
                    const inputs = this.form.querySelectorAll("input"); // Отримуємо всі поля вводу з форми.
                    const formData = [...inputs].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з полів вводу у вигляді об'єкта.
                        return acc;
                    }, {});

                    const token = await api.login(formData); // Відправляємо дані на сервер для авторизації.
                    if (token === "Incorrect username or password") { // Якщо авторизація неуспішна:
                        const errorMessage = document.createElement('p'); // Створюємо повідомлення про помилку.
                        errorMessage.className = 'text-red-500 mt-2'; // Додаємо стиль для помилки.
                        errorMessage.textContent = token; // Виводимо текст помилки.
                        this.form.appendChild(errorMessage); // Додаємо повідомлення до форми.
                        return;
                    }

                    e.target.closest("#modal").remove(); // Закриваємо модальне вікно після успішної авторизації.
                    const btn = document.querySelector("#login"); // Знаходимо кнопку "login".
                    const newBtn = new Button().render("createCard"); // Замінюємо кнопку "login" на "createCard".
                    btn.replaceWith(newBtn);

                    const cards = await api.getCards(); // Отримуємо список карток після авторизації (додатковий функціонал).

                    const footer = document.querySelector("#footer")
                    const mainBlock = main.render()   //Рендерить головний блок сторінки, де будуть відображатися картки.
                    if (!cards.length) {   //Якщо карток немає, то додає порожній блок у DOM і виходить
                        footer.before(mainBlock)
                        return
                    }
                    if (cards.length) {   //Якщо картки є, викликає метод renderCards для відображення кожної картки. Метод очищає вміст mainBlock, додає згенеровані картки і відображає їх на сторінці.
                        const cardEl = await cardList.renderCards(cards)
                        mainBlock.innerHTML = ""   //Очищає вміст основного блоку перед рендерингом карток.
                        mainBlock.append(cardEl)  //Додає відрендерені картки до головного блоку сторінки
                        footer.before(mainBlock)   //Додає головний блок до кореневого елемента сторінки

                    }


                }
            },
            createCard: {
                className: "space-y-4", // Відступи між елементами форми.
                selects: ["doctors"], // Випадаючий список для вибору лікаря.
                buttons: ["submitLogin", "cancel"], // Кнопки форми (submit і cancel).
                onSubmit: async (e) => {
                    e.preventDefault(); // Зупиняємо стандартну поведінку браузера.
                    const inputs = this.form.querySelectorAll("input"); // Отримуємо всі поля вводу.
                    const formInputs = [...inputs].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з полів вводу у вигляді об'єкта.
                        return acc;
                    }, {});

                    const textarea = this.form.querySelectorAll("textarea"); // Отримуємо всі текстові поля.
                    const formDataTextarea = [...textarea].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з текстових полів.
                        return acc;
                    }, {});

                    const selects = this.form.querySelectorAll("select"); // Отримуємо всі випадаючі списки.
                    const formDataSelect = [...selects].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з випадаючих списків.
                        return acc;
                    }, {});

                    const formData = { ...formInputs, ...formDataTextarea, ...formDataSelect }; // Об'єднуємо всі дані з форми.
                   
                    const card = await api.createCard(formData); // Відправляємо дані на сервер для створення картки.
                    const cardEl = cardList.renderCard(card); // Рендеримо нову картку.
                    const ul = document.querySelector("#list"); // Знаходимо список карток.
                    ul.append(cardEl); // Додаємо нову картку в список.

                    e.target.closest("#modal").remove(); // Закриваємо модальне вікно після успішного створення картки.
                }
            },

            updated: {
                className: "space-y-4", // Відступи між елементами форми.
                selects: ["doctors_Updated", "priority"], // Випадаючий список для вибору лікаря.
                buttons: ["submitLogin", "cancel"], // Кнопки форми (submit і cancel).
                inputs: ["name", "goal", "dateVisit"],
                textareas: ["description"],
                onSubmit: async (e, cardId) => {
                    e.preventDefault(); // Зупиняємо стандартну поведінку браузера.
                    const inputs = this.form.querySelectorAll("input"); // Отримуємо всі поля вводу.
                    const formInputs = [...inputs].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з полів вводу у вигляді об'єкта.
                        return acc;
                    }, {});

                    const textarea = this.form.querySelectorAll("textarea"); // Отримуємо всі текстові поля.
                    const formDataTextarea = [...textarea].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з текстових полів.
                        return acc;
                    }, {});

                    const selects = this.form.querySelectorAll("select"); // Отримуємо всі випадаючі списки.
                    const formDataSelect = [...selects].reduce((acc, curr) => {
                        acc[curr.name] = curr.value; // Збираємо дані з випадаючих списків.
                        return acc;
                    }, {});

                    const formData = { ...formInputs, ...formDataTextarea, ...formDataSelect }; // Об'єднуємо всі дані з форми.
                  
                    const card = await api.updateCard(formData, cardId); // Відправляємо дані на сервер для створення картки.
                    const cardEl = cardList.renderCard(card); // Рендеримо нову картку.
                    const li = document.getElementById(cardId); // Знаходимо список карток.
                    li.replaceWith(cardEl); // Додаємо нову картку в список.

                    e.target.closest("#modal").remove(); // Закриваємо модальне вікно після успішного створення картки.
                }
            },

                }
            }
        
    

    render(id, cardId) {
        const { className, inputs, buttons, onSubmit, selects, textareas } = this.config[id]; // Отримує конфігурацію для конкретної форми за її id
        this.form.className = className; // Встановлює клас для форми
       

        // let card = null
        // if (cardId) {
        //     card = cardList.cards[cardId]
        // }

        let card = cardId ? cardList.cards[cardId] : null
        //Це тернарний оператор. Він перевіряє, чи істинне значення cardId.
        //Якщо cardId істинне, вираз після знаку ? виконається: cardList.cards[cardId].
        //Якщо cardId хибне або відсутнє, виконається вираз після двокрапки (:): null.

        if (selects) {
            selects.forEach(element => {
                const value = card ? card[element.split("_")[0]] : null
                const select = new Select().render(element, value); // Рендерить випадаючі списки (select)
                this.form.append(select); // Додає випадаючий список до форми
            });
        }

        if (inputs) {
            inputs.forEach(element => {
               
                const value = card ? card[element] : null
                const input = new Input().render(element, value); // Рендерить поля вводу (input)
                this.form.append(input); // Додає поле вводу до форми
            });
        }



        if (textareas) {
            textareas.forEach(element => {
                const value = card ? card[element] : null
                const textarea = new Textarea().render(element, value); // Рендерить випадаючі списки (select)
                this.form.append(textarea); // Додає випадаючий список до форми
            });
        }

        if (id === "updated") {
            const div = document.createElement("div")
            div.id = "wrapper"
            let visit = null
            if (card.doctors === "cardiologist") {
                visit = new VisitCardio({
                    createCard: {
                        inputs: ["weigth", "nbp", "age"],
                        textares: ["diagnosis"],
                    }
                }).render("createCard", card)
            }

            if (card.doctors === "dentist") {
                visit = new VisitDentist({
                    createCard: {
                        inputs: ["lastVisit", "age"],
                    }
                }).render("createCard", card)
            }

            if (card.doctors === "therapist") {
                visit = new VisitTherapist({
                    createCard: {
                        inputs: ["age"],
                        textares: ["diagnosis"],
                    }
                }).render("createCard", card)
            }
            div.append(visit)
            this.form.append(div)
        }



        this.wrapper.className = "flex justify-between items-center mt-4 space-x-4"; // Встановлює клас для контейнера з кнопками

        buttons.forEach(btn => {
            const button = new Button().render(btn); // Рендерить кнопки
            button.className += " px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"; // Додає стилі для кнопок
            this.wrapper.append(button); // Додає кнопку до контейнера
        });

        this.form.append(this.wrapper); // Додає контейнер з кнопками до форми
        this.form.addEventListener("submit", (e)=>{
            onSubmit(e, cardId)
        }); // Додає обробник подій для відправки форми

        return this.form; // Повертає HTML форму
    }

}

export default Form;

