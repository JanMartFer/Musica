let songs = [
  [
    { freq: 440.00, duration: 500 }, { freq: 440.00, duration: 500 }, { freq: 440.00, duration: 500 },
    { freq: 349.23, duration: 350 }, { freq: 523.25, duration: 150 }, { freq: 440.00, duration: 500 },
    { freq: 349.23, duration: 350 }, { freq: 523.25, duration: 150 }, { freq: 440.00, duration: 1000 }
  ],
  [
    { freq: 659.26, duration: 200 }, { freq: 659.26, duration: 200 }, { freq: 0, duration: 100 },
    { freq: 659.26, duration: 200 }, { freq: 0, duration: 100 }, { freq: 523.25, duration: 200 },
    { freq: 659.26, duration: 200 }, { freq: 0, duration: 100 }, { freq: 784.00, duration: 200 }
  ],
  [
    { freq: 261.63, duration: 500 }, { freq: 261.63, duration: 500 }, { freq: 293.66, duration: 500 },
    { freq: 261.63, duration: 500 }, { freq: 349.23, duration: 500 }, { freq: 330.00, duration: 1000 }
  ],
  [
    { freq: 349.23, duration: 500 }, { freq: 349.23, duration: 500 }, { freq: 349.23, duration: 500 },
    { freq: 261.63, duration: 500 }, { freq: 261.63, duration: 500 }, { freq: 329.63, duration: 500 },
    { freq: 349.23, duration: 500 }, { freq: 392.00, duration: 500 }, { freq: 392.00, duration: 500 }
  ]
];

let answers = [
  [ { text: "Star Wars", correct: true }, { text: "Star Trek", correct: false }, { text: "Alien", correct: false }, { text: "Iron Man", correct: false } ],
  [ { text: "Sonic", correct: false }, { text: "Pacman", correct: false }, { text: "Super Mario Bros", correct: true }, { text: "Donkey Kong", correct: false } ],
  [ { text: "Happy Birthday", correct: true }, { text: "Himne d'Espanya", correct: false }, { text: "Marxa nupcial", correct: false }, { text: "Els Segadors", correct: false } ],
  [ { text: "Harry Potter", correct: true }, { text: "Senyor dels Anells", correct: false }, { text: "Game of Trones", correct: false }, { text: "Dragon ball", correct: false } ]
];

let level = 0;
let correctAnswers = 0;
let message = "";
let startButton;
let answerButtons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  startButton = createButton("Començar");
  startButton.position(width / 2 - 60, height / 2 + 40);
  startButton.size(120, 50);
  startButton.mousePressed(startGame);
}

function draw() {
  background(220);
  if (level === 0) {

    showStartScreen();
  } else if (level <= songs.length) {
    showLevel();
  } else {
    showEndScreen();
  }

  if (message !== "") {
    showMessage();
  }
}

function showStartScreen() {
  textSize(24);
  text("Benvingut a la meva prova!", width / 2, height / 2 - 40);
  text("Prem el botó per començar...", width / 2, height / 2);
}


function showLevel() {
  textSize(20);
  text(`Nivell ${level}`, width / 2, 50);
  text("Escolta la cançó", width / 2, 100);
  text("Selecciona la resposta correcta.", width / 2, 120);

  playSong(songs[level - 1]);

  // Crear botons de resposta
  clearAnswerButtons(); // Buidem botons existents abans de crear-ne de nous
  let answerOptions = answers[level - 1];
  for (let i = 0; i < answerOptions.length; i++) {
    let y = 200 + i * 80;
    let button = createButton(answerOptions[i].text);
    button.position(width / 2 - 120, y);
    button.size(240, 60);
    button.mousePressed(() => checkAnswer(answerOptions[i].correct));
    answerButtons.push(button);
  }
}
let restartButton; // Variable per al botó de reinici

function showEndScreen() {
  fill(0);
  textSize(24);
  text("Fi del joc!", width / 2, height / 2 - 100);

  let resultText = correctAnswers === songs.length
    ? "Enhorabona! "
    : `Has encertat ${correctAnswers} de ${songs.length} respostes.`;

  let customMessages = correctAnswers === songs.length
    ? [
        "Vaya potra...",
        "Si alló et sonava a Harry Potter",
        "T'hauras de fer mirar l'oida!",
        "Et salves de la prova!",
        "La pista per seguir es:",
        "Aprop del foc i lluny del sofà,",
        "On serà?",
      ]
    : correctAnswers === 0
    ? [
        "Potser que afinem l'orella una mica!",
        "Prova de nou per millorar!"
      ]
    : correctAnswers < songs.length / 2
    ? [
        "Has perdut!",
        "Hauràs de fer la prova Musical!",
        "Harry Potter Xiularàs i sense",
        "riure ho faràs!",
        "(La última cançó era Harry Potter",
        "interpretada per ChatGPT...)"
      ]
    : [
        "Has perdut!",
        "Hauràs de fer la prova Musical!",
        "Harry Potter Xiularàs i sense",
        "riure ho faràs!",
        "(La última cançó era Harry Potter",
        "interpretada per ChatGPT...)"
      ];

  text(resultText, width / 2, height / 2 - 40);

  textSize(18);
  for (let i = 0; i < customMessages.length; i++) {
    text(customMessages[i], width / 2, height / 2 + i * 20);
  }

  // Crear botó de reinici si no existeix
  if (!restartButton) {
    restartButton = createButton("Reinicia el joc");
    restartButton.position(width / 2 - 60, height / 2 + 200);
    restartButton.size(120, 40);
    restartButton.mousePressed(resetGame); // Assignar acció per reiniciar
  }
}

function resetGame() {
  // Eliminar botó de reinici
  if (restartButton) {
    restartButton.remove();
    restartButton = null;
  }

  // Reiniciar variables del joc
  level = 0;
  correctAnswers = 0;
  message = "";
  songs.forEach(song => song.playing = false);
startButton.show();
  // Tornar a la pantalla inicial
  draw();
}


function clearAnswerButtons() {
  for (let i = answerButtons.length - 1; i >= 0; i--) {
    answerButtons[i].remove(); // Assegura que s'eliminen completament
    answerButtons.pop(); // Elimina també de l'array
  }
}

function showMessage() {
  fill(0, 150);
  rect(0, height - 60, width, 60);
  fill(255);
  textSize(18);
  text(message, width / 2, height - 30);
}

function playSong(song) {
  if (!song.playing) {
    let index = 0;
    function playNote() {
      if (index < song.length) {
        let note = song[index];
        if (note.freq > 0) {
          let osc = new p5.Oscillator();
          osc.setType('sine');
          osc.freq(note.freq);
          osc.start();
          setTimeout(() => osc.stop(), note.duration);
        }
        setTimeout(playNote, note.duration);
        index++;
      }
    }
    playNote();
    song.playing = true;
  }
}

function startGame() {
  startButton.hide();
  level = 1;
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    correctAnswers++;
    message = "🎯 Molt bé!";
  } else {
    message = "❌ Has fallat!";
  }

  setTimeout(() => {
    message = "";
    level++;
    clearAnswerButtons();
  }, 1500);
}



function keyPressed() {
  if (level > songs.length) {
    resetGame();
  }
}
