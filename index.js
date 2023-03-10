// 
const topContainer = document.querySelector("#top-container") 
const margaritaDetails = document.querySelector("#margarita-details")
const margForm = document.querySelector('form')
const submitComment = document.getElementById('comment-form')
const commentStory = document.querySelector('#comment-story')
const addButton = document.getElementById('add-new-marg')
const plusButton = document.getElementById('marg-button')
const ingredientsDiv = document.getElementById('ingredients-div')
const ingredientsArray = document.getElementsByClassName('ingredient-item')
let ingredientCount = 0
let addMarg = false

fetch("http://localhost:3000/drinks")
.then(r => r.json())
.then(drinksArray => {
        renderDetails(drinksArray[0])

        drinksArray.forEach(drink => 
            renderDrinks(drink))
})

fetch('http://localhost:3000/comments')
.then(r => r.json())
.then(commentsArray => {

        commentsArray.forEach(comment =>
            renderComments(comment))
        
})

renderDrinks = (drinkObj) => {
    const image = document.createElement("img")
    image.src = drinkObj.strDrinkThumb
    topContainer.append(image)

    image.addEventListener("click", () => {renderDetails(drinkObj)})
    image.addEventListener('mouseover', () => {
        image.className = 'onMouseover'}
    )
}

renderComments = (commentObj) => {
    const li = document.createElement('li')
    li.innerText = commentObj.comment
    commentStory.append(li)
}

renderDetails = (drinkObj) => {
    const h2 = document.querySelector(".name")
    const instructions = document.querySelector(".instructions")
    const glass = document.querySelector (".glass")
    const image = document.querySelector(".image")
    const ingredients = document.querySelector(".ingredients")

    h2.innerText = drinkObj.strDrink
    instructions.innerText = drinkObj.strInstructions
    glass.innerText = drinkObj.strGlass
    image.src = drinkObj.strDrinkThumb

    ingredients.innerHTML = ""
    drinkObj.strIngredients.forEach(ingredient => {
        const li = document.createElement("li")
        li.innerText = ingredient
        ingredients.append(li)
    })
}

margForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newDrinkObj = {
        strDrink: e.target.name.value,
        strGlass: e.target.glass.value,
        strInstructions: e.target.instructions.value,
        strDrinkThumb: e.target.image.value,
        strIngredients: Array.from(ingredientsArray).map(input => input.value)
    }

    fetch("http://localhost:3000/drinks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newDrinkObj),
    })

    renderDrinks(newDrinkObj)
    margForm.reset()
})

addButton.addEventListener('click', () => {
    addMarg = !addMarg
    if (addMarg) {
        margForm.style.display = "inline-block"}
    else {
        margForm.style.display = "none"}
})

submitComment.addEventListener('submit', (e) => {
    e.preventDefault()

    const newStoryObj = {
        comment: e.target.comments.value
    }
    
    fetch("http://localhost:3000/comments", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(newStoryObj),
    }) 
    const li = document.createElement('li')
    li.innerText = e.target.comments.value
    commentStory.append(li)
    submitComment.reset()
})

plusButton.addEventListener('click', () => {

    if (ingredientCount < 10) {
        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = "Ingredient"
        input.name = `ingredient-${ingredientCount}`
        input.className = 'ingredient-item'
        ingredientsDiv.append(input)
        ingredientCount++
    }
})