const electron = require("electron");
const { ipcRenderer } = electron;

const ul = document.querySelector("ul");

//item add
ipcRenderer.on("item:add", (e, item) => {
  const li = document.createElement("li");
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  ul.appendChild(li);
});

//items clear
ipcRenderer.on("item:clear", e => {
  ul.innerHTML = "";
});

//remove item
ul.addEventListener("dblclick", removeItem);

function removeItem(e) {
  e.target.remove();
}
