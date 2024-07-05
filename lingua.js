function runSpeechRecog() {
    document.getElementById("output").innerHTML = "Loading text...";
    var output = document.getElementById('output');
    var action = document.getElementById('action');
    var translation = document.getElementById('translation');
    var language = document.getElementById('language').value || 'en';
    let speaker =  document.querySelector("#record")
    let recognization = new webkitSpeechRecognition();
    recognization.lang = window.navigator.language;
    recognization.interimResults = false;

    recognization.onstart = () => {
       
        speaker.style.backgroundColor = 'red';
        
        // action.innerHTML = "Listening...";
    }

    recognization.onresult = (e) => {
        var transcript = e.results[0][0].transcript;
        output.innerHTML = transcript;
        output.classList.remove("hide");
        // action.innerHTML = "";
        speaker.style.backgroundColor = 'blue';

        // Translate the transcript
        translateText(transcript, language);
    }

    recognization.onerror = (e) => {
        action.innerHTML = "Error occurred: " + e.error;
    }

    recognization.onend = () => {
        action.innerHTML = "";
    }

    recognization.start();
}

function translateText(text, targetLang) {
    var translation = document.getElementById('translation');
    translation.innerHTML = "Translating...";

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`)
        .then(response => response.json())
        .then(data => {
            if (data.responseData) {
                translation.innerHTML = data.responseData.translatedText;
                translation.classList.remove("hide");
            } else {
                translation.innerHTML = "Translation failed.";
            }
        })
        .catch(error => {
            translation.innerHTML = "Error: " + error;
        });
}
// The nav menu on small screen
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}