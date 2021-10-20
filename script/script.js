const date = document.querySelector("[name='date']");
const name = document.querySelector("[name='name']");
const priority = document.querySelector("[name='priority']");
const description = document.querySelector("[name='description']");
const btnGetValue = document.querySelector("[name='getValue']")


let mainPag = document.getElementById("main__content__pogination");
let mainContent = document.getElementById("main__content");
let contentTask = document.querySelectorAll(".main__content__task");


btnGetValue.addEventListener("click", getValue)


let taskArr;
if (JSON.parse(localStorage.getItem("taskArr")) !== null) {
  taskArr = JSON.parse(localStorage.getItem("taskArr"));
  if (taskArr.length < 4) {
    render(JSON.parse(localStorage.getItem("taskArr")))
  }
  else {
    render(JSON.parse(localStorage.getItem("taskArr")).slice(0, 4))
  }

}
else taskArr = []

function getValue() {
  if (JSON.parse(localStorage.getItem("taskArr")) !== null) {
    taskArr = JSON.parse(localStorage.getItem("taskArr"));

  }
  let value = {
    date: date.value,
    name: name.value,
    priority: priority.value,
    description: description.value
  };
  taskArr.push(value);
  let taskArrJson = JSON.stringify(taskArr)
  localStorage.setItem("taskArr", taskArrJson);
  if (taskArr.length <= 4) {
    render([value], taskArr.length - 1);
  }
  createPagination(getPages())
  date.value = name.value = description.value = ''
}

//{date.value,name.value,priority.value,description.value}

function render(item, i) {

  item.forEach((item, index, arr) => {
    mainContent.innerHTML += ` <div class="main__content__task" id="${i || index}">
    <div class="main__content__taskName">
      <div class="main__content__date">${item.date}</div>
      <div class="main__content__name">${item.name}</div>
      <div class="main__content__priority ${(item.priority==="Первостепенно!"||item.priority==="high")&&'highPriority'}">${item.priority}</div>
      <div class="main__content__change" onclick="change(${i || index})">
        <img src="img/change.png" alt="change" />
      </div>
    </div>
    <div class="main__content__taskValue">
      <div class="main__content__description">
      ${item.description}
      </div>
      <input type="button" value="Delete" onclick="del(${i || index})"/>
    </div>`
  });
}



function del(i) {
  let newTaskArr = JSON.parse(localStorage.getItem("taskArr"));
  newTaskArr.splice(i, 1);
  localStorage.setItem("taskArr", JSON.stringify(newTaskArr))
  mainContent.innerHTML = "";
  if (taskArr.length < 4) {
    render(JSON.parse(localStorage.getItem("taskArr")))
  }
  else {
    render(JSON.parse(localStorage.getItem("taskArr")).slice(0, 4))
  }
}

let changeBolean = false;
function change(i) {
  let changeContentTask = document.getElementById(i);

  let changeContent = changeContentTask.querySelectorAll(".main__content__description")

  changeContent[0].style.cssText = 'border: solid red 1px; ';
  changeContent[0].setAttribute("contenteditable", "true");
  changeContent[0].focus()
  let chek = document.createElement("div")
  chek.className = "confirmText"
  chek.setAttribute("contenteditable", "false");
  chek.setAttribute("onclick", "confirmText(" + i + ")");
  changeContent[0].appendChild(chek)
  changeContent[0].addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
      confirmText(i)
      ev.preventDefault()
    }


  })
}

function confirmText(i) {

  let changeContentTask = document.getElementById(i);

  let changeContent = changeContentTask.querySelectorAll(".main__content__description")

  // localStorage.setItem("taskArr",JSON.stringify())
  let addNewValue = JSON.parse(localStorage.getItem("taskArr"));
  addNewValue[i].description = changeContent[0].textContent;
  console.log(addNewValue);
  localStorage.setItem("taskArr", JSON.stringify(addNewValue));
  changeContent[0].style.cssText = "";
  changeContent[0].setAttribute("contenteditable", "false");
  let chek = changeContent[0].querySelector('.confirmText');
  console.log(chek);
  changeContent[0].removeChild(chek)
}


let itemOnpage = 4;
function getPages() {

let pages = Math.floor(JSON.parse(localStorage.getItem("taskArr")).length / 4);
  return pages 
}
function createPagination(i) {
  mainPag.innerHTML = "";
  for (let j = 0; j <= i; j++) {
    mainPag.innerHTML += `

    <div class="main__content__page" id="pag${j + 1}" onclick=pag(${j + 1})>${j + 1}</div>
`;
  }

}

createPagination(getPages())

function pag(i) {
  mainContent.innerHTML = ""
  console.log(i);
  console.log(JSON.parse(localStorage.getItem("taskArr")).slice((4 * (i - 1)), (i * 4)));
  render(JSON.parse(localStorage.getItem("taskArr")).slice((4 * (i - 1)), (i * 4)))
}

