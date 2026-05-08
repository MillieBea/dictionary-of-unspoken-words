function displayWord(response) {
  console.log("word generated");

  const answer = response.data.answer;
  const parts = answer.split(/Definition:|Example:/);
  const wordAndPos = parts[0].match(/Word: (.+) \((.+)\)/);
  const definition = parts[1].trim();
  const example = parts[2].trim();

  const word = wordAndPos[1].trim(); // The invented word
  const partOfSpeech = wordAndPos[2].trim(); // The part of speech

  console.log(`Word: ${word}, Part of Speech: ${partOfSpeech}`);

  const typewriterWord = new Typewriter("#word", {
    autoStart: true,
    cursor: null,
    delay: 30,
  })
    .changeDelay(30)
    .typeString(`${word} (${partOfSpeech})`)
    .start();

  typewriterWord.callFunction(() => {
    const typewriterDefinition = new Typewriter("#definition", {
      autoStart: true,
      cursor: null,
      delay: 30,
    })
      .changeDelay(30)
      .typeString(definition)
      .start();

    typewriterDefinition.callFunction(() => {
      const typewriterExample = new Typewriter("#example", {
        autoStart: true,
        cursor: null,
        delay: 30,
      })
        .changeDelay(30)
        .typeString(example)
        .start();
    });
  });
}

function generateWordAndDefinitionAndExample(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "oa123466c5f9312d2cba18f04t3ef25d";
  let prompt = `The user instructions are to describe the unnamed feeling. Generate a new word from ${instructionsInput.value} and add it's Part of Speech. Return exactly these lines: Output format should be: Word: [invented word] then ([Part of Speech]), like this: Hope (n.) Definition: [Sentence 1. Sentence 2 explaining etymology], Example: [1 sentence showing it in use]. Rules: word: 7-12 letters, plausible, blends real roots; definition: exactly 2 sentences (Sentence 1 = feeling, Sentence 2 = From [word1] + [word2]); Example: 1 sentence showing it in use. No extra text or labels.`;
  let context =
    "You are an Oxford English Dictionary creative lexicographer for the modern soul. Generate a new word, specify it's part of speech, it's definition and example to use in sentence. Make sure to follow the user instructions when generating the new word";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log("generating word");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);
  axios.get(apiUrl).then(displayWord);
}

let wordFormElement = document.querySelector("#word-generator-form");
wordFormElement.addEventListener("submit", generateWordAndDefinitionAndExample);
