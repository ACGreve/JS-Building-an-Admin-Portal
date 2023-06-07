async function main() {

    let response = await fetch('http://localhost:3001/listBooks')

    let books = await response.json()

    books.forEach(renderBook)
}

function renderBook(book) {
    let root = document.querySelector('#root') //part of the bootstrap item for the cards, selects everyhting

    let li = document.createElement('li')
    li.textContent = book.title //creates a new list item and assigns the title content of the functions object array "book"

    let newQuantity = document.createElement('input') //creates a form item and assigns the current quantity content of the functions object array "book" as the placeholder
    newQuantity.value = book.quantity // this sets newQuantity to whatever is the "value" in the input box as default. newQuantity will change dependent on user input

    let save = document.createElement('button')
    save.textContent = 'Save' //creates a button and labels it save

    save.addEventListener('click', () => { //upon clicking save it will patch the book items with the new quantity
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: newQuantity.value
            })
        })
    })

    li.append (newQuantity, save)

    root.append(li)
}

main();