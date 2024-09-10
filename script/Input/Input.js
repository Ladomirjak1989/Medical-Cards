class Input {
    constructor(containerId) {
        this.container = document.getElementById(containerId); //Зберігає контейнер для форми, шукаючи елемент з переданим containerId у DOM.
        this.config = {  //Об'єкт, що містить конфігурації для різних типів полів вводу
            password: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "password",
                placeholder: "Password",
                name: "password",
            },
            email: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "email",
                placeholder: "Email",
                name: "email",
            },
            name: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "text",
                placeholder: "Full name",
                name: "name",
            },

            goal: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "text",
                placeholder: "The purpose of the visit",
                name: "goal",
            },

            dateVisit: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "date",
                placeholder: "Date of Visit",
                name: "dateVisit",
            },

            weigth: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "number",
                placeholder: "Body Mass Index",
                name: "weigth",

            },
            nbp: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "text",
                placeholder: "Normal Blood Pressure",
                name: "nbp",

            },

            age: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                type: "number",
                placeholder: "Age",
                name: "age",


            },
            lastVisit: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                placeholder: "Last visit",
                name: "lastVisit",
            },

            search:{
                placeholder: "Enter name or type of doctor",
                name: "search",
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            }
        };

    }

    render(id, value) {

        const inputConfig = this.config[id];
        if (!inputConfig) { 
            throw new Error(`Input configuration for "${id}" not found.`);
        }
    
        const { className, type, placeholder, name } = inputConfig;
        const label = document.createElement("label");
        label.htmlFor = name;
        label.textContent = placeholder;
        label.className = "block text-sm font-medium text-gray-700 mb-1";
    
        const input = document.createElement("input"); 
        input.id = name;
        input.name = name;
        input.placeholder = placeholder;
        input.className = className;
        input.type = type;
    
        if (type === "date" && value) {
            
            // Перевірка чи value є об'єктом Date, і чи передано значення
            const dateValue = new Date(value);
            const formattedDate = dateValue.toISOString().split('T')[0]; // Форматування дати в YYYY-MM-DD
            input.value = formattedDate;
        } else {
            input.value = value || "";
        }
    
        label.appendChild(input);
        return label;
    }
    
}

export default Input;