let priorUp = false;
function sortPrior() {
  let taskArr = JSON.parse(localStorage.getItem("taskArr"));
  if (priorUp === false) {
    priorUp = true
   
    taskArr.sort(function (a, b) {
      if (a.priority > b.priority) {
        if(a.priority==="high"&&b.priority==="ordinary"){
          return 1
        }
        return -1
      }
      if (b.priority > a.priority) {
        if(a.priority==="high"&&b.priority==="ordinary"){
          return-1
        }
        return 1;
      }
      return 0
    });
  }
  else {
    priorUp = false;
    
  taskArr.sort(function (a, b) {
    if (a.priority > b.priority) {
      if(a.priority==="high"&&b.priority==="ordinary"){
        return-1
      }
      return 1
    }
    if (b.priority > a.priority) {
      if(a.priority==="high"&&b.priority==="ordinary"){
        return-1
      }
      return -1;
    }
    return 0
  });
  }
  
  mainContent.innerHTML = "";
  localStorage.setItem("taskArr", JSON.stringify(taskArr))

  if (taskArr.length < 4) {
    render(JSON.parse(localStorage.getItem("taskArr")))
  }
  else {
    render(JSON.parse(localStorage.getItem("taskArr")).slice(0, 4))
  }
}
let sortUp = false;
function sortDate(){
  let taskArr=JSON.parse(localStorage.getItem("taskArr"));

    if(sortUp===false){
      sortUp=true;
      taskArr.sort(function (a, b) {
        a=Number(a.date.split("-").join(""));
        b=Number(b.date.split("-").join(""))
        if ( a > b) {
         
          return 1;
        }
        if (b>a ) {
    
          return -1;
        }
        return 0
      });
    }
    else{
      sortUp=false;
      taskArr.sort(function (a, b) {
        a=Number(a.date.split("-").join(""));
        b=Number(b.date.split("-").join(""))
        if ( a > b) {
         
          return -1;
        }
        if (b>a ) {
    
          return 1;
        }
        return 0
      });
    }
   
    mainContent.innerHTML = "";
    localStorage.setItem("taskArr", JSON.stringify(taskArr))
  
    if (taskArr.length < 4) {
      render(JSON.parse(localStorage.getItem("taskArr")))
    }
    else {
      render(JSON.parse(localStorage.getItem("taskArr")).slice(0, 4))
    }
}

//изменение темы
let themeChange=false;
let linkStyle=document.querySelector("[rel='stylesheet']")
let theme=document.querySelector(".theme");
theme.addEventListener("click",function(ev){
  console.log(linkStyle);
  
if(themeChange===false){
  themeChange=true;
  linkStyle.setAttribute("href","css/styleDark.css")

}
else{
  themeChange=false; 
  document.body.classList.add("active");
  setTimeout(function(){
    document.body.classList.remove("active");
    linkStyle.setAttribute("href","css/style.css");
  },1000)
  
}
});



let englLet=["End date","title","Priority","Description","Filter:","By name","By description","By Date","By priority"];
let engLetValue=["ordinary","high","insert","sort by priority","sort by date"]
let ruLet=["Дата окончания","Название","Приоритет","Описание","Фильтр:", "По имени", "По описанию", "По дате", "По приоритету"];
let ruLetValue=["Обычный","Первостепенно!","Внести","Сортировать по приоритету","Сортировать по дате"]
let languageChange=false;

let language=document.querySelector(".language");
language.addEventListener("click",function(ev){
  console.log(ev);
  let changeBoxes=document.querySelectorAll(".lang")
  let cgangelangV=document.querySelectorAll(".langV");
  console.log(cgangelangV);
  console.log(changeBoxes);
if(languageChange===false){
 
  languageChange=true;
  changeBoxes.forEach((item,index,arr)=>{
    item.innerText=englLet[index]
  })
  cgangelangV.forEach((item,index)=>{
    item.value=engLetValue[index];
    if(index===0){
      item.innerText=engLetValue[0];
   
    }
    if(index===1){
       item.innerText=engLetValue[1]
    }
  
  })
  

}
else{
  
 
    languageChange=false;
    changeBoxes.forEach((item,index)=>{
      item.innerText=ruLet[index]
    })
    cgangelangV.forEach((item,index)=>{
      item.value=ruLetValue[index];
      if(index===0){
        item.innerText=ruLetValue[0];
     
      }
      if(index===1){
         item.innerText=ruLetValue[1]
      }
      
    })
  
  
  
}
});

document.addEventListener("touchstart",tach);
  function tach(){
let list=document.querySelectorAll(".main__content__taskValue")
list.forEach((item,index)=>{
  item.classList.add(".tach")
})
}