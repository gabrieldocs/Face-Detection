const express = require('express')
const fs = require('fs')
const app = express()

app.set('view-engine', 'ejs')
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: false}))


const user = []

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + '/views/register.html')
})

app.post('/register', (req, res)=>{
    res.send('Cadastro recebido com sucesso')
    user.push({nome: req.body.nome, rg : req.body.rg})
    
    //fs.mkdirSync(req.body.rg)
    
})

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/index.html')
})
app.listen(8080, ()=>{
    console.log('Sample')
    //setInterval(()=>{
    //    console.log(__dirname + ' File '+ __filename)
    //}, 1000)
})