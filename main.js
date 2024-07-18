document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");

  if (errorModal) {
    errorModal.classList.add("hidden");
  } else {
    console.error("Modal element not found!");
  }

  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          if (heart.innerText === "♡") {
            heart.innerText = "♥";
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = "♡";
            heart.classList.remove("activated-heart");
          }
        })
        .catch(error => {
          errorModal.classList.remove("hidden");
          errorModal.querySelector("#modal-message").innerText = error;
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

// Mock server response function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
// Example test script (test/indexTest.js)
describe('main.js', function() {
  it('contains a hidden modal', function() {
    const modal = document.getElementById('modal');
    expect(modal).to.not.equal(null);
    expect(modal.classList.contains('hidden')).to.be.true;
  });
});
