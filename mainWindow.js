const electron = require("electron");
const { ipcRenderer } = electron;

const ul = document.querySelector("ul");

//item add
ipcRenderer.on("item:add", (e, item) => {
  ul.className = "collection";
  const li = document.createElement("li");
  li.className = "collection-item";
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  ul.appendChild(li);
});

//items clear
ipcRenderer.on("item:clear", e => {
  ul.innerHTML = "";
  ul.className = "";
});

//remove item
ul.addEventListener("dblclick", removeItem);

function removeItem(e) {
  e.target.remove();
  if (ul.children.length == 0) {
    ul.className = "";
  }
}
