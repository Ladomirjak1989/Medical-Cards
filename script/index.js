//Цей код відповідає за ініціалізацію інтерфейсу користувача на сторінці веб-застосунку, який включає шапку, пошукову панель, авторизацію користувача та відображення карток. 
import header from "./Header/Header.js";
import Button from "./Button/Button.js";
import Input from "./Input/Input.js";
import api from "./API/API.js"     //API модуль, який відповідає за роботу з даними карток і авторизацію
import cardList from "./CardList/CardList.js";
import main from "./Main/Main.js"
import searchBar from "./SearchBar/SearchBar.js";
import footer from "../script/Footer/Footer.js"


const root = document.querySelector("#root");   //Цей рядок знаходить елемент з ID "root", який є основним контейнером сторінки, і прив'язує його до змінної root

(async function () {
    root.append(header.render());   //Викликає метод render з модуля header, який рендерить шапку сайту і додає її в DOM-дерево

    root.append(searchBar.render("search"));   //Рендерить пошукову панель з модуля searchBar і додає її до кореневого елемента сторінки

    const token = localStorage.getItem("token");  //Перевіряє наявність токена авторизації в локальному сховищі.
    const headerElement = document.querySelector("#header");

    if (!token) {
        const loginButton = new Button().render("login");  //Створює кнопку для входу в систему і додає її до шапки сторінки.
        headerElement.append(loginButton);
        root.append(footer.render());   //Рендерить footer панель 
        return  // Завершує виконання функції, оскільки користувач не авторизований
    }


    const createBtn = new Button().render("createCard")  //Створює кнопку "Create Card" для додавання нових карток і додає її до шапки сторінки.
    headerElement.append(createBtn)

    const cards = await api.getCards()   //Викликає метод API для отримання всіх карток користувача.
    const mainBlock = main.render()   //Рендерить головний блок сторінки, де будуть відображатися картки.
    if (!cards.length) {   //Якщо карток немає, то додає порожній блок у DOM і виходить
        root.append(mainBlock)
        root.append(footer.render());   //Рендерить footer панель 
        return
    }
    if (cards.length) {   //Якщо картки є, викликає метод renderCards для відображення кожної картки. Метод очищає вміст mainBlock, додає згенеровані картки і відображає їх на сторінці.
        const cardEl = await cardList.renderCards(cards)

      
        mainBlock.innerHTML = ""   //Очищає вміст основного блоку перед рендерингом карток.
        mainBlock.append(cardEl)  //Додає відрендерені картки до головного блоку сторінки
        root.append(mainBlock)   //Додає головний блок до кореневого елемента сторінки
        root.append(footer.render());   //Рендерить footer панель 
    }
}());





























