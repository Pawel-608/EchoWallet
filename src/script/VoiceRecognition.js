const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('output');

const grammar = '#JSGF V1.0; grammar blockchain; public <blockchain> = Bitcoin | Ethereum | Polkadot | Cardano | Solana | Chainlink | Binance Smart Chain | Stellar | Tezos | Monero ;';

const recognition = new window.webkitSpeechRecognition();
recognition.grammars.addFromString(grammar, 1);
console.log(recognition)
recognition.lang = 'en-US';
// recognition.continuous = true;
// recognition.interimResults = true;

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
