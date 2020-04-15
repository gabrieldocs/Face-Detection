var contacts = [
    {
        "name" : "santos",
        "likes" : 50
    },
    {
        "name" : "Lucas",
        "likes" : 50
    },
    {
        "name" : "Gabriel",
        "likes" : 50
    }
]

function look(name, prop) {
    for(var i = 0; i < contacts.length ; i++){
        if(contacts[i][prop] === name) {
           return "Found" || "Not such property"
        } 
    }
    return "Not found"
}

console.log(look("santos", "name"))