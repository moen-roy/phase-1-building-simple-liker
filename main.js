// Define heart characters
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select modal and hearts
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const hearts = document.querySelectorAll(".like-glyph");

// Hide modal on start
modal.classList.add("hidden");

// Loop through each heart and attach click listener
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        // Toggle heart state
        if (heart.textContent === EMPTY_HEART) {
          heart.textContent = FULL_HEART;
          heart.classList.add("activated-heart");
        } else {
          heart.textContent = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        }
      })
      .catch(error => {
        // Show error in modal
        modalMsg.textContent = error;
        modal.classList.remove("hidden");

        // Hide modal after 3 seconds
        setTimeout(() => modal.classList.add("hidden"), 3000);
      });
  });
});

// Mock server call
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
