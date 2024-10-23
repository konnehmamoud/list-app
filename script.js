import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push,} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";


const appSetting = {
 databaseURL:"https://playground-ae286-default-rtdb.firebaseio.com/",
 
 
}

const app = initializeApp(appSetting);
const database = getDatabase(app)
const items = ref(database, "item")

console.log(app)

const addBtn = document.getElementById("add-btn");
const inputFieldEl = document.getElementById("input-field")


