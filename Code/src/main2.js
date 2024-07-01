let legalSquares = [];
let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

setupBoardSquares();
setupPieces();

function setupBoardSquares() {
    for (let i = 0; i < boardSquares.length; i++) {
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);

        let row = 8 - Math.floor(i / 8);
        let column = String.fromCharCode(97 + (i % 8));
        let square = boardSquares[i];

        square.id = column + row;
    }
}

function setupPieces() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }

    for (let i = 0; i < piecesImages.length; i++) {
        piecesImages[i].setAttribute("draggable", false);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const piece = ev.target;
    const pieceColor = piece.getAttribute("color");
    if ((isWhiteTurn && pieceColor == "white") || (!isWhiteTurn && pieceColor == "black")) {
        ev.dataTransfer.setData("text", piece.id);
    }
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSquare = ev.currentTarget;
    
    // Check if the move is legal (this part can be expanded for full chess rules)
    if (isLegalMove(piece, destinationSquare)) {
        if (destinationSquare.firstChild) {
            destinationSquare.removeChild(destinationSquare.firstChild); // Remove the captured piece
        }
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
    }
}

function isSquareOccupied(square) {
    return square.querySelector(".piece") ? true : false;
}

function isLegalMove(piece, destinationSquare) {
    // For simplicity, this example allows any piece to move to any empty square
    // or capture an opponent's piece. You can expand this to include real chess rules.
    const pieceColor = piece.getAttribute("color");
    const destinationPiece = destinationSquare.querySelector(".piece");

    if (destinationPiece) {
        const destinationColor = destinationPiece.getAttribute("color");
        if (pieceColor === destinationColor) {
            return false; // Cannot capture your own piece
        }
    }
    return true;
}