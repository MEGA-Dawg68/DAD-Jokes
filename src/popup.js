document.addEventListener("DOMContentLoaded", function() {
    const jokeElement = document.getElementById("joke");
    const getJokeButton = document.getElementById("getJoke");
    const saveJokeButton = document.getElementById("saveJoke");
    const viewSavedJokesButton = document.getElementById("viewSavedJokes");
    const savedJokesElement = document.getElementById("savedJokes");
    const savedJokesContainer = document.getElementById("savedJokesContainer");
    const copyInstantJokeButton = document.getElementById("copyInstantJoke");
    const shareButton = document.getElementById("shareButton");

    getJokeButton.addEventListener("click", getDadJoke);
    saveJokeButton.addEventListener("click", saveJoke);
    viewSavedJokesButton.addEventListener("click", toggleSavedJokes);
    copyInstantJokeButton.addEventListener("click", copyInstantJoke);

    // Add an event listener for the share button
    shareButton.addEventListener("click", shareJoke);

    // Load saved jokes
    chrome.storage.sync.get({ savedJokes: [] }, function(result) {
        displaySavedJokes(result.savedJokes);
    });

    function getDadJoke() {
        fetch("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            jokeElement.textContent = data.joke;
        });
    }

    function saveJoke() {
        const jokeText = jokeElement.textContent;

        chrome.storage.sync.get({ savedJokes: [] }, function(result) {
            const savedJokes = result.savedJokes;
            savedJokes.push(jokeText);

            chrome.storage.sync.set({ savedJokes: savedJokes }, function() {
                displaySavedJokes(savedJokes);
            });
        });
    }

    function toggleSavedJokes() {
        if (savedJokesContainer.style.display === "none") {
            savedJokesContainer.style.display = "block";
        } else {
            savedJokesContainer.style.display = "none";
        }
    }

    function copyInstantJoke() {
        const jokeText = jokeElement.textContent;
        copyTextToClipboard(jokeText);
    }

    // Function to share the joke (You need to implement this)
    function shareJoke() {
        const jokeText = jokeElement.textContent;
        // Implement the sharing logic here, e.g., sharing on social media or copying to the clipboard
        // You can use the copyTextToClipboard function as an example for copying the text.
    }

    function displaySavedJokes(savedJokes) {
        savedJokesElement.innerHTML = "";
        savedJokes.forEach(function(joke, index) {
            const jokeItem = document.createElement("div");
            jokeItem.textContent = joke;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {
                savedJokes.splice(index, 1);
                chrome.storage.sync.set({ savedJokes: savedJokes }, function() {
                    displaySavedJokes(savedJokes);
                });
            });

            const copyButton = document.createElement("button");
            copyButton.textContent = "Copy";
            copyButton.addEventListener("click", function() {
                copyTextToClipboard(joke);
            });

            jokeItem.appendChild(deleteButton);
            jokeItem.appendChild(copyButton);
            savedJokesElement.appendChild(jokeItem);
        });
    }

    function copyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    getDadJoke();
});
