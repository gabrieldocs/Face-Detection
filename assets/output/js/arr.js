// callback - promisse - async - await 

const fs = require('fs')

console.log(1)
/*
fs.readFile('./in1.txt', (err, contents) => {
    fs.readFile('./in2.txt', (err3, contents2) => {
        console.log(err, String(contents))
        console.log(err3, String(contents2))
    })
})

console.log(2)
console.log(3)

*/

const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
        if(err) {
            reject(err)
        } else { 
            resolve(contents)
        }
    })
})

readFile('./in1.txt')
    .then(contents => {
        console.log(String(contents))
        return readFile('./in2.txt')
    })
    .then(contents => {
        console.log(String(contents))
    })

console.log('Err')