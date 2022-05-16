let  choiceSelect = "";

const buttonTodo =      document.querySelector("#addTodo");
const buttonClearTodo = document.querySelector("#clearBtn");
const todoInput =       document.querySelector("#todoAdd");
const form =            document.querySelector("form");

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Здесь через jQuery получаем название выбранного типа туду day/month/year
$(document).ready(function () {
    $(".choiceSelection").click(function (e){
        console.log($(this).attr('value'));
        choiceSelect = $(this).attr('value');
        $(".currentSelection").html("<h1>" + capitalizeFirstLetter(choiceSelect) + "</h1>").css("color", "black");
    });
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
});



// Создал прослушивальщик кнопки
buttonTodo.addEventListener('click', function () {
    // Смотрим есть ли что в локалстораге
    // console.log(localStorage.getItem("test"));
    // Если локалстораге возвращает нуль
    console.log("Dobavljaem po kategorii: " + choiceSelect);

    if(choiceSelect == ""){
        $(".currentSelection").html("<h1>The note type is not selected</h1>").css("color", "red");
    } else {
        if (localStorage.getItem(choiceSelect) == null) {
            let obj = [{1:todoInput.value}]
            localStorage.setItem(choiceSelect, JSON.stringify(obj));
            console.log(localStorage.getItem(choiceSelect));
            todoInput.value = "";
            printTodo();
            // Если локалстораге возвращает не нуль, то мы увеличиваем список туду
            // Зачем это сделано? Моя идея такая, что этим способом можно подключить несколько
            // польователей и каждый видит свои туду
        } else {
            // Здесь инициировано для того, чтобы было проще разрабатывать
            // в общем смотрю за данными
            let obj = localStorage.getItem(choiceSelect);
            obj = JSON.parse(obj);
            console.log("Uze est v massive i dobavil sledujusim");
            console.log(localStorage.getItem(choiceSelect));
            // ШПОРГАЛКА
            // console.log(typeof obj);
            // console.log(obj);
            // console.log("Key: " + Object.keys(obj)[0]); // получение ключа по индексу
            // console.log("Value: " + Object.values(obj)[0]); // получение значения по индексу
            // console.log("Length: " + Object.keys(obj).length); // получение длины объекты


            // Здесь я получаю последнее число объекта

            // Увеличиваю предыдущий индекс на 1
            let nextIndex = obj.length + 1;
            // Создаю временный объект и присваиваю туда значение
            let tempObj = {};
            tempObj[nextIndex] = todoInput.value;

            obj.push(tempObj);
            // console.log(obj);
            localStorage.setItem(choiceSelect, JSON.stringify(obj));
            // console.log(localStorage.getItem("test"));
            todoInput.value = "";
            printTodo();
        }
    }
});

// Чистит определенный туду
buttonClearTodo.addEventListener('click', function () {
    if(choiceSelect == ""){
        $(".currentSelection").html("<h1>The note type is not selected</h1>").css("color", "red");
    } else {
         localStorage.removeItem(choiceSelect);
            console.log(localStorage.getItem(choiceSelect));
            printTodo();
    }

});

// Принтид туду лист
function printTodo(){
    // Создаём массив с заранее определенными названиями типов туду
    let arrayOfCathegories = ["#todo_list_day", "#todo_list_month", "#todo_list_year"];
    let returnString = "";

    // Цикл для принта заданий, этот цикл нужен для получения туду
    for(let i = 0; i < arrayOfCathegories.length; i++){
        let typeOfStorage = arrayOfCathegories[i].replace("#todo_list_", '');
        if(localStorage.getItem(typeOfStorage) == null){
            returnString = "";
            $(arrayOfCathegories[i]).html(returnString);
        } else {
            returnString = "";
            let obj = localStorage.getItem(typeOfStorage);
            obj = JSON.parse(obj);
            // Ща буит ХЭТЭМЭЛе:
            returnString += "<table>";
            //Здесь принтуется в ХЭТЭМЭЛе
            for(let j = 0; j < obj.length; j++) {
                returnString += "<tr><td>" + Object.values(obj[j])[0] + "</td><td><input type='checkbox' id=" + j + " name='don_" +typeOfStorage+ "'</td></tr>";
            }
            returnString += "</table>"
            $(arrayOfCathegories[i]).html(returnString);
        }

    }
}

// Функция по удалению выделенных записей в конкретной колонке, конкретной кнопкой
$(document).ready(function () {
    // Через jQuery получаю доступ классу кнопок
    $(".button_sub").click(function (e) {
        // Получаем данные конкретно нажатой кнопки
        let pressedButton = $(this).attr('id');
        // Получаем тип колонки
        let type = pressedButton.replace("submit_btn_", '');
        console.log(type);
        // Получаю список чекбоксов
        let checkbox = document.getElementsByName("don_" + type);
        let elements = JSON.parse(localStorage.getItem(type));
        // Данный массив засовывается обратно в память браузера localStorage
        let uploadArray = [];

        // Здесь вычисляются выбранные чекбоксы и не добавляю в массив
        for (let i = 0, j = 1; i < checkbox.length; i++) {
            if (checkbox[i].checked && parseInt(checkbox[i].id) + 1 === parseInt(Object.keys(elements[i])[0])) {
                continue;
            } else {
                // Здесь добавляются в массив невыделенные чекбоксы
                let tempObj = {};
                tempObj[j] = Object.values(elements[i])[0];
                uploadArray.push(tempObj)
                j++;
            }

        }
        console.log(uploadArray);
        localStorage.setItem(type, JSON.stringify(uploadArray));
        printTodo();
    });
});

document.body.onload = printTodo;

let d = new Date();
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();
let time = d.getTime();
let day = d.getDay();
let date = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();

let fontSize = 50;
let lang = "EST";

let months = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"]
let days = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];

let dayContainer = document.getElementById('day');
let monthContainer = document.getElementById('month');
let dateContainer = document.getElementById('date');
let secondsContainer = document.getElementById('seconds');
let minutesContainer = document.getElementById('minutes');
let hoursContainer = document.getElementById('hours');

if(lang == "EST"){
    monthContainer.innerHTML = months[month];
    dayContainer.innerHTML = days[day];
}

if(lang == "ENG"){

}

document.getElementById('year').innerHTML = year;
dateContainer.innerHTML = date;
updateClock();

window.setInterval(updateClock, 1000);
document.getElementById('smaller').addEventListener("click", function(){
    fontSize --;
    document.getElementById('clock_container').style.fontSize = fontSize + "px";
});
document.getElementById('bigger').addEventListener("click", function(){
    fontSize ++;
    document.getElementById('clock_container').style.fontSize = fontSize + "px";
});
document.getElementById('change bgcolor').addEventListener("click", function(){
    document.getElementById('main').style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
});
document.getElementById('change text color').addEventListener("click", function(){
    document.getElementById('clock_container').style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
});

function updateClock(){
    d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(hours < 10){
        hours = "0" + hours;
    }

    secondsContainer.innerHTML = ":" + seconds;
    minutesContainer.innerHTML = ":" + minutes;
    hoursContainer.innerHTML = hours;
}