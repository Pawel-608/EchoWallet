const grammar1 = '#JSGF V1.0; grammar names; public <names> = Pablo | Fox | Dom;'
const grammar2 = '#JSGF V1.0; grammar dev; public <dev> = Dev;'
const grammar3 = '#JSGF V1.0; grammar send; public <send> = Send;'

const recognition = new window.webkitSpeechRecognition();
recognition.grammars.addFromString(grammar1, 1);
recognition.grammars.addFromString(grammar2, 2);
recognition.grammars.addFromString(grammar3, 3);

recognition.lang = 'en-US';

recognition.onstart = () => {
    startButton.textContent = 'Listening...';
};


recognition.onresult = (event) => {
    try {
        handleVoiceInput(event.results[0][0].transcript)
    } catch (e) {
        window.alert(e?.message || "Something went wrong")
    }
};

recognition.onend = () => {
    startButton.textContent = 'Start Voice Input';
};

startButton.addEventListener('click', () => {
    recognition.start();
});

function handleVoiceInput(transcript) {
    const words = transcript.split(" ")
    const amount = words.filter(word => isNumber(word))[0]

    if (!amount)  {
        console.error(`Connot find amount ${amount} ${transcript}`)
        throw new Error("I don't understand - please repeat again")
    }
    if (words.length < 5 && !(transcript.includes("Pablo") || transcript.includes("Fox") || transcript.includes("Dom"))) {
        console.error(`Transcript too short ${transcript}`)
        throw new Error("I don't understand - please repeat again")
    }

    const person = parsePerson(transcript, words[words.length - 1])

    sendEther(amount, person)
}

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function parsePerson(transcript, person) {
    transcript = transcript.toLowerCase()

    if (transcript.includes("pablo")) {
        return "Pablo"
    }
    if (transcript.includes("fox")) {
        return "Fox"
    }
    if (transcript.includes("dom")) {
        return "Dom"
    }

    if (person.length == 0) {
        console.error({person, transcript})
        throw new Error("Cannot identify person - please try once again")
    }
    person = person.toLowerCase()

    const personArray = Array.from(person)[0];

    switch (personArray[0]) {
        case "p":
            return "Pablo"
        case "f":
            return "Fox"
        case "d":
            return "Dom"
    }

    console.error({person, transcript})
    throw new Error("Cannot identify person - please try once again")
}
