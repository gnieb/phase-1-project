// 
const topContainer= document.querySelector("#top-container") 
const margaritaDetails = document.querySelector("#margarita-details")
const margForm = document.querySelector('form')


fetch("http://localhost:3000/drinks")
    .then(r => r.json())
    .then(drinksArray => {
        renderDetails(drinksArray[0])

        drinksArray.forEach(drink => 
        renderDrinks(drink) 
)})

function renderDrinks(drinkObj){
    const image = document.createElement("img")
    image.src = drinkObj.strDrinkThumb
    topContainer.append(image)

    image.addEventListener("click", () => {renderDetails(drinkObj)})
    image.addEventListener('mouseover', () => {
        image.className = 'onMouseover'}
    )
}

function renderDetails(drinkObj){
    const h2= document.querySelector(".name")
    const instructions=document.querySelector(".instructions")
    const glass=document.querySelector (".glass")
    const image= document.querySelector(".image")
    const ingredients= document.querySelector(".ingredients")

    h2.innerText= drinkObj.strDrink
    instructions.innerText=drinkObj.strInstructions
    glass.innerText=drinkObj.strGlass
    image.src=drinkObj.strDrinkThumb

    ingredients.innerHTML=""
    drinkObj.strIngredients.forEach(ingredient => {
        const li = document.createElement("li")
        li.innerText= ingredient
        ingredients.append(li)
    })
}

margForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newDrinkObj = {
        strDrink: e.target.name.value,
        strGlass: e.target.glass.value,
        strInstructions: e.target.instructions.value,
        strIngredients: (e.target.ingredients.value).split(","),
        strDrinkThumb: e.target.image.value
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

let addMarg = false
const addButton = document.getElementById('add-new-marg')
addButton.addEventListener('click', () => {
    addMarg = !addMarg
    if (addMarg) {
        margForm.style.display = "block"}
    else {
        margForm.style.display = "none"}
})

addButton.addEventListener('mouseover', () => {
    addButton.className = 'onMouseover'}
)

const submitComment = document.getElementById('comment-form')
const commentStory = document.querySelector('#comment-story')
const submitMargButton = document.querySelector('#submit-marg')
const submitCommentButton = document.querySelector('#submit-comment')

submitMargButton.addEventListener('mouseover', () => {
    submitMargButton.className = 'onMouseover'}
)

submitCommentButton.addEventListener('mouseover', () => {
    submitCommentButton.className = 'onMouseover'}
)

submitComment.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const li = document.createElement('li')
    li.innerText = e.target.comments.value
    commentStory.append(li)
    submitComment.reset()

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
    



})

