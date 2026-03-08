const fs = require("fs")
const express = require("express")

const app = express()

const path = require("path")

app.use(express.static(path.join(__dirname, "../frontend")))

app.use(express.json())

let registros = JSON.parse(fs.readFileSync("humores.json"))

app.get("/", (req, res) => {
    res.send("Servidor funcionando!")
})

app.get("/humor", (req, res) => {
    res.json(registros)
})

app.post("/humor", (req, res) => {
    const novoRegistro = { 
        id: Date.now(),
        ...req.body,
        data: new Date()
    }
    registros.push(novoRegistro)
    fs.writeFileSync("humores.json", JSON.stringify(registros, null, 2))
    res.json({status: "salvo"})
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})

app.delete("/humor/:id", (req, res) => {

const id = Number(req.params.id)

registros = registros.filter(r => r.id !== id)
fs.writeFileSync("humores.json", JSON.stringify(registros, null, 2))
res.json({status:"apagado"})

})