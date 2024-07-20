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
  let transcript = event.results[0][0].transcript;

  

  const words = transcript.split(" ")

  const amount = words.filter(word => isNumber(word))[0]
  const person = words[words.length - 1]

  outputDiv.textContent = transcript;
};

recognition.onend = () => {
    startButton.textContent = 'Start Voice Input';
};

startButton.addEventListener('click', () => {
    recognition.start();
});
// send 0.5 deaf to Dome
// send 3.5 def to fill




function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}