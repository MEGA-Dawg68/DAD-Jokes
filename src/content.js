// content.js

// Function to extract dad jokes from the web page
function extractDadJoke() {
  const dadJokeElement = document.querySelector('.joke-text'); // Adjust the selector to match the actual structure of the web page
  if (dadJokeElement) {
    const dadJokeText = dadJokeElement.textContent;
    return dadJokeText;
  }
  return null;
}

// Send the extracted dad joke to the extension popup
function sendDadJokeToPopup(jokeText) {
  chrome.runtime.sendMessage({ type: "dadJoke", joke: jokeText });
}

// Main function to execute when the content script runs
function main() {
  const dadJokeText = extractDadJoke();
  if (dadJokeText) {
    sendDadJokeToPopup(dadJokeText);
  }
}

// Run the main function when the page loads
main();
