const apiKey = "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";
const mainText = document.querySelector(".main-center-text");
const input = document.getElementById("input-field");
const submitBtn = document.querySelector(".input-send-icon");
const history = document.querySelector(".sidebar-history");
const mainOptions = document.querySelector(".main-options-container");
const newChat = document.querySelector(".sidebar-header-icon");

// GET MESSAGE FUNCTION
async function getMessage() {
    let options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user",content: input.value}],
            max_tokens: 100
        })
    }
    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", options);
        let data = await response.json();
        mainText.textContent = data.choices[0].message.content;
        mainText.style.fontWeight = "200";
        mainOptions.remove();
        if (data.choices[0].message.content) {
            const historyContent = document.createElement("p");
            historyContent.innerText += input.value;
            history.appendChild(historyContent); 
        }
        
    } catch (error){
        console.error(error)
    }
    // CLEAR INPUT DATA
    input.value = "";
}


// CLEAR DATA AND START NEW CHAT
function clearData() {
    mainText.textContent = "";
}
// EVENT ON INPUT SUBMISSION
submitBtn.addEventListener("click", getMessage);
//  EVENT FOR STARTING A NEW CHAT
newChat.addEventListener("click", clearData);

