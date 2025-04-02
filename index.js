import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()

const PORT = process.env.SERVER_PORT

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}.`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
