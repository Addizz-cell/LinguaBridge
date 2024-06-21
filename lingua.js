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