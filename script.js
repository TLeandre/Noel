// Puzzle settings
const rows = 8; // Nombre de lignes
const cols = 8; // Nombre de colonnes
const puzzleContainer = document.getElementById('puzzle-container');
const message = document.getElementById('message');
let pieces = [];

// Charge et mélange les pièces du puzzle
function initializePuzzle() {
  for (let i = 0; i < rows * cols; i++) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundImage = `url('./images/${i}.jpg')`;
    piece.setAttribute('data-index', i);
    pieces.push(piece);
  }

  shuffleArray(pieces);

  pieces.forEach(piece => {
    piece.draggable = true;
    piece.addEventListener('dragstart', handleDragStart);
    piece.addEventListener('dragover', handleDragOver);
    piece.addEventListener('drop', handleDrop);
    puzzleContainer.appendChild(piece);
  });
}

// Mélange un tableau (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Drag and Drop Handlers
let draggedPiece = null;

function handleDragStart(event) {
  draggedPiece = this; // Enregistre la pièce que l'on déplace
}

function handleDragOver(event) {
  event.preventDefault(); // Permet de déposer la pièce
}

function handleDrop(event) {
  event.preventDefault();
  const targetPiece = this; // La pièce sur laquelle on lâche la pièce déplacée

  // Vérifie si les deux pièces existent
  if (!draggedPiece || !targetPiece) return;

  // Échange les indices des deux pièces
  const draggedIndex = draggedPiece.getAttribute('data-index');
  const targetIndex = targetPiece.getAttribute('data-index');

  // Échange visuel
  [draggedPiece.style.backgroundImage, targetPiece.style.backgroundImage] =
    [targetPiece.style.backgroundImage, draggedPiece.style.backgroundImage];

  // Met à jour les indices
  draggedPiece.setAttribute('data-index', targetIndex);
  targetPiece.setAttribute('data-index', draggedIndex);
}

// Initialisation
initializePuzzle();
