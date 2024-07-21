const provider = new ethers.providers.JsonRpcProvider('https://moonbase-alpha.public.blastapi.io');

const privateKey = localStorage.getItem("privateKey");
if (!privateKey) {
    alert("Private key not specified")
}
const wallet = new ethers.Wallet(privateKey, provider);

const contacts = {
    "Pablo": "0xf672563A8Ab2216a5eE083d3C3AD113ED2a0D443",
    // "Fox": "0x8ef0cC03eA37A0aeAc59FA52E360856228B209e9",
    "Phil": "0x0895b82B566A0012223deE81C5156FfAE66d2278",
    "Dom": "0x8dF3dF43766856ECdc4C82cf36568eed865d785a"
}

 // Create a <ul> element
    const ul = document.createElement('ul');

    // Iterate through the contacts object
    for (const name in contacts) {
              if (contacts.hasOwnProperty(name)) {
                            // Create a <li> element
                            const li = document.createElement('li');
                            // Set the text of the <li> element to the contact name and address
                            li.textContent = `${name}: ${contacts[name]}`;
                                        // Append the <li> element to the <ul>
                                                    ul.appendChild(li);
                        }
          }

    // Append the <ul> to the div with id "contacts"
    const contactsDiv = document.getElementById('contacts');
    contactsDiv.appendChild(ul);

async function sendEther(amount, person) {
    try {
        const address = contacts[person]

        if (!address) {
            alert(`Address of ${person} not found - cannot send!`)
            return;
        }

        const tx = {
            to: address,
            value: ethers.utils.parseEther(amount)
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log('Transaction hash:', txResponse.hash);

        outputDiv.textContent = `Sending ${amount} DEV to ${person}, tx hash: https://moonbase.moonscan.io/tx/${txResponse.hash}: status - pending`;

        const receipt = await txResponse.wait();
        console.log('Transaction was mined in block', receipt.blockNumber);
        outputDiv.textContent = `Sending ${amount} DEV to ${person}, tx hash: https://moonbase.moonscan.io/tx/${txResponse.hash}: status - sent`;
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}
