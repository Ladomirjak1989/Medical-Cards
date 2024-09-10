import Visit from "../Visit/Visit.js";
import VisitCardio from "../VisitCardio/VisitCardio.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js"
import VisitDentist from "../VisitDentist/VisitDentist.js";


class Select {
    constructor() {
        this.select = document.createElement("select")
        this.config = { // Об'єкт конфігурації, який містить налаштування для різних випадаючих списків, таких як вибір лікаря (doctors) і вибір пріоритету (priority).
            doctors: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                options: ["Choose doctor", "Therapist", "Dentist", "Cardiologist"],
                value: ["", "therapist", "dentist", "cardiologist"],
                name: "doctors",
                labelText: "Choose doctor",
                onchange: (e) => {
                    // логіка для зміни форми залежно від вибору лікаря
                  
                    const visit = new Visit({ //Створюється базова форма для візиту, яка містить загальні поля (ім'я, мета візиту, дата).
                        createCard: {
                            inputs: ["name", "goal", "dateVisit"],
                            textares: ["description"],
                            selects: ["priority"]
                        }
                    }).render("createCard")

                    const form = e.target.closest("form") //Знаходить найближчу форму, до якої належить випадаючий список.
                    const btnWrapper = form.querySelector(".wrapperBtn")

                    const div = document.querySelector("#inputWrapper")
                    if (div) {
                        div.remove()

                    }

                    const inputWrapper = document.createElement("div") //Створюється контейнер для додаткових полів форми.
                    inputWrapper.id = "inputWrapper"
                    inputWrapper.append(visit)

                    if (e.target.value === "therapist") {
                        const visitTherapist = new VisitTherapist({
                            createCard: {
                                inputs: ["age"],
                                textares: ["diagnosis"],
                            }
                        }).render("createCard")
                        inputWrapper.append(visitTherapist)

                    }

                    if (e.target.value === "dentist") {
                        const visitDentist = new VisitDentist({
                            createCard: {
                                inputs: ["lastVisit", "age"],
                            }
                        }).render("createCard")
                        inputWrapper.append(visitDentist)
                    }

                    if (e.target.value === "cardiologist") {
                        const visitCardio = new VisitCardio({
                            createCard: {
                                inputs: ["weigth", "nbp", "age"],
                                textares: ["diagnosis"],
                            }
                        }).render("createCard")
                        inputWrapper.append(visitCardio)
                    }

                    btnWrapper.before(inputWrapper)
                }
            },
            priority: { //Конфігурація для вибору пріоритету візиту (звичайний, пріоритетний, терміновий)
                className: "border border-gray-300 p-2 rounded font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                options: ["Choose priority", "Ordinary", "Priority", "Urgent"],
                value: ["", "ordinary", "priority", "urgent"],
                name: "priority",
                labelText: "Choose Priority",
            },

            doctors_Updated: {
                className: "border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                options: ["Choose doctor", "Therapist", "Dentist", "Cardiologist"],
                value: ["", "therapist", "dentist", "cardiologist"],
                name: "doctors",
                labelText: "Choose doctor",
                onchange: (e) => {
                    // логіка для зміни форми залежно від вибору лікаря
                  const wrapper = document.querySelector("#wrapper")
                  const doctor = e.target.value 
                  console.log(doctor)
                  
                  let visit = null
                  if(doctor === "cardiologist"){
                    visit = new VisitCardio({
                        createCard: {
                            inputs: ["weigth", "nbp", "age"],
                            textares: ["diagnosis"],
                        }
                    }).render("createCard")
                  }

                  if(doctor === "dentist"){
                    visit = new VisitCardio({
                        createCard: {
                            inputs: ["lastVisit", "age"],
                          
                        }
                    }).render("createCard")
                  }

                  if(doctor === "therapist"){
                    visit = new VisitCardio({
                        createCard: {
                            inputs: ["age"],
                            textares: ["diagnosis"],
                        }
                    }).render("createCard")
                  }
                  wrapper.innerHTML = "" 
                  wrapper.append(visit)
                }
            },
            status:{
                className: "border border-gray-300 p-2 rounded font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
                options: ["Choose status","Open", "Done"],
                value: ["", "open", "done"],
                name: "status",
                labelText: "Choose Status",
            }
        }
    }

    render(id, updatedValue) { // Це основний метод, який використовується для рендерингу випадаючого списку на основі конфігурації, переданої в id
       
        const { className, options, value, name, labelText, onchange } = this.config[id]; //Використовується для отримання налаштувань конкретного випадаючого списку за його id. Це конфігурація, яка включає такі властивості, як className, options, value, name, labelText, і onchange
        this.select.className = className; //Застосовує CSS класи до елемента <select>, що стилізують його через Tailwind CSS (наприклад, рамка, закруглені кути, відступи, фокус)
        this.select.id = name;
        this.select.name = name; // Встановлює атрибут name та id для елемента <select>. Це потрібно для ідентифікації поля при відправці форми.

        options.forEach((element, index) => {  
            // Якщо це перший елемент (index === 0), він буде disabled і selected
            const disabledAttribute = index === 0 ? "disabled selected" : ""; // Додаємо "selected" для першого елемента
            this.select.insertAdjacentHTML("beforeend", `<option ${disabledAttribute} value="${value[index]}">${element}</option>`);
        });

        const label = document.createElement("label");
        label.textContent = labelText;
        label.htmlFor = name;
        label.className = "block text-sm font-semibold font-small text-gray-700 mb-2"

        this.select.value = updatedValue || value[0];//Встановлює початкове значення для випадаючого списку, яке відповідає першій опції (зазвичай "Choose doctor")
        this.select.addEventListener("change", onchange) //Додає обробник подій для випадаючого списку, який викликається при зміні вибору користувача. Функція onchange, передана з конфігурації, буде обробляти зміни, наприклад, відображення додаткових полів залежно від вибраного лікаря.
        label.append(this.select);  //Додає випадаючий список (<select>) до створеної мітки (<label>).


        return label;
    }
}

export default Select;
