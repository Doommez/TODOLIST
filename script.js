const date=document.querySelector("[name='date']");
const name=document.querySelector("[name='name']");
const priority=document.querySelector("[name='priority']");
const description=document.querySelector("[name='description']");
const btnGetValue=document.querySelector("[name='getValue']")


let mainContent=document.getElementById("main__content");
let contentTask=document.querySelectorAll(".main__content__task");
console.log(contentTask);

btnGetValue.addEventListener("click",getValue)


let taskArr;
if(JSON.parse( localStorage.getItem("taskArr"))!==null){
    taskArr=JSON.parse( localStorage.getItem("taskArr"));
    render(JSON.parse( localStorage.getItem("taskArr")))
}
else taskArr=[]

function getValue(){
    let value={
        date:date.value,
        name:name.value,
        priority:priority.value,
        description:description.value};
    taskArr.push(value)
    let taskArrJson=JSON.stringify(taskArr)
   localStorage.setItem("taskArr",taskArrJson)
   render([value],taskArr.length-1)
}

//{date.value,name.value,priority.value,description.value}

function render(item,i){
    console.log(i);
   item.forEach((item,index,arr) => {
    mainContent.innerHTML+=` <div class="main__content__task" id="${i||index}">
    <div class="main__content__taskName">
      <div class="main__content__date">${item.date}</div>
      <div class="main__content__name">${item.name}</div>
      <div class="main__content__priority">${item.priority}</div>
      <div class="main__content__change">
        <img src="change.png" alt="change" />
      </div>
    </div>
    <div class="main__content__taskValue">
      <div class="main__content__description">
      ${item.description}
      </div>
      <input type="button" value="Delete" />
    </div>`
   });
}



