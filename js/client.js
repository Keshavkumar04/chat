const socket = io('https://chat-backend-g1ev.onrender.com/');
// const socket = io('/');

const form = document.querySelector('#formsubmit');
const messageInput =  document.querySelector('#text');
const messagecontainer = document.querySelector('.container');

const audio = new Audio("facebookchat.mp3");


// const append = (message,position)=>{  // for appending messages in the chatbox
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');  // adding the class list to the message
//     messageElement.classList.add(position); // adding element based on position
//     messagecontainer.append(messageElement);  // adding the message into the container
//     if(position == 'left')  // then only play the audio
//     audio.play();  // for playing audio
// }

   // Function to add a new message to the container and scroll to the bottom
   function appendAndScroll(message, position) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messagecontainer.appendChild(messageElement);
    messagecontainer.scrollTop = messagecontainer.scrollHeight;
    if (position === 'left') {
        audio.play();
    }
}

// Modify the 'append' function to use 'appendAndScroll'
const append = (message, position) => {
    appendAndScroll(message, position);
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value; // taking the value form the input text
    append(`${message}`,'right') // to see your message && right as you send the message
    socket.emit('send',message);   // send is the name we gave to our parameter
    messageInput.value = "";


})


const nameofuser = prompt('Enter your name');

socket.emit('new-user-joined',nameofuser);

socket.on('user-joined' , nameofuser =>{
    append(`${nameofuser} joined the chat`, 'centre'); // passing the append function along with the position of the message
})

// this is for receving a message
socket.on('receive' , data =>{  // data as we are taking multiple values
    append(`${data.nameofuser} : ${data.message}`, 'left'); // passing the append function along with the position of the message
})

// this is when a users leaves
socket.on('left' , nameofuser =>{  // as we are using name
    append(`${nameofuser} left the chat`, 'centre'); // passing the append function along with the position of the message
})







// the effect on heading


const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

function runCode(targetElement) {
  let iteration = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    targetElement.innerText = targetElement.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return targetElement.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= targetElement.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 50);
}

function startCode() {
  const targetElement = document.querySelector("#anichat");
  runCode(targetElement);

  setInterval(() => {
    runCode(targetElement);
  }, 8000); // Run the code automatically every 8 seconds
}

document.addEventListener("DOMContentLoaded", startCode);
