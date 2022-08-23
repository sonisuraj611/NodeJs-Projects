const socket = io('http://localhost:3000');

const form = document.getElementById('send-content');
const messageInput = document.getElementById('mymessage');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3')

const name = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
});
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
};
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'right');
})