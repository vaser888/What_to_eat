var fastFoodList = ["Amirs", "LaFleurs", "Dagwoods", "Kojax", "Toasties", "Boustan", "Thai Express"];

var restaurantList = ["Chez Lien", "Sahib", "Moe's Bar & Grill", "Jack Astor's Bar & Grill", "McKibbins","La Pearl", "Peking garden", "Scarolie's", "Au Vieux Duluth", "Marathon Souvlaki", "Pizza Spano", "Cote St-Luc","Baton Rouge", "Scores", "Caribbean Curry House", "Café Milano"]

window.onload = function() {
    loadLocalStorage()
    loadList();
}

function loadLocalStorage(){
    if (localStorage.getItem("fastFoodList") == null){
        localStorage.setItem("fastFoodList", fastFoodList);
    }
    if (localStorage.getItem("restaurantList") == null){
        localStorage.setItem("restaurantList", restaurantList);
    }
    else{
        refreshListVariables();
    }
}

function refreshListVariables(){
    fastFoodList = localStorage.getItem("fastFoodList");
    restaurantList = localStorage.getItem("restaurantList");
    fastFoodList = fastFoodList.split(",");
    restaurantList = restaurantList.split(",");
}

function loadList(){
    fastFoodList.sort();
    restaurantList.sort();

    var t = [fastFoodList, restaurantList];
    var v = ["F", "R"];

    for (i=0; i <= t.length - 1; i++){
        for (p = 0; p <= t[i].length - 1; p++){
            if (t[i] == ""){ }else{
            createListItem(t[i][p], v[i]);
            }
        }
    }
}

function createListItem(name, Id){
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", name);
    input.setAttribute("id", name);
    input.setAttribute("class", "L");
    label.setAttribute("for", name);
    label.innerText = name;
    div.setAttribute("id", name + "Box");
    div.appendChild(input);
    div.appendChild(label);
    document.getElementById(Id).appendChild(div);
}

function addToList(){
    var a = document.getElementById("nameInput").value;
    var b = document.getElementById("pickListToAdd").value;
    var g = checkForDuplicate(a);
    if (g == true){
        createListItem(a,b);
        saveListsToLocalStorage();
    }
}

function checkForDuplicate(name){
    refreshListVariables();
    var li = [];
    li = fastFoodList.concat(restaurantList);
    if(li.indexOf(name) !== -1){
        //do nothing
    }
    else{   
        return true;
    }
}

function getLunch(){
    var li = document.querySelectorAll(".L:checked");
    var ln = Math.floor(Math.random()*li.length);
    if (li[ln] === undefined){
        document.getElementById("result").innerText = "Please choose from the list"
    }
    document.getElementById("result").innerText = li[ln].value;
    console.log(ln);
}

var toggleEdit = false

function editLists() {
    var li = document.querySelectorAll(".L");
    if (toggleEdit == false){
        for (i = 0; i <= li.length - 1; i++){
            var btn = document.createElement("button");
            btn.setAttribute("onclick", "deleteT(this.parentElement)");
            btn.setAttribute("id", "editBtn")
            btn.innerText = "X";
            document.getElementById(li[i].value + "Box").appendChild(btn);
            toggleEdit = true;
        }
    }
    else{
        for (i = 0; i <= li.length - 1; i++){
            document.getElementById("editBtn").remove();
            toggleEdit = false;
        }
    }
}

function deleteT(a){
    a.remove();
    saveListsToLocalStorage();
}

function resetLocalStorage(){
    var i = confirm("Do you really want to reset the lists back to default?\n\nThis will remove anything you added or changed.")
    if (i === true){
        localStorage.clear();
        location.reload(); 
    }
}

function saveListsToLocalStorage(){
    var f = document.getElementById("F").children;
    var r = document.getElementById("R").children;
    var a = [];
    for (i = 0 ; i <= f.length - 1; i++){
    a.push(f[i].firstChild.defaultValue);
    }
    var b = [];
    for (i = 0 ; i <= r.length - 1; i++){
    b.push(r[i].firstChild.defaultValue);
    }
    localStorage.setItem("fastFoodList", a);
    localStorage.setItem("restaurantList", b);
}