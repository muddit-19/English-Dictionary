const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");
const audioButton = document.querySelector(".audio");

async function fetchAPI(word) {

    try {
        infoText.style.display = "block";
        meaningContainer.style.display = "none";
        infoText.innerHTML = "Searching the meaning of " + word;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());
        
            audioButton.style.display = "block";
            infoText.style.display = "none";
            meaningContainer.style.display = "block";
            title.innerText = result[0].word;
            meaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio;
       
    } catch (error) {
            audioButton.style.display="none";
            title.innerText = word;
            meaning.innerText = "N/A";
    }


}

function playsound() {
    var audio = document.getElementById("audio");
    audio.play();
}


input.addEventListener("keypress", function (event) {
    if (event.target.value && event.key === "Enter") {
        fetchAPI(event.target.value);
    }
});

document.querySelector(".search button").addEventListener("click", function (event) {

    fetchAPI(document.querySelector("input").value);
});