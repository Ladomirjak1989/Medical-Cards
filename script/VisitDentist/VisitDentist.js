import Visit from "../Visit/Visit.js"


class VisitDentist extends Visit{
    constructor(config){
        super(config)
    }
    renderShowMore(card) {
        const div = document.createElement("div")
        div.insertAdjacentHTML("beforeend", `
        <p><span class="font-semibold text-gray-600">Last visit:</span> <span>${card.lastVisit}</span></p>
        <p><span class="font-semibold text-gray-600">Age:</span> <span>${card.age}</span></p>
    `)
    return div
    }
}
export default VisitDentist