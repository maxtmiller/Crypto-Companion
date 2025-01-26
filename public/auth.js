
document.getElementById('logoutButton').addEventListener('click', () => {
    console.log('Logging out...');
    window.location.href = 'http://localhost:3000/logout';
});

// Function to get a query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to extract the user ID from the 'name' parameter
function extractUserId(name) {
    if (!name) return null; // Return null if name is not provided
    const parts = name.split('|'); // Split the string by '|'
    return parts.length === 2 ? parts[1] : null; // Return the second part if it exists
}

function extractUserName(name) {
    if (!name) return null; // Return null if name is not provided
    const parts = name.split('|'); // Split the string by '|'
    return parts.length === 2 ? parts[0] : null; // Return the second part if it exists
}

function sendMessageSuggestion(portfolioData) {
    // Ensure portfolioData is a valid object, if it's a string or array, you may need to stringify it
    console.log('Sending portfolio data:', JSON.stringify(portfolioData));

    // Send the portfolio data to the server
    fetch('http://localhost:3000/cohere-suggestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: JSON.stringify(portfolioData) })  // Send portfolio data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const botMessage = data.responseMessage;  // Get the bot's response message

        let htmlMessage = botMessage;

        // Convert Markdown headers (#) to HTML <h1>, <h2>, etc.
        htmlMessage = htmlMessage.replace(/^# (.*)$/gm, '<h1>$1</h1>');  // # Header 1
        htmlMessage = htmlMessage.replace(/^## (.*)$/gm, '<h2>$1</h2>');  // ## Header 2
        htmlMessage = htmlMessage.replace(/^### (.*)$/gm, '<h3>$1</h3>'); // ### Header 3

        // Convert Markdown bold (**text**) to HTML <b> tags
        htmlMessage = htmlMessage.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');  // **bold text**

        // Convert Markdown unordered list (-) to HTML <ul> and <li>
        htmlMessage = htmlMessage.replace(/^\s*-\s*(.*)$/gm, '<ul><li>$1</li></ul>');  // - Item

        // Update the suggestion place with the converted HTML
        document.getElementById('suggestion-place').innerHTML = htmlMessage;

    })
    .catch(error => {
        console.error('Error:', error);

        // Show error message if there's a problem
        document.getElementById('suggestion-place').innerHTML = 'An error occurred. Please try again later.';
    });
}

// On page load
window.onload = () => {
    const name = getQueryParam('name');
    const userId = extractUserId(name);
    const userName = extractUserName(name);

    if (userId) {
        console.log('User ID:', userId);
        console.log('User Nickname:', userName);
        document.title = `User ID: ${userId}`; // Set the title to include the user ID
    
        // Function to make a POST request to the register endpoint
        const registerUser = async (userId, userName) => {
            const apiUrl = "https://geesehacks.onrender.com/user/register";
    
            const requestBody = {
                userid: userId,
                username: userName,
            };
    
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Specify JSON format
                    },
                    body: JSON.stringify(requestBody), // Convert request body to JSON
                });
    
                // Parse the JSON response
                const data = await response.json();
    
                // Handle responses based on status codes
                if (response.ok) {
                    if (response.status === 200) {
                        console.log("Success:", data.message); // User registered successfully
                        // alert("Success: " + data.message);
    
                        const ethURL = `https://geesehacks.onrender.com/user/${userId}/portfolio`;
    
                        const portfolioData = {
                            name: "ethereum",
                            amount: 0.01,
                        };
    
                        fetch(ethURL, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(portfolioData),
                        })
                        .then((response) => {
                            if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((responseData) => {
                            console.log("Response:", responseData);

                            const btcURL = `https://geesehacks.onrender.com/user/${userId}/portfolio`;
    
                            const portfolioData = {
                                name: "bitcoin",
                                amount: 0.00031,
                            };
        
                            fetch(btcURL, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(portfolioData),
                            })
                            .then((response) => {
                                if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then((responseData) => {
                                console.log("Response:", responseData);

                                const solURL = `https://geesehacks.onrender.com/user/${userId}/portfolio`;
    
                                const portfolioData = {
                                    name: "solana",
                                    amount: 0.0135,
                                };
            
                                fetch(solURL, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(portfolioData),
                                })
                                .then((response) => {
                                    if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                    }
                                    return response.json();
                                })
                                .then((responseData) => {
                                    console.log("Response:", responseData);

                                    const portURL = `https://geesehacks.onrender.com/user/${userId}/portfolio`;
    
                                    fetch(portURL)
                                    .then(response => {
                                        if (!response.ok) {
                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                        }
                                        return response.json();
                                    })
                                    .then(portfolioData => { // Renamed to avoid conflict
                                        console.log('Portfolio:', portfolioData.portfolio);

                                        sendMessageSuggestion(portfolioData.portfolio);
                                    })
                                    .catch(error => {
                                        console.error('Error fetching portfolio:', error);
                                    });
                                    
                                })
                                .catch((error) => {
                                    console.error("Error:", error);
                                });
                                
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                    }
                } else if (response.status === 409) {
                    console.warn("Warning:", data.message); // User already exists
                    // alert("Warning: " + data.message);
    
                    const url = `https://geesehacks.onrender.com/user/${userId}/portfolio`;
    
                    fetch(url)
                    .then(response => {
                        if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(portfolioData => { // Renamed to avoid conflict
                        console.log('Portfolio:', portfolioData.portfolio);

                        sendMessageSuggestion(portfolioData.portfolio);
                        
                    })
                    .catch(error => {
                        console.error('Error fetching portfolio:', error);
                    });
                } else if (response.status === 400) {
                    console.error("Error:", data.message); // Other client errors
                    alert("Error: " + data.message);
                } else {
                    console.error("Unexpected error:", response.statusText); // Unexpected error
                    alert("Unexpected error occurred.");
                }
            } catch (error) {
                console.error("Error while making API call:", error);
                alert("Network error: " + error.message); // Handle network errors
            }
        };
    
        // Call the `registerUser` function with extracted userId and userName
        // const userName = name.split('|')[0]; // Extract the first part of the 'name'
        registerUser(userId, userName);
    } else {
        console.log('User ID not found.');
        document.title = 'No User ID Found'; // Set a fallback title if no user ID is found
    }    
};
