import{ initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import{getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const appSettings = {

databaseURL:"https://numberlist-ac72d-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppinglistInDB = ref(database, "shoppingList")

console.log(appSettings.databaseURL)

 const inputFieldEl = document.getElementById("input-field")
 const addButtonEl = document.getElementById("add-btn")
 const shopingList = document.getElementById("shopping-list")
 


 addButtonEl.addEventListener("click", function() {

     let inputValue = inputFieldEl.value
   push(shoppinglistInDB, inputValue)
clearInputFieldEl()


 })

 onValue( shoppinglistInDB, function(snapshot){
  clearshoppingListEl()
  let shopingListArray = Object.entries(snapshot.val())
    console.log(snapshot.val())
  for(let i = 0; i<shopingListArray.length; i++){
    
    let currentItem = shopingListArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    
    appendtoShopingList(currentItem)
  
    
  }
 })

function clearInputFieldEl() {
  inputFieldEl.value= ''
}

function clearshoppingListEl(){
  shopingList.innerHTML = ""
}
function appendtoShopingList(item) {
  
  let itemID = item[0]
  let itemvalue = item[1]
  
  let newEL = document.createElement("li")
  newEL.textContent = itemvalue
  shopingList.append(newEL)

  newEL.addEventListener("dblclick", function(){
   let removeiteminDB = ref( database, `shoppingList/${itemID}`)
  
    remove(removeiteminDB)
  
  })
}

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkmode-toggle');

  // Load user preference from local storage
  if (localStorage.getItem('dark-mode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true; // Keep the toggle checked
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('change', function () {
      document.body.classList.toggle('dark-mode');

      // Save user preference in local storage
      if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('dark-mode', 'enabled');
      } else {
          localStorage.setItem('dark-mode', 'disabled');
      }
  });
});
