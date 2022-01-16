export default function player() {
  const computerPlay = (board) => {
    let play = Math.floor(Math.random() * 100);
    while (board.boardArray[play] === 'H' || board.boardArray[play] === 'M') {
      play = Math.floor(Math.random() * 100);
    }
    return play;
  };

  const humanPlay = (e) => parseInt(e.target.dataset.index);

  return { computerPlay, humanPlay };
}

// module.exports = player;
