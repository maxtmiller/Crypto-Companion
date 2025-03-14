document.getElementById('logoutButton').addEventListener('click', () => {
    console.log('Logging out...');
    window.location.href = 'dev-o85dkax757ba2dat.ca.auth0.com/logout';
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function extractUserId(name) {
    if (!name) return null;
    const parts = name.split('|');
    return parts.length === 2 ? parts[1] : null;
}

function extractUserName(name) {
    if (!name) return null;
    const parts = name.split('|');
    return parts.length === 2 ? parts[0] : null;
}


function sendMessageSuggestion(portfolioData) {
    console.log('Sending portfolio data:', JSON.stringify(portfolioData));

    fetch('https://geesehacks.onrender.com/cohere-suggestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: JSON.stringify(portfolioData) })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const botMessage = data.responseMessage;

        let htmlMessage = botMessage;

        htmlMessage = htmlMessage.replace(/^# (.*)$/gm, '<h1>$1</h1>');
        htmlMessage = htmlMessage.replace(/^## (.*)$/gm, '<h2>$1</h2>');
        htmlMessage = htmlMessage.replace(/^### (.*)$/gm, '<h3>$1</h3>');

        htmlMessage = htmlMessage.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        htmlMessage = htmlMessage.replace(/^\s*-\s*(.*)$/gm, '<ul><li>$1</li></ul>');

        document.getElementById('suggestion-place').innerHTML = htmlMessage;

    })
    .catch(error => {
        console.error('Error:', error);

        document.getElementById('suggestion-place').innerHTML = 'An error occurred. Please try again later.';
    });
}


const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiry time in days
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

const getCookie = (name) => {
    const cookieArr = document.cookie.split(';'); // Split the cookies string into individual cookies
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim(); // Remove any leading or trailing spaces
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1); // Extract the value after the '=' sign
        }
    }
    return null; // Return null if the cookie is not found
};


window.onload = () => {
    // const name = getQueryParam('name');
    // const userId = extractUserId(name);
    // const userName = extractUserName(name);

    const userName = getQueryParam('name');
    const userId = getQueryParam('userId');

    console.log('User ID:', userId);
    console.log('User Nickname:', userName);

    if (getCookie('userId') === 'null' || getCookie('userId') === 'null') {
        window.location.href = 'dev-o85dkax757ba2dat.ca.auth0.com/login';
    } else {
        setCookie('userId', userId);
        setCookie('userName', userName);
    }

    console.log('Cookie User ID:', getCookie('userId'));
    console.log('Cookie User Name:', getCookie('userName'));

    if (userId) {
        console.log('User ID:', userId);
        console.log('User Nickname:', userName);
        document.title = `User ID: ${userId}`;

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
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    if (response.status === 200) {
                        console.log("Success:", data.message);
    
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
                                    .then(portfolioData => { 
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
                    console.warn("Warning:", data.message);
    
                    const url = `https://geesehacks.onrender.com/user/${userId}/portfolio`;
    
                    fetch(url)
                    .then(response => {
                        if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(portfolioData => {
                        console.log('Portfolio:', portfolioData.portfolio);

                        sendMessageSuggestion(portfolioData.portfolio);
                        
                    })
                    .catch(error => {
                        console.error('Error fetching portfolio:', error);
                    });
                } else if (response.status === 400) {
                    console.error("Error:", data.message);
                    alert("Error: " + data.message);
                } else {
                    console.error("Unexpected error:", response.statusText);
                    alert("Unexpected error occurred.");
                }
            } catch (error) {
                console.error("Error while making API call:", error);
                alert("Network error: " + error.message);
            }
        };
    
        registerUser(userId, userName);
    } else {
        console.log('User ID not found.');
        document.title = 'No User ID Found';
    }    
};
