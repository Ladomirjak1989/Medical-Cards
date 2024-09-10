import Modal from "../Modal/Modal.js";
import api from "../API/API.js"
// import cardList from "../CardList/CardList.js";

class Button {
    constructor() {
        this.demoUser = { email: "demousercard@gmail.com", password: "12345" },
            this.config = {
                searchButton: {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    text: "SEARCH",
                    type: "submit",
                },
                create: {
                    className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500",
                    type: "submit",
                    text: "CREATE",
                },
                updated: {
                    className: "bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500",
                    type: "button",
                    text: "UPDATED",
                    onClick: (e) => {
                        const id = + e.target.closest("li").id
                        const modal = new Modal();
                        const root = document.getElementById("root")
                        root.append(modal.render("updated", id))// Викликає модальне вікно для підтвердження видалення картки
                    },
                },

                delete: {
                    className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500",
                    text: "DELETE",
                    type: "button",
                    onClick: (e) => {
                        const id = + e.target.closest("li").id
                        const modal = new Modal();
                        const root = document.getElementById("root")
                        root.append(modal.render("delete", id))// Викликає модальне вікно для підтвердження видалення картки
                    },
                },

                deleteCard: {
                    className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500",
                    text: "DELETE CARD",
                    type: "button",
                    onClick: async (e, cardId) => {
                        const data = await api.deleteCard(cardId) // Викликає API для видалення картки
                        if (data === "Successful delete") {
                            const li = document.getElementById(cardId) // Видаляє елемент картки з DOM
                            li.remove()

                            // Створює повідомлення про успішне видалення елемента
                            const successMessage = document.createElement('div');
                            successMessage.className = "bg-green-500 text-white p-6 absolute bottom-0 left-[45%] rounded-lg shadow-lg w-64 h-64 flex items-center justify-center"; // Use flexbox to center the div
                            successMessage.innerHTML = `
                            <div class="bg-white p-4 text-green-500 rounded-lg shadow-lg text-center w-22 h-22 flex items-center justify-center">
                            Card successfully deleted!
                            </div>
                            `;
                            document.body.appendChild(successMessage);

                            setTimeout(() => {
                                successMessage.remove();
                            }, 3000);
                            e.target.closest("#modal").remove();

                        }

                    },
                },
                close: {
                    className: "text-gray-400 float-right text-2xl font-bold cursor-pointer hover:text-black focus:outline-none",
                    type: "button",
                    text: "X",
                    onClick: (e) => {
                        e.target.closest("#modal").remove(); // Закриває модальне вікно
                    }
                },
                cancel: {
                    className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500",
                    type: "button",
                    text: "CANCEL",
                    onClick: (e) => {
                        e.target.closest("#modal").remove();
                    }
                },
                login: {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    type: "button",
                    text: "LOGIN",
                    onClick: () => {
                        const modal = new Modal();
                        const root = document.getElementById("root")
                        root.append(modal.render("login")) // Викликає модальне вікно для авторизації
                    }
                },
                createCard: {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    type: "button",
                    text: "Create Card",
                    onClick: () => {
                        const modal = new Modal();

                        const root = document.getElementById("root")
                        root.append(modal.render("createCard")) // Викликає модальне вікно для створення нової картки

                    }
                },
                submitLogin: {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    type: "submit",
                    text: "SUBMIT",
                },
                showMore: {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    type: "button",
                    text: "SHOW MORE",
                    onClick: (e) => {
                        const id = + e.target.closest("li").id
                        const modal = new Modal()
                        const root = document.getElementById("root")
                        root.append(modal.render("showMore", id)) // Показує додаткову інформацію про картку


                    }
                },
                demo: {
                    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    text: "demouser@gmail.com",
                    type: "button",
                    onClick: (e) => {
                        const parent = e.target.closest("form")
                        const inputs = parent.querySelectorAll("input")
                        inputs.forEach(element => {
                            element.value = this.demoUser[element.name] // Автозаповнює форму демо-користувача
                        });

                    }
                }
            };
    }

    render(id, cardId) {
        const buttonConfig = this.config[id];
        this.config[id].id = id
        if (!buttonConfig) {
            throw new Error(`Button config with id "${id}" not found.`); // Викидає помилку, якщо не знайдено конфігурацію
        }

        const { className, type, text, onClick } = buttonConfig;

        // Створюємо кнопку
        const button = document.createElement('button');
        button.className = className;
        button.type = type;
        button.textContent = text;
        button.id = id

        // Додаємо обробник подій, якщо він існує
        if (onClick) {
            button.addEventListener('click', (e) => {
                onClick(e, cardId) // Викликає обробник подій з передачею `cardId`
            });
        }

        return button;
    }
}

export default Button;

