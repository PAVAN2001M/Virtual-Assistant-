
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

// Function for text-to-speech (Speech Synthesis)
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

// Function to greet based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    // Morning, Afternoon, or Evening greeting
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Load event to greet when the page is opened
window.addEventListener('load', () => {
    wishMe();
});

// Initialize Speech Recognition (only works in supported browsers)
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    // Event handler for when speech is recognized
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerHTML = transcript; // Display recognized text
      
    takeCommand(transcript.toLowerCase())
};

    

    // Start speech recognition when the button is clicked
    btn.addEventListener("click", () => {
            recognition.start(); 
           
    })
    function takeCommand(message) {
        // Display the recognized message as the question
        content.innerHTML = `You: ${message}`;
    
        // Answer based on the command
        let response = "";
        if (message.includes("hello")|| message.includes("hey")) {
            response = "Hello Sir, what can I help you with?";
        } else if (message.includes("how are you")) {
            response = "I'm doing great, Sir! How about you?";
        }
        else if (message.includes("name")) {
                response = "My name is Alexa I'm  your virtual Assistant  created by Pavan Kumar Sir";
        } else if (message.includes("time")) {
            let time = new Date().toLocaleTimeString();
            response = `The current time is ${time}`;
        } else if (message.includes("date")) {
            let date = new Date().toLocaleDateString();
            response = `Today's date is ${date}`;

         } else if (message.includes("YouTube")) {
                window.open ("https://www.youtube.com/");
        } 
        else if (message.includes("Instagram")) {
            window.open ("https://www.instagram.com/");
        }
        else if (message.includes("google")) {
            window.open ("https://www.google.co.in/");
        }
        else if (message.includes("Facebook")) {
            window.open ("https://www.facebook.com/");
        }else if (message.includes("calculator")) {
            window.open ("calculator://");
        }
        else if (message.includes("whatsapp")) {
            window.open ("https://web.whatsapp.com/");
        }
        else if (message.includes("maps")) {
            window.open ("https://www.google.com/maps");
        }
        else {
            speak(`this is what i found on internet regarding ${message}`)
                window.open(`https://www.google.co.in/search?q=${message}`)
        }
    

        // Display the response in text
        setTimeout(() => {
            content.innerHTML += `<br>Alexa: ${response}`; // Add response text after the question
        }, 500); // Short delay to allow the question to be displayed
    
        // Speak the response
        speak(response);
    
        // Hide the question after the response is given
        setTimeout(() => {
            content.style.display = "none"; // Hide the question text after a delay
        }, 5000); // Adjust the time to match the speech duration
    }
    
    