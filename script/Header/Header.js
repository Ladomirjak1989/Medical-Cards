class Header {
    constructor() {
        this.header = document.createElement("header")
    }
    render() { //render(): Основний метод для рендерингу HTML-контенту для хедера.
        this.header.insertAdjacentHTML("beforeend", `  
            <div class="bg-gray-100">

        <div id= "header" class="bg-blue-600 p-4 flex justify-between items-center">
            <img class="size-24 w-44" src="./assets/logo.jpg" alt="">
            <h2 class="text-3xl text-white ">Medical Service</h2>
        </div>
    </div>
            `)  //this.header.insertAdjacentHTML("beforeend", ...): Додає HTML вміст всередину створеного елемента <header>.
        return this.header
    }
}
export default new Header()