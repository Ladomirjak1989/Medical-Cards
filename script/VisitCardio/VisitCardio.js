import Visit from "../Visit/Visit.js"


class VisitCardio extends Visit {    //Це клас-нащадок, який успадковує властивості та методи класу Visit
    constructor(config) {  //Це конструктор класу VisitCardio, який приймає об'єкт config. Він використовується для налаштування параметрів візиту
        super(config)  //Викликає конструктор батьківського класу Visit. Це дозволяє класу VisitCardio успадковувати всю логіку, яка визначена в конструкторі класу Visit
    }
    renderShowMore(card) {    //Це метод для відображення додаткової інформації про візит до кардіолога (кардіологічний візит)
        const div = document.createElement("div")   //Створює HTML елемент div, який слугуватиме контейнером для виводу додаткової інформації про візит
        // div.className = "p-4 bg-gray-100 rounded-lg shadow space-y-2"
        div.insertAdjacentHTML("beforeend", `
        <p><span class="font-semibold text-gray-600">BMI:</span> <span>${card.weigth}</span></p>
        <p><span class="font-semibold text-gray-600">NBP:</span> <span>${card.nbp}</span></p>
        <p><span class="font-semibold text-gray-600">Age:</span> <span>${card.age}</span></p>
        <p><span class="font-semibold text-gray-600">Diagnosis:</span> <span>${card.diagnosis}</span></p>
    `)   //Додає HTML-код всередину контейнера div. У цьому випадку відображаються специфічні для кардіологічного візиту поля, такі як BMI (індекс маси тіла), NBP (нормальний артеріальний тиск), вік та діагноз
        //${card.weigth}, ${card.nbp}, ${card.age}, ${card.diagnosis}: Динамічні дані, які вставляються у відповідні теги HTML. Ці дані беруться з об'єкта card, який містить інформацію про візит.

        return div   //Повертає елемент div, який містить всю інформацію про кардіологічний візит. Цей елемент потім можна вставити у DOM для відображення
    }
}
export default VisitCardio
