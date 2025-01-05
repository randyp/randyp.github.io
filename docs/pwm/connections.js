const gameBoard = document.getElementById('game-board');
const solutionBoard = document.getElementById('solution-board');
const groups = [
    { title: "CADENCE", words: [ "BEAT", "METER", "RHYTHM", "TIME" ] },
    { title: "PERCEIVE", words: [ "CATCH", "CLOCK", "NOTICE", "REGISTER" ] },
    { title: "ONE IN A GROUP OF TWELVE", words: [ "DONUT", "INCH", "JUROR", "MONTH" ] },
    { title: "DOG ___", words: [ "DAYS", "PADDLE", "TAG", "TIRED" ] }
];

const wordNumber = {
    "BEAT": 5, "METER": 1, "RHYTHM":0, "TIME":8,
    "CATCH":7, "CLOCK":1, "NOTICE":6, "REGISTER":5,
    "DONUT":2, "INCH":3, "JUROR":2, "MONTH":3,
    "DAYS":4, "PADDLE":6, "TAG":7, "TIRED":9
};

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

let words = [];
for (let i = 0; i < 4; i++) {
    words = words.concat(groups[i].words);
} 
shuffle(words);

// Create the game board
function renderBoard() {
  for (let i = 0; i < words.length; i++) { // Adjust for desired number of tiles
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.innerHTML = words[i] + '<br>' + wordNumber[words[i]];;
    tile.addEventListener('click', handleTileClick);
    gameBoard.appendChild(tile);
  }
}

function renderConnection(i) {
    const group = groups[i];
    const wordNumbers = group.words.map((word) => wordNumber[word]);
    const connection = document.createElement('div');
    connection.classList.add('connection');
    connection.classList.add('connection-' + i);
    connection.innerHTML = '<b>' + group.title + '</b>:<br>' + group.words.join(', ') + '<br>' + wordNumbers.join(', ');;
    solutionBoard.append(connection);
}

// Handle tile clicks
function handleTileClick(event) {
  const tile = event.target;
  tile.classList.toggle('selected');

  setTimeout(function() {
      const selectedTiles = Array.from(document.getElementsByClassName('selected'));
      if (selectedTiles.length > 4) {
          window.location.reload();
          return;
      }
      if (selectedTiles.length  == 4) {
          const selectedWords = selectedTiles.map((tile) => tile.innerText.split("\n")[0]);
          selectedWords.sort();
          console.log('checking solution', selectedWords);
          let solutionIndex = -1;
          for (let i = 0; i < 4; i++) {
              const groupWords = groups[i].words;
              const match = groupWords.length === selectedWords.length && groupWords.every((element, index) => element === selectedWords[index]);
              console.log(i, match, groupWords);
              if (match) {
                  solutionIndex = i;
              }
          }

          if (solutionIndex >= 0) {
            selectedTiles.forEach((tile) => tile.remove());
            renderConnection(solutionIndex);
          }
          else {
              alert("Not connected...");
              selectedTiles.forEach((tile) => tile.classList.remove('selected'));
          }
      }
  });
}

// Check for winning connections
function checkConnections() {
  // Implement logic to check if selected tiles form a valid connection
  // Update game state accordingly
}

renderBoard(); 


