class Textarea {
    constructor() {    //Це конструктор класу Textarea, який ініціалізує базові налаштування для створення текстової області
        this.textarea = document.createElement("textarea") //Створюється HTML елемент <textarea>, який буде полем для вводу тексту.
        this.config = {   //Об'єкт, що містить конфігурацію для різних типів текстових областей, таких як description і diagnosis
            description: {
                className: "border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full",
                placeholder: "Description",
                name: "description",
            },
            diagnosis: {
                className: "border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full",
                placeholder: "Diagnosis",
                name: "diagnosis",
            },

        }
    }
    render(id, value = "") {    // Метод для рендерингу текстової області на основі її конфігурації   //alue = ""

        const { className, placeholder, name } = this.config[id];  //Витягує потрібні налаштування (className, placeholder, name) з об'єкта конфігурації для конкретної текстової області за переданим id.
        const label = document.createElement("label");   //Створює HTML елемент <label>, який буде описувати текстову область.
        label.htmlFor = name;   //Встановлює атрибут for, який зв'язує мітку з текстовою областю через атрибут name
        label.textContent = placeholder;   //Текст мітки буде відповідати плейсхолдеру текстової області, щоб користувачеві було зрозуміло, для чого це поле
        label.className = "block text-sm font-semibold font-small text-gray-700 mb-2";  //Додає стилі для мітки через Tailwind CSS: розмір тексту, колір і відступ знизу.

        this.textarea.className = className
        this.textarea.placeholder = placeholder
        this.textarea.name = name
        this.textarea.id = name
        this.textarea.rows = 2   //Встановлює початкову кількість рядків текстової області на 1, щоб виглядало компактно.
        this.textarea.value = value

        label.appendChild(this.textarea)   //Додає текстову область до мітки, щоб створити готовий компонент, що складається з мітки і текстової області.
        return label   //Повертає готовий компонент label, який містить і мітку, і текстову область, готовий для вставки в DOM

    }
}
export default Textarea