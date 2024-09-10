import Visit from "../Visit/Visit.js"


class VisitTherapist extends Visit{
    constructor(config){
        super(config)
    }
    renderShowMore(card) {
        const div = document.createElement("div")
        // div.className = "p-4 bg-gray-100 rounded-lg shadow space-y-2"
        div.insertAdjacentHTML("beforeend", `
        <p><span class="font-semibold text-gray-600">Age:</span> <span>${card.age}</span></p>
        <p><span class="font-semibold text-gray-600">Diagnosis:</span> <span>${card.diagnosis}</span></p>
    `)
    return div
    }

}
export default VisitTherapist