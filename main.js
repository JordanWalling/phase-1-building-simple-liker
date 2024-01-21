// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
function initialise() {
  // 1. hide error modal
  let modal = document.querySelector("#modal");
  modal.classList = "hidden";

  // 2. click heart
  let glyphs = document.querySelectorAll(".like-glyph");
  let modalMessage = document.querySelector("#modal-message");
  glyphs.forEach((glyph) => {
    glyph.addEventListener("click", (e) => {
      // console.log("this got clicked", e.target);
      mimicServerCall()
        .then((resp) => {
          console.log(resp);
          if (glyph.innerHTML === FULL_HEART) {
            glyph.classList.remove("activated-heart");
            glyph.innerHTML = EMPTY_HEART;
          } else {
            glyph.classList.add("activated-heart");
            glyph.innerHTML = FULL_HEART;
          }
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            modal.classList.add("hidden");
            modalMessage.textContent = error.message;
          }, 3000);
        });
    });
  });
}
document.addEventListener("DOMContentLoaded", initialise);

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
