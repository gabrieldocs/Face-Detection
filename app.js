const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const flash = require('express-flash')
const users = []

const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(passport, 
    email => users.find(user => user.email === email)
)

app.set('view-engine', 'ejs')
app.use(flash())
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) =>{
    res.render('index.ejs', { name : 'Gabriel'})
})

app.get('/register', (req, res) =>{
    res.render('register.ejs')
})

app.post('/register', async (req, res) =>{   
   try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
   }catch(err) {
    res.redirect('/register')
   }
   console.log(users)
})

app.get('/login', (req, res) =>{
    res.render('login.ejs')
})

app.get('/app', (req, res) =>{
    res.sendFile(__dirname + '/views/index.html')
})
app.listen(4000, ()=>{
    console.log('Something')
})