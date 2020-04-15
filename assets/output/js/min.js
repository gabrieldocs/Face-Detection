//selectors

const todoInput  = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList   = document.querySelector('.todo-list')
//events 

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)


//functions 

function addTodo(event) {
    //Prevent form from submit 
    event.preventDefault()
    //todo Div 
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //create LI
    const newTodo = document.createElement('li') 
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    newTodo.classList.add('list-group-item')
    todoDiv.appendChild(newTodo)

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'
    completedButton.classList.add('completed-btn')
    completedButton.classList.add('btn')
    completedButton.classList.add('btn-primary')
    todoDiv.appendChild(completedButton)
    

    const trashButton = document.createElement('button')
    trashButton.classList.add('trash-btn')
    trashButton.classList.add('btn')
    trashButton.classList.add('btn-primary')
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
    todoDiv.appendChild(trashButton)
    //check mark button
    //Append to list 

    todoList.appendChild(todoDiv)

    //clear input 

    todoInput.value = ''
}


function deleteCheck(e) {
    console.log(e.target)
    const item = e.target 
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement 
        todo.remove()
    }
    if(item.classList[0] === 'completed-btn') {
        const todo = item.parentElement 
        todo.classList.toggle("completed")
    }

  
    
}
