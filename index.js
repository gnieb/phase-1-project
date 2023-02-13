const topContainer= document.querySelector("#top-container") 
const margaritaDetails = document.querySelector("#margarita-details")
const margForm = document.querySelector('form')


fetch("http://localhost:3000/drinks")
.then(r => r.json())
.then(drinksArray => {
    drinksArray.forEach(drink => 
    renderDrinks(drink) 
    )}
)

function renderDrinks(drinkObj){

const image = document.createElement("img")
image.src = drinkObj.strDrinkThumb
topContainer.append(image)
image.addEventListener("click", () => {renderDetails(drinkObj)})
image.addEventListener('mouseover', () => {
image.className = 'onMouseover'
})
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

ingredients.innerText = `${drinkObj.strIngredients}`
}

margForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const newDrinkObj = {
        strDrink: e.target.name.value,
        strGlass: e.target.glass.value,
        strInstructions: e.target.instructions.value,
        strIngredients: e.target.ingredients.value,
        strDrinkThumb: e.target.image.value
    }

    renderDrinks(newDrinkObj)
    margForm.reset()

})

let addMarg = false
const addButton = document.getElementById('add-new-marg')
addButton.addEventListener('click', () => {
 addMarg = !addMarg
 if (addMarg) {
    margForm.style.display = "block"
 }
 else {
    margForm.style.display = "none"
 }
} )



