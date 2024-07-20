const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('output');

const recognition = new window.webkitSpeechRecognition();
recognition.lang = 'en-US';
// recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => {
    startButton.textContent = 'Listening...';
};


recognition.onresult = (event) => {
  for(const result of event.results) {
    for(const resultResult of result) {
      console.log(result[0].transcript)
    }
  }
  
  let transcript = event.results[0][0].transcript;

  outputDiv.textContent = transcript;
};

recognition.onend = () => {
    startButton.textContent = 'Start Voice Input';
};

startButton.addEventListener('click', () => {
    recognition.start();
});
