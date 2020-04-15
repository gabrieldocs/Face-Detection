var collection = { 
    "123" : { 
        "album" : "1999",
        "artist" : "Eng Haw",
        "tracks" : [
            "1999",
            "A red tale"
        ]
    },
    "456" : { 
        "album" : "Pop valley",
        "artist" : "Eng Haw",
        "tracks" : [
            "Pop valley",
            "A red velvet"
        ]
    }
}

var copy = JSON.parse(JSON.stringify(collection))

function update(id, prop, value) { 

    if(value === "") { 
        delete collection[id][prop]
    } else if(prop === "tracks") { 
        collection[id][prop] = collection[id][prop] || []
        collection[id][prop].push(value)
    } else { 
        collection[id][prop] = value
    }

    return collection 
}


console.log(update("123", "tracks", "Bohemian Santos"))