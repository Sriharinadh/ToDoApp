const inputv = document.querySelector(".inputtext");
const btnn = document.querySelector(".addbtn");
const list = document.querySelector(".listvalue");

let tasks = [];

window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    tasks.forEach(task => {
      createTask(task);
    });
  }
});

btnn.addEventListener("click", () => {

  const text = inputv.value;

  if (text === "") return;

  tasks.push(text);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(text);

  inputv.value = "";

});

inputv.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btnn.click();
  }
});

function createTask(text) {

  const li = document.createElement("li");

  const deletebtn = document.createElement("button");
  const donebtn = document.createElement("button");

  deletebtn.classList.add("delete-btn");
  donebtn.classList.add("done-btn");

  deletebtn.innerText = "Delete";
  donebtn.innerText = "Done";
  const btnGroup = document.createElement("div");

  btnGroup.append(donebtn);
  btnGroup.append(deletebtn);

  li.innerText = text;
  li.appendChild(btnGroup);
  list.appendChild(li);


  deletebtn.addEventListener("click", () => {
    li.remove();

    tasks = tasks.filter(t => t !== text);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });


  donebtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    if (donebtn.innerText === "Done")
      donebtn.innerText = "Undo";
    else
      donebtn.innerText = "Done";
  });

}