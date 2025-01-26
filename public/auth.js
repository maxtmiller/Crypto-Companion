
document.getElementById('logoutButton').addEventListener('click', () => {
    console.log('Logging out...');
    window.location.href = 'http://localhost:3000/logout';
});

const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
  
// Function to extract the user ID from the 'name' query parameter
const extractUserId = (name) => {
    if (name) {
        const parts = name.split('|');
        if (parts.length === 2) {
            return parts[1]; // The user ID is the second part after the '|'
        }
    }
    return null; // Return null if the format is incorrect
};
  
// On page load
window.onload = () => {
    const name = getQueryParam('name');
    const userId = extractUserId(name);
  
    if (userId) {
        console.log('User ID:', userId);
        document.title = `User ID: ${userId}`; // Set the title to include the user ID
    } else {
        console.log('User ID not found.');
        document.title = 'No User ID Found'; // Set a fallback title if no user ID is found
    }
};
