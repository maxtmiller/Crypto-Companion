const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");


inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatButton = document.getElementById('chat-toggle-btn');
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
        chatButton.style.display = 'none';
    } else {
        chatContainer.style.display = 'none';
        chatButton.style.display = 'block';
    }
}

function sendMessage() {
    var userMessage = document.getElementById('user-input').value;

    if (userMessage.trim() === '') return;

    var chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += '<div class="message user-message">' + userMessage + '</div>';

    document.getElementById('user-input').value = '';

    chatBox.scrollTop = chatBox.scrollHeight;

    console.log(userMessage);

    fetch('http://localhost:3000/cohere-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: userMessage })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const botMessage = data.responseMessage;
        chatBox.innerHTML += '<div class="message bot-message">' + botMessage + '</div>';
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);

        chatBox.innerHTML += '<div class="message bot-message error">An error occurred. Please try again later.</div>';
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}