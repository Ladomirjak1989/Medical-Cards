import Textarea from "../Textarea/Textarea.js"
import Select from "../Select/Select.js"
import Input from "../Input/Input.js"


class Visit {  //Це конструктор класу Visit, який приймає конфігураційний об'єкт config. Цей об'єкт визначає, які поля вводу, текстові області та випадаючі списки будуть рендеритися для конкретного візиту
    constructor(config) {
        this.config = config //Зберігає конфігурацію, яка передається при створенні екземпляра класу
        this.parent = document.createElement("div")  //Створюється контейнер div, який буде використовуватися як батьківський елемент для полів вводу.
        this.parent.className = "p-2 bg-white rounded-lg shadow-md space-y-4"


    }
    render(id, card = {}) {    //Метод для рендерингу полів форми на основі конфігурації для конкретного візиту
        const { inputs, textares, selects } = this.config[id]  //Отримує з конфігурації поля inputs, textares (текстові області) і selects (випадаючі списки) для певного типу візиту

        if (inputs) {
            inputs.forEach(element => {    //Для кожного поля вводу створює елемент Input за допомогою методу render з відповідного класу Input. Додаються стилі для полів вводу за допомогою Tailwind CSS і елемент додається до батьківського контейнера this.parent.
                const input = new Input().render(element, card[element])
                input.className += " w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                this.parent.append(input)
            });
        }

        if (textares) {
            textares.forEach(element => {   //Створює текстові області через клас Textarea, додає стилі та додає ці елементи до батьківського контейнера
                const textare = new Textarea().render(element, card[element])
                textare.className += " w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                this.parent.append(textare)
            });
        }

        if (selects) {
            selects.forEach(element => {   // Створює випадаючі списки через клас Select, додає стилі та додає їх до батьківського контейнера
                const select = new Select().render(element, card[element])
                select.className += " w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                this.parent.append(select)
            });
        }
        return this.parent   //Повертає батьківський контейнер, який містить усі поля форми. Цей контейнер може бути доданий до DOM
    }
    renderShowMore(card) {    //Метод для рендерингу додаткової інформації про візит у форматі картки.
        const div = document.createElement("div")   //Створюється новий div, який буде містити інформацію про візит.
        div.insertAdjacentHTML("beforeend", `   
           <p><span class="font-semibold text-gray-800">Full name:</span> <span>${card.name}</span></p>
           <p><span class="font-semibold text-gray-800">The type of Doctor:</span> <span>${card.doctors}</span></p>
           <p><span class="font-semibold text-gray-800">The purpose of the visit:</span> <span>${card.goal}</span></p>
           <p><span class="font-semibold text-gray-800">Date of visit:</span> <span>${card.dateVisit}</span></p>
           <p><span class="font-semibold text-gray-800">Description:</span> <span>${card.description}</span></p>
           <p><span class="font-semibold text-gray-800">Priority of visit:</span> <span>${card.priority}</span></p>
    `)   //Додає HTML-вміст, який містить інформацію про візит, таку як ім'я пацієнта, лікар, мета візиту, дата, опис і пріоритет
        //${card.name}: Вставляє динамічні дані з об'єкта card (дані візиту), такі як ім'я, лікар, мета візиту тощо. 

        return div   //Повертає контейнер з додатковою інформацією про візит, який може бути вставлений у DOM
    }
}
export default Visit
