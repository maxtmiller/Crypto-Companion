import React, { useState } from "react";
import './Suggestions.css';

function updatePortfolio(coin, amount, userId) {
  const url = `https://geesehacks.onrender.com/user/${userId}/portfolio`;

  const portfolioData = {
    name: coin,
    amount: amount,
  };

  // Send PUT request for ETH
  fetch(url, {
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

      // Fetch the updated portfolio
      fetch(portURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((portfolioData) => {
          console.log("Portfolio:", portfolioData.portfolio);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error fetching portfolio:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}

function Suggestions() {
  // State to control visibility of each suggestion card
  const [visibleSuggestions, setVisibleSuggestions] = useState({
    BTC: true,
    ETH: true,
    XRP: true,
    SOL: true,
  });

  const handleDecline = (coin) => {
    alert(`You declined the suggestion for ${coin}`);
    setVisibleSuggestions((prevState) => ({
      ...prevState,
      [coin]: false, // Hide the specific suggestion card
    }));
  };

  const handleAccept = (coin) => {
    // alert(`You accepted the suggestion for ${coin}`);
    setVisibleSuggestions((prevState) => ({
      ...prevState,
      [coin]: false, // Optionally hide the suggestion after accepting as well
    }));

    const userId = "12345"; // TODO: dynamically fetch the actual userId

     // Check if ETH was accepted and send the request
    if (coin === "ETH") {
      updatePortfolio("ethereum", +0.1, userId);
    } else if (coin === "BTC") {
      updatePortfolio("bitcoin", -0.02, userId);
    } else if (coin === "XRP") {
      updatePortfolio("ripple", +0.05, userId);
    } else if (coin === "SOL") {
      updatePortfolio("solana", -0.01, userId);
    }
  };

  return (
    <div className="suggestion-box">
      <h1>Suggestions</h1>
      <div id="suggestion-place"></div>

      <div className="suggestion-place">
        {/* BTC Suggestion */}
        {visibleSuggestions.BTC && (
          <div className="suggestion-card">
            <h2>BTC: -$5</h2>
            <div className="button-group">
              <button
                id="d-s1-b"
                className="decline-button"
                onClick={() => handleDecline("BTC")}
              >
                Decline
              </button>
              <button
                id="a-s1-b"
                className="accept-button"
                onClick={() => handleAccept("BTC")}
              >
                Accept
              </button>
            </div>
          </div>
        )}

        {/* ETH Suggestion */}
        {visibleSuggestions.ETH && (
          <div className="suggestion-card">
            <h2>ETH: +$500</h2>
            <div className="button-group">
              <button
                id="d-s2-b"
                className="decline-button"
                onClick={() => handleDecline("ETH")}
              >
                Decline
              </button>
              <button
                id="a-s2-b"
                className="accept-button"
                onClick={() => handleAccept("ETH")}
              >
                Accept
              </button>
            </div>
          </div>
        )}

        {/* XRP Suggestion */}
        {visibleSuggestions.XRP && (
          <div className="suggestion-card">
            <h2>XRP: +$10</h2>
            <div className="button-group">
              <button
                id="d-s3-b"
                className="decline-button"
                onClick={() => handleDecline("XRP")}
              >
                Decline
              </button>
              <button
                id="a-s3-b"
                className="accept-button"
                onClick={() => handleAccept("XRP")}
              >
                Accept
              </button>
            </div>
          </div>
        )}

        {/* SOL Suggestion */}
        {visibleSuggestions.SOL && (
          <div className="suggestion-card">
            <h2>SOL: -$2</h2>
            <div className="button-group">
              <button
                id="d-s4-b"
                className="decline-button"
                onClick={() => handleDecline("SOL")}
              >
                Decline
              </button>
              <button
                id="a-s4-b"
                className="accept-button"
                onClick={() => handleAccept("SOL")}
              >
                Accept
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Suggestions;