const express = require('express')
const app = express()

app.set('view-engine', 'ejs')
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: false}))


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/index.html')
})
app.listen(4000, ()=>{
    console.log('Something')
})