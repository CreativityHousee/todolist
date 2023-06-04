const $ = document;
const todoListInput = $.getElementById('todoListInput')
const addButton = $.getElementById('addButton')
const todoList = $.getElementById('list')
var cancelButtons = $.querySelectorAll('.cancel')
var doneButtons = $.querySelectorAll('.done')


if (localStorage.getItem('todoListItems') === null) {
    localStorage.setItem('todoListItems', JSON.stringify([]))
}


function showItems() {
    let items = localStorage.getItem('todoListItems')
    items = JSON.parse(items)
    todoList.innerHTML = ""
    items.forEach((value, id) => {
        const newItem = $.createElement('div')
        const itemContext = $.createElement('p')
        const doneIcon = $.createElement('span')
        const cancelIcon = $.createElement('span')
        itemContext.innerHTML = value;
        itemContext.classList.add('name')
        doneIcon.classList.add('done')
        cancelIcon.classList.add('cancel')
        newItem.classList.add('item')
        newItem.dataset.id = id;
        newItem.appendChild(itemContext)
        newItem.appendChild(doneIcon)
        newItem.appendChild(cancelIcon)
        todoList.appendChild(newItem)
    });
    window['cancelButtons'] = document.querySelectorAll('.cancel')
    window['doneButtons'] = document.querySelectorAll('.done')
    cancelItems()
    doneItems()
}

showItems()

// adding new items 


addButton.addEventListener('click', () => {
    let items = localStorage.getItem('todoListItems');
    items = JSON.parse(items);
    items.push(todoListInput.value);
    localStorage.setItem('todoListItems', JSON.stringify(items))
    showItems()
    todoListInput.value = "";

})

// cancel items


function cancelItems() {
    cancelButtons.forEach(element => {
        element.addEventListener('click', () => {
            let items = localStorage.getItem('todoListItems');
            items = JSON.parse(items);
            items.splice(element.parentElement.dataset.id, 1);
            localStorage.setItem('todoListItems' , JSON.stringify(items));
            showItems()
        })
    })
}
// done items


function doneItems(){
    doneButtons.forEach(element => {
        element.addEventListener('click', () => {
            let items = localStorage.getItem('todoListItems');
            items = JSON.parse(items);
            items[element.parentElement.dataset.id] += "(done)"
            localStorage.setItem('todoListItems' , JSON.stringify(items));
            showItems()
        })
    })
}