
// const url = "https://api.coingecko.com/api/v3/coins/list";

const btcPrice = document.getElementById("btc-price");
const ethPrice = document.getElementById("eth-price");
const solPrice = document.getElementById("sol-price");

function getCoinPrice(name, element) {
    const id = name;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    fetch(url, {
        method: "GET",
        headers: {
            "x-cg-demo-api-key": "CG-ypBTknPKECypM2SuYkNDT3bk", // Replace with your actual API key if needed
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // Extract the USD price from the response
        const price = data.market_data.current_price.usd;

        // Update the innerHTML of the corresponding element with the coin price
        element.innerHTML = `$${price.toFixed(2)}`; // Format to 2 decimal places
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        element.innerHTML = "Error loading price"; // Fallback message
    });
}

// Call the function for each coin, passing the correct element
getCoinPrice("bitcoin", btcPrice);
getCoinPrice("ethereum", ethPrice);
getCoinPrice("solana", solPrice);