const login = {
  area: document.getElementById('login'),
  form: document.getElementById('login__form'),
  input: document.getElementById('login__input')
};

const chat = {
  area: document.getElementById('chat'),
  form: document.getElementById('chat__form'),
  input: document.getElementById('chat__input'),
  messages: document.getElementById('chat__messages')
}

const colorsToUsername = ["cadetblue", "darkgoldenrod", "cornflowerblue", "darkkhani", "hotpink", "gold"];
const user = { id: "", name: "", color: "" }

let websocket;

function createMessageSelfElement(content) {
  const div = document.createElement("div");
  div.classList.add("message--self");
  div.innerText = content;
  return div;
}

function createMessageOtherElement(username, usercolor, content) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add("message--other");
  span.classList.add("message--sender");
  span.style.color = usercolor;
  span.innerText = username;

  div.appendChild(span);
  div.appendChild(document.createTextNode(content));

  return div;
}

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorsToUsername.length);
  return colorsToUsername[randomIndex]
}

function scrollScreen() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

function proccessMessage({ data }) {
  const { userId, userName, userColor, content } = JSON.parse(data);
  const newMessage = userId === user.id ? createMessageSelfElement(content) : createMessageOtherElement(userName, userColor, content);
  chat.messages.appendChild(newMessage);
  scrollScreen();
}

function handleLogin(event) {
  event.preventDefault();
  user.id = crypto.randomUUID();
  user.name = login.input.value;
  user.color = getRandomColor();

  login.area.style.display = "none";
  chat.area.style.display = "flex";

  websocket = new WebSocket("ws://localhost:8080");

  websocket.onopen = () => websocket.send(`> User ${user.name} entered in the chat!`); // Websocket estar configurado
  websocket.onmessage = proccessMessage; // Receber do servidor
}

function sendMessage(event) {
  event.preventDefault();

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chat.input.value
  }

  websocket.send(JSON.stringify(message));

  chat.input.value = "";
}

login.form.addEventListener("submit", handleLogin);
chat.form.addEventListener("submit", sendMessage);