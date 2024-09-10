class Main {
    constructor() {
        this.main = document.createElement("main")
        this.main.id = "main"
    }
    render() {
        this.main.insertAdjacentHTML("beforeend", "No items have been added")
        return this.main
    }
}
export default new Main()