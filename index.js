const topContainer= document.querySelector("#top-container") 
const margaritaDetails = document.querySelector("#margarita-details")



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
image.addEventListener("click", () => {renderDetails(drinkObj)}

)}

function renderDetails(drinkObj){
const h1= document.querySelector(".name")
const ingredients= document.querySelector(".ingredients")
const instructions=document.querySelector(".instructions")
const glass=document.querySelector (".glass")
const image= document.querySelector(".image")


h1.innerText= drinkObj.strDrink
ingredients.innerText= ""
instructions.innerText=drinkObj.strInstructions
glass.innerText=drinkObj.strGlass
image.src=drinkObj.strDrinkThumb

}