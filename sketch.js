let songs = [
  // Nivell 1 - Star Wars
  [
    { freq: 440.00, duration: 500 }, { freq: 440.00, duration: 500 }, { freq: 440.00, duration: 500 },
    { freq: 349.23, duration: 350 }, { freq: 523.25, duration: 150 }, { freq: 440.00, duration: 500 },
    { freq: 349.23, duration: 350 }, { freq: 523.25, duration: 150 }, { freq: 440.00, duration: 1000 }
  ],
  // Nivell 2 - Super Mario Bros
  [
    { freq: 659.26, duration: 200 }, { freq: 659.26, duration: 200 }, { freq: 0, duration: 100 },
    { freq: 659.26, duration: 200 }, { freq: 0, duration: 100 }, { freq: 523.25, duration: 200 },
    { freq: 659.26, duration: 200 }, { freq: 0, duration: 100 }, { freq: 784.00, duration: 200 }
  ],
  // Nivell 3 - Happy Birthday
  [
    { freq: 261.63, duration: 500 }, { freq: 261.63, duration: 500 }, { freq: 293.66, duration: 500 },
    { freq: 261.63, duration: 500 }, { freq: 349.23, duration: 500 }, { freq: 330.00, duration: 1000 }
  ],
  // Nivell 4 - Harry Potter
  [
    { freq: 349.23, duration: 500 }, { freq: 349.23, duration: 500 }, { freq: 349.23, duration: 500 },
    { freq: 261.63, duration: 500 }, { freq: 261.63, duration: 500 }, { freq: 329.63, duration: 500 },
    { freq: 349.23, duration: 500 }, { freq: 392.00, duration: 500 }, { freq: 392.00, duration: 500 }
  ]
];

let answers = [
  [ { text: "Star Wars", correct: true }, { text: "Star Trek", correct: false }, { text: "Alien", correct: false }, { text: "Iron Man", correct: false } ],
  [ { text: "Sonic", correct: false }, { text: "Pacman", correct: false }, { text: "Super Mario Bros", correct: true }, { text: "Donkey Kong", correct: false } ],
  [ { text: "Happy Birthday", correct: true }, { text: "Himne d'España", correct: false }, { text: "Marxa nupcial", correct: false }, { text: "Els Segadors", correct: false } ],
  [ { text: "Harry Potter", correct: true }, { text: "Senyor dels Anells", correct: false }, { text: "Game of Trones", correct: false }, { text: "Dragon ball", correct: false } ]
];

let level = 0;
let correctAnswers = 0;
let message = "";

function setup() {
  createCanvas(360, 640); // Adaptem el canvas a una resolució típica de mòbil en vertical
  textAlign(CENTER, CENTER);
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
  text("Benvingut a la meva prova !", width / 2, height / 2 - 40);
  text("Toca la pantalla per continuar...", width / 2, height / 2);
   text("J!M!", width / 2, height / 2+200);
}

function showLevel() {
  textSize(20);
  text(`Nivell ${level}`, width / 2, 50);
  text("Escolta la cançó", width / 2, 100);
  text("Selecciona la resposta correcta.", width / 2, 120);

  playSong(songs[level - 1]);

  let answerOptions = answers[level - 1];
  for (let i = 0; i < answerOptions.length; i++) {
    let y = 200 + i * 80; // Espaiat més gran per a pantalles petites
    fill(200);
    rect(width / 2 - 120, y, 240, 60, 10); // Botons més grans i amb cantonades arrodonides
    fill(0);
    text(answerOptions[i].text, width / 2, y + 30);
  }
}

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
        "Si alló et sonava a  Harry Potter",
      "T'hauras de fer mirar l'oida!",
       "Et salves de la prova!",
       "La pista per seguir es:",
       "Aprop del foc i lluny del sofá,",
       "On será?",
      ]
    : correctAnswers === 0
    ? [
        "Potser que afinem l'orella una mica!",
        "Prova de nou per millorar!"
      ]
    : correctAnswers < songs.length / 2
    ? [
          "Has perdut!",
        "Haurás de fer la prova Musical!",
              "Harry Potter Xiularás i sense",
              "riure ho farás!",
       "(La ultima canço era Harry Potter",
       "interpretada per ChatGPT...)"
      ]
    : [
        "Has perdut!",
        "Haurás de fer la prova Musical!",
              "Harry Potter Xiularás i sense",
              "riure ho farás!",
       "(La ultima canço era Harry Potter",
       "interpretada per ChatGPT...)"
      ];

  text(resultText, width / 2, height / 2 - 40);

  // Mostrem línies addicionals
  textSize(18);
  for (let i = 0; i < customMessages.length; i++) {
    text(customMessages[i], width / 2, height / 2 + i * 20);
  }

  text("Prem una tecla per tornar a començar", width / 2, height / 2 + 200);
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

function mousePressed() {
  if (level === 0) {
    level = 1;
  } else if (level <= songs.length) {
    let answerOptions = answers[level - 1];
    for (let i = 0; i < answerOptions.length; i++) {
      let y = 200 + i * 80;
      if (mouseX > width / 2 - 120 && mouseX < width / 2 + 120 && mouseY > y && mouseY < y + 60) {
        if (answerOptions[i].correct) {
          correctAnswers++;
          message = "🎯 Molt bé!";
        } else {
          message = "❌ Has fallat!";
        }
        setTimeout(() => {
          message = "";
          level++;
        }, 1500);
        break;
      }
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  level = 0;
  correctAnswers = 0;
  message = "";
  songs.forEach(song => song.playing = false);
}
