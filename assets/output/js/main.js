var myStorage = 
[
    { 
        "car" : { 
            "color" : "black",
            "inside" : {
                "glove box" : "Google maps",
                "passenger" : "crumbs"
            },
            "outside" : { 
                "trunk" : "jacket"   
            }
        }
    },
    { 
        "car" : { 
            "color" : "red",
            "inside" : {
                "glove box" : "Google maps",
                "passenger" : "crumbs"
            },
            "outside" : { 
                "trunk" : "jacket"   
            }
        }
    }
]

var glove = myStorage[1].car.color
console.log(glove)