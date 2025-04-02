import dotenv from "dotenv"
import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

const PORT = process.env.SERVER_PORT || 5000

app.use(cookieParser())
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true },
    })
)

app.get("/track", (req, res) => {
    if (!req.session.visits) {
        req.session.visits = 0
    }
    req.session.visits++

    res.cookie("visitCount", req.session.visits, {
        maxAge: 1000 * 60 * 15,
    })

    res.set("X-Visit-Count", req.session.visits)

    res.json({
        message: "Visit count updated.",
        visitCount: req.session.visits,
    })
})

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}.`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
