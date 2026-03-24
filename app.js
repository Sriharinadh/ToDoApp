const inputv = document.querySelector(".inputtext");
const btnn = document.querySelector(".addbtn");
const list = document.querySelector(".listvalue");

let tasks = [];


// LOAD tasks when page starts
window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    tasks.forEach(task => {
      createTask(task);
    });
  }
});


// ADD task
btnn.addEventListener("click", () => {

  const text = inputv.value;

  if (text === "") return;

  tasks.push(text);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(text);

  inputv.value = "";

});


// ENTER key support
inputv.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btnn.click();
  }
});


// FUNCTION to create task element
function createTask(text) {

  const li = document.createElement("li");

  const deletebtn = document.createElement("button");
  const donebtn = document.createElement("button");

  deletebtn.innerText = "Delete";
  donebtn.innerText = "Done";

  li.innerText = text;

  li.appendChild(donebtn);
  li.appendChild(deletebtn);

  list.appendChild(li);


  deletebtn.addEventListener("click", () => {
    li.remove();

    tasks = tasks.filter(t => t !== text);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });


  donebtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    donebtn.innerText = "UNDO";
  });

}