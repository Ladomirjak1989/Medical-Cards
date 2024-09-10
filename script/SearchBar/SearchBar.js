import Button from "../Button/Button.js";
import Select from "../Select/Select.js";
import Input from "../Input/Input.js";
import cardList from "../CardList/CardList.js";

class SearchBar {
    constructor() {
        this.form = document.createElement("form");
        this.form.className = "bg-gray-300 p-2 shadow-md flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4"
        this.params = {
            search: ["doctors", "name", "description"],
            status: ["dateVisit"],
            priority: ["priority"],
        }
        this.config = {
            search: {
                buttons: ["searchButton"],
                select: ["status", "priority"],
                input: ["search"],


            }
        }
    }

    render(id) {
        const { input, select, buttons } = this.config[id]
        // Додаємо інпут
        input.forEach(element => {
            const item = new Input().render(element)
            this.form.append(item)
        }
        )
        // Додаємо селекти
        select.forEach(element => {
            const item = new Select().render(element)
            this.form.append(item)
        }
        )
        // Додаємо кнопки
        buttons.forEach(element => {
            const item = new Button().render(element)
            this.form.append(item)
        }
        )

        // Додавання обробника подій для форми
        this.form.addEventListener("submit", this.handleSubmit.bind(this));

        return this.form; //Повертає готову форму для вставки в DOM.
    }



    handleSubmit(e) {  //Обробник події, який викликається при відправці форми
        e.preventDefault(); //Зупиняє стандартну поведінку браузера при відправці форми (не відправляє форму на сервер)

        // Отримуємо всі інпути та селекти з форми
        const input = this.form.querySelectorAll("input")
        const select = this.form.querySelectorAll("select")

        // Збираємо дані з інпутів
        const inputData = [...input].reduce((acc, curr) => {
            acc[curr.name] = curr.value
            return acc
        }, {})

        // Збираємо дані з селектів
        const selectData = [...select].reduce((acc, curr) => {
            acc[curr.name] = curr.value
            return acc
        }, {})

        // Об'єднуємо всі дані в один об'єкт
        const formData = { ...inputData, ...selectData }

    

        const cards = Object.values(cardList.cards)
       

        let filterEvent = null
        if (formData.search && formData.priority && formData.status) {
            const filteredAll = this.filterByOne(cards, formData.search, "search")
           
            const filtered = this.filterByDate(filteredAll, formData.status, "status")
            filterEvent = this.filterByOne(filtered, formData.priority, "priority")
        }
        else if (formData.search && formData.priority) {
            const filteredAll = this.filterByOne(cards, formData.search, "search")
            filterEvent = this.filterByOne(filteredAll, formData.priority, "priority")

        } else if (formData.search && formData.status) {
            const filteredAll = this.filterByOne(cards, formData.search, "search")
            filterEvent = this.filterByDate(filteredAll, formData.status, "status")

        } else if (formData.priority && formData.status) {
            const filteredAll = this.filterByOne(cards, formData.priority, "priority")
            filterEvent = this.filterByDate(filteredAll, formData.status, "status")
        }

        else if (formData.search) {
            filterEvent = this.filterByOne(cards, formData.search, "search")
           
        }

        else if (formData.priority) {
            filterEvent = this.filterByOne(cards, formData.priority, "priority")
        }

        else if (formData.status) {
            filterEvent = this.filterByDate(cards, formData.status, "status")
        }

        cardList.filtered = filterEvent

        const renderEl = cardList.renderCards(filterEvent)
        const list = document.querySelector("#main div")
    
        list.replaceWith(renderEl)
        this.form.reset(); // Очищає поля форми після відправки
       


       
    }

    

    filterByOne(cards, value, params) {
        const queryParams = this.params[params]
        return cards.filter(item => {
            return queryParams.some(field => {
                // Перевіряємо, чи містить картка шукані поля
                if (item[field]) {
                    // Тут можна прописати умову фільтрації, наприклад:
                    return item[field].includes(value); // Замість 'пошуковий_термін' вставляється конкретне значення
                }
                return false;
            });
        });
    }

    filterByDate(cards, value, params) {
        const queryParams = this.params[params]
        return cards.filter(item => {
            return queryParams.some(field => {
                // Перевіряємо, чи містить картка шукані поля
                if (item[field]) {
                    // Тут можна прописати умову фільтрації, наприклад:
                    const toDay = new Date()
                    const dateOfVisit = new Date(item[field])
                    if (value === "done") {
                        return toDay > dateOfVisit

                    }
                    return toDay < dateOfVisit
                }
                return false;
            });
        });
    }


}




export default new SearchBar()


