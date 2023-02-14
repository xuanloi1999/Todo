let todos;

if (!localStorage.getItem("todo")) {
  getTodos();
} else {
  todos = [
    {
      title: "Get groceries",
      dueDate: "2021-10-04",
      id: "id1",
    },
    {
      title: "Wash car",
      dueDate: "2021-10-04",
      id: "id2",
    },
    {
      title: "Make dinner",
      dueDate: "2021-10-04",
      id: "id3",
    },
  ];
}
//Create a todo

function createTodo(title, dueDate) {
  let id;
  if (!dueDate) {
    id = "" + Date.parse(dueDate);
  } else {
    id = new Date().getTime() + "";
  }

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  });
  saveTodos();
}

//Remove todo

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
}

//Save todo
function saveTodos() {
  if (!localStorage.getItem("todos")) {
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Get todo
function getTodos() {
  let todoStorage = localStorage.getItem("todos");
  todos = JSON.parse(todoStorage);
  console.log(todos);
}
render(todos);

function addToDo() {
  const todoTitle = document.querySelector("#todo-title").value;
  const dueDate = document.querySelector("#date-picker").value;
  if (todoTitle && dueDate) {
    createTodo(todoTitle, dueDate);
  }
  render(todos);
}

function deleteTodo(event) {
  removeTodo(event.target.id);
  render(todos);
}

function render(todos) {
  const todoList = document.querySelector("#todo");
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const element = document.createElement("div");
    element.className = "todo-title";
    element.innerText = todo.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn-delete-todo";
    deleteBtn.id = todo.id;
    deleteBtn.style = "margin-left: 10px; margin-bottom:5px";
    deleteBtn.onclick = deleteTodo;
    element.appendChild(deleteBtn);

    todoList.appendChild(element);
  });
}
