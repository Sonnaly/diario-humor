const fs = require("fs")
const express = require("express")

const app = express()

const path = require("path")

app.use(express.static(path.join(__dirname, "../frontend")))

app.use(express.json())

const filePath = path.join(__dirname, "humores.json")

let registros = JSON.parse(fs.readFileSync("filePath"))

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
        fs.writeFileSync(filePath, JSON.stringify(registros, null, 2)),    
        res.json({status: "salvo"})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

app.delete("/humor/:id", (req, res) => {

const id = Number(req.params.id)

registros = registros.filter(r => r.id !== id)
fs.writeFileSync(filePath, JSON.stringify(registros, null, 2)),
res.json({status:"apagado"})

})