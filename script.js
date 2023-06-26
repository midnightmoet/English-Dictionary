const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  // console.log(word); // test

  try {
    // This is for the loading animation
    infoTextEl.style.display = "block";

    // This removes the meaning container
    meaningContainerEl.style.display = "none";

    // This is for the loading animation
    infoTextEl.innerText = `Searching for "${word}"...`;

    // This is for the API fetching
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    // console.log(result); // test

    // This creates a condition if the word is not found
    if (result.title) {
      // This displayes the meaning container and removes the loading animation
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";

      // If it isn't an actual word, it will display the word and N/A for the meaning
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      // This removes the loading animation
      infoTextEl.style.display = "none";

      // This is for the meaning container
      meaningContainerEl.style.display = "block";

      //   This is for the audio
      audioEl.style.display = "inline-flex";

      // This is for the title; the word
      titleEl.innerText = `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

      // This is for the meaning; gets the first definition
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;

      // This is for the audio; gets the audio
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    // console.log(error); // test
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

// API
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
