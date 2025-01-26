const btcPrice = document.getElementById("btc-price");
const ethPrice = document.getElementById("eth-price");
const solPrice = document.getElementById("sol-price");


function getAPIKey() {
    const jsonFilePath = './config.json'; 

    let apikey;

    fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        apikey = data.gecko_api;
        
        getCoinPrice("bitcoin", btcPrice, apikey);
        getCoinPrice("ethereum", ethPrice, apikey);
        getCoinPrice("solana", solPrice, apikey);
    })
    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    });
}


function getCoinPrice(name, element, apiKey) {
    const id = name;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    fetch(url, {
        method: "GET",
        headers: {
            "x-cg-demo-api-key": apiKey,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const price = data.market_data.current_price.usd;

        element.innerHTML = `$${price.toFixed(2)}`;
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        element.innerHTML = "Error loading price";
    });
}

getAPIKey();