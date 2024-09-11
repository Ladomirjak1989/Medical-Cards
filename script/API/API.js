class API {
    constructor() {
        this.baseURL = "https://ajax.test-danit.com/api/v2"
        this.token = sessionStorage.getItem("token") || null
    }
    async login(body) {
        try {
            const response = await fetch(`${this.baseURL}/cards/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await response.text()
            if (!response.ok) {
               
                throw new Error(data)
            }
         
            this.token = data
            sessionStorage.setItem("token", this.token)
            return this.token
        }
        catch (error) {
            return error
        }
    }


    async getCards() {
        try {
            const response = await fetch(`${this.baseURL}/cards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            })
            const data = await response.json()
            return data
        }
        catch (error) {
            return error
        }
    }


    async getCardById(id) {
        try {
            const response = await fetch(`${this.baseURL}/cards/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },

            })
            const data = await response.json()
            return data
        }
        catch (error) {
            return error
        }
    }


    async deleteCard(id) {
        try {
            const response = await fetch(`${this.baseURL}/cards/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },

            })
            return "Successful delete"
        }
        catch (error) {
            return error
        }
    }



    async createCard(body) {
        try {
            const response = await fetch(`${this.baseURL}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            return data
        }
        catch (error) {
            return error
        }
    }



    async updateCard(body,id) {
        try {
            const response = await fetch(`${this.baseURL}/cards/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            return data
        }
        catch (error) {
            return error
        }
    }


}
export default new API()