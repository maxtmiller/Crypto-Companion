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
        chatContainer.style.display = 'flex'; // Show the chat container
        chatButton.style.display = 'none';
    } else {
        chatContainer.style.display = 'none'; // Hide the chat container
        chatButton.style.display = 'block';
    }
}

function sendMessage() {
    // Get the user input
    var userMessage = document.getElementById('user-input').value;

    // If input is empty, do nothing
    if (userMessage.trim() === '') return;

    // Append the user's message to the chatbox
    var chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += '<div class="message user-message">' + userMessage + '</div>';

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Scroll the chatbox to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    console.log(userMessage);

    // Send the user message to the server
    fetch('http://localhost:3000/cohere-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: userMessage })  // Send user message
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const botMessage = data.responseMessage;  // Get the bot's response

        // Append the bot's response to the chatbox
        chatBox.innerHTML += '<div class="message bot-message">' + botMessage + '</div>';
        chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
    })
    .catch(error => {
        console.error('Error:', error);

        // Show error message if there's a problem
        chatBox.innerHTML += '<div class="message bot-message error">An error occurred. Please try again later.</div>';
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}