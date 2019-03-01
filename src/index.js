const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
const toyURL = "http://localhost:3000/toys"
const toyContainer = document.querySelector("#toy-collection")
const newToyForm = document.querySelector(".add-toy-form")

function fetchAllToys(){
  return fetch(toyURL)
  .then(res => res.json())
  .then(toys => toys.forEach(showToys))
}

fetchAllToys()

function showToys(toy){
  // console.log(toy);
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar">
  <p>${toy.likes} Likes</p>
  <button data-toy-id= ${toy.id} data-like-count= ${toy.likes} class="like-btn">Like me more!</button>
  `
  toyContainer.append(toyCard)
}

newToyForm.addEventListener("submit", addNewToy)

function addNewToy(event){
  event.preventDefault()
  const newToyName = newToyForm.name.value
  const newToyImage = newToyForm.image.value
  return fetch(toyURL,{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      name: newToyName,
      image: newToyImage,
      likes: 0
    })
  }).then(res => console.log(res))
  .then(fetchAllToys)
}

toyContainer.addEventListener("click", increaseLikes)

function increaseLikes(event){
  event.preventDefault()
  if(event.target.className === "like-btn"){
    let currentLikesNumber = parseInt(event.target.dataset.likeCount)
    let newLikesNumber = currentLikesNumber + 1
    let likeCounter = event.target.parentElement.querySelector('p').innerHTML= `${newLikesNumber} Likes`
    let toyId = event.target.dataset.toyId
    // console.log(toyId);
    fetch(toyURL+`/${toyId}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify({
        likes: newLikesNumber
      })
    })
  }
}
