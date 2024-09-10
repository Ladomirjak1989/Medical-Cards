import Button from "../Button/Button.js";
import Form from "../Form/Form.js";
import cardList from "../CardList/CardList.js";
import Visit from "../Visit/Visit.js";
import VisitCardio from "../VisitCardio/VisitCardio.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";

class Modal {
    constructor() {
        this.modal = document.createElement("div"); // Створює новий HTML-елемент <div>, який буде модальним вікном
        this.config = { //Об'єкт конфігурації, який визначає різні типи модальних вікон, їх стилі, текст та можливі кнопки.
            login: {
                className: "fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center",
                text: "Login",
                id: "modal",
            },
            createCard: {
                className: "fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center",
                text: "Create Card",
                id: "modal",
            },
            showMore: {
                className: "fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center",
                text: "Details about your card",
                id: "modal",
                buttons: ["cancel"]
            },

            updated: {
                className: "fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center",
                text: "Updated your card",
                id: "modal",
            },

            delete: {
                className: "fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center",
                text: "Are you sure, that you want to delete the card?",
                id: "modal",
                buttons: ["deleteCard", "cancel"]
            }
        };
    }

    render(id, cardId) {
        const { className, text, id: modalId, buttons } = this.config[id];
        this.modal.className = className;
        this.modal.id = modalId;

        const modalContent = document.createElement("div"); //Створюється елемент, який буде вмістом модального вікна (білий фон, відступи, закруглені кути).
        modalContent.className = " border p-4 rounded-lg shadow-md bg-white mx-auto space-y-4 max-h-[85%] overflow-y-auto";

        const closeButton = new Button().render("close");//Створює кнопку для закриття модального вікна.

        const title = document.createElement("h2");
        title.className = "text-2xl font-semibold mb-4";
        title.textContent = text;

        if (cardId && id === "delete") { //Якщо модальне вікно стосується видалення картки Перевіряється, чи передано cardId (ідентифікатор картки), яку потрібно видалити.
            modalContent.append(closeButton, title); //Додаються кнопка закриття і заголовок у модальне вікно

            // Create a div container for the buttons with flex and justify-between
            const buttonSure = document.createElement("div");
            buttonSure.className = "flex justify-between mt-2";

            buttons.forEach(element => {  //Для кожної кнопки з конфігурації викликається метод render з передачею cardId (для видалення картки).
                const btn = new Button().render(element, cardId)
                buttonSure.appendChild(btn); // Add buttons to the container
            });
            modalContent.append(buttonSure);
            this.modal.append(modalContent);
            return this.modal
        }

        if (cardId && id === "showMore") {
            const card = cardList.cards[cardId] //Отримується картка за її id зі списку карток.

            const { name, description, doctors, goal, priority, dateVisit, ...rest } = card

            const div = document.createElement("div")
            div.className = "p-4 bg-gray-100 rounded-lg shadow space-y-2"

            const visit = new Visit().renderShowMore(card) //Створюється загальний вміст для перегляду картки

            let visitInfo = null // Залежно від типу лікаря (кардіолог, дантист, терапевт), створюється специфічний вміст для відображення додаткової інформації.

            if (card.doctors === "cardiologist") {
                visitInfo = new VisitCardio().renderShowMore(rest)
            }
            
            if (card.doctors === "dentist") {
                visitInfo = new VisitDentist().renderShowMore(rest)
            }
            if (card.doctors === "therapist") {
                visitInfo = new VisitTherapist().renderShowMore(rest)
            }
            div.append(visit, visitInfo)
            modalContent.append(closeButton, title, div);

            buttons.forEach(element => {
                const btn = new Button().render(element)
                modalContent.append(btn)
            });


            this.modal.append(modalContent); //Додається кнопка закриття, заголовок і детальна інформація про картку до модального вікна.
            return this.modal

        }
        const form = new Form().render(id, cardId)

        modalContent.append(closeButton, title, form);
        this.modal.append(modalContent); //Додається вміст модального вікна (контейнер з усіма елементами) до самого модального вікна.

        return this.modal;
    }


}

export default Modal;

