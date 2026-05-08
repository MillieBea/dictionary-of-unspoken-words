function generateWordAndDefinitionAndExample(event) {
  event.preventDefault();

  const typewriterWord = new Typewriter("#word", {
    autoStart: true,
    cursor: null,
    delay: 30,
  })
    .changeDelay(30)
    .typeString("Melanbust (n.)")
    .start();

  typewriterWord.callFunction(() => {
    const typewriterDefinition = new Typewriter("#definition", {
      autoStart: true,
      cursor: null,
      delay: 30,
    })
      .changeDelay(30)
      .typeString(
        "A musical ambush that excavates buried grief. From melancholy + ambush.",
      )
      .start();

    typewriterDefinition.callFunction(() => {
      const typewriterExample = new Typewriter("#example", {
        autoStart: true,
        cursor: null,
        delay: 30,
      })
        .changeDelay(30)
        .typeString(
          "The Spotify shuffle melanbust left him crying into pasta at 3pm.",
        )
        .start();
    });
  });
}

let wordFormElement = document.querySelector("#word-generator-form");
wordFormElement.addEventListener("submit", generateWordAndDefinitionAndExample);
