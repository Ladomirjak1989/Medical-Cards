import Button from "../Button/Button.js"


class CardList {
    constructor() {
        this.cards = {} // Об'єкт для зберігання карток за їхнім id
        this.container = document.createElement("div"); // Create a container for the title and the list

        this.ul = document.createElement("ul") // Створюємо HTML-елемент <ul>, який буде контейнером для карток
        this.ul.id = "list" // Встановлюємо id для <ul>
        this.ul.className = "bg-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4" // Додаємо клас Tailwind CSS для вертикального простору між картками

        this.title = document.createElement("h2"); // Create an <h2> for the title
        this.title.className = "text-2xl font-bold text-gray-900 mb-4";
        this.title.textContent = "Find cards below"; // Set the title text
        this.filtered = []


    }
    renderCards(cards) {
       
        this.ul.innerHTML = "" // Очищуємо вміст ul перед рендерингом нових карток, щоб уникнути дублювання карток.

        // Append the title to the container
        this.container.appendChild(this.title);

        cards.forEach(element => {
            this.ul.append(this.renderCard(element)) // Для кожної картки викликається метод renderCard, і результат додається в ul

        });

        // Append the <ul> element (list of cards) to the container
        this.container.appendChild(this.ul);
        return this.container // Повертаємо <ul> елемент з відрендереними картками

    }
    renderCard(card) {
        // if(!Object.values(this.cards)){
            this.cards[card.id] = card // Зберігаємо картку в об'єкт this.cards за її id
        // }
        

        const showMoreBtn = new Button().render("showMore")
        const deleteBtn = new Button().render("delete")
        const updatedBtn = new Button().render("updated")


        const li = document.createElement("li") // Створюємо <li> для однієї картки
        li.className = "border shadow-md p-4 rounded-lg bg-gray-100"
        li.id = card.id // Встановлюємо id для <li>, щоб з ним можна було працювати пізніше (наприклад, видалити або оновити картку)

        const title = document.createElement("h2") // Створюємо заголовок картки
        title.className = "font-semibold text-gray-900"
        title.textContent = card.name // Встановлюємо текст заголовка (ім'я картки)

        const text = document.createElement("p")
        text.className = "text-gray-900";
        text.textContent = card.doctors // Встановлюємо текст, який буде відображати лікаря або іншу інформацію про картку

        // Create a container for the buttons with space between them
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex justify-between mt-4";

        // Append buttons to the container
        buttonContainer.append(showMoreBtn, updatedBtn, deleteBtn);

        li.append(title, text, buttonContainer) // Додаємо заголовок, текст і кнопки до <li>
        return li // Повертаємо <li> з усіма елементами



    }
    removeCard(cardId) {
        delete this.cards[cardId]
    }

}
export default new CardList()