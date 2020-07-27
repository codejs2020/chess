const pieces = {
  pawn: { black: '♟', white: '♙' },
  rook: { black: '♜', white: '♖' },
  knight: { black: '♞', white: '♘' },
  bishop: { black: '♝', white: '♗' },
  queen: { black: '♛', white: '♕' },
  king: { black: '♚', white: '♔' },
};
 const table = fenToPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  // table = fenToPosition('bnbqkbnr/8/4p3/8/8/8/8/RNBQKBNR w KQkq - 0 1'),
let  selected = { from: -1, to: -1 }
 const moves = []
 let isWhiteMove = true



function fenToPosition(fen) {
  let tmp = [];
  fen = fen.replace(/\//g, '').split(' ')[0].split('');
  for (let i = 0; i < fen.length; i++) {
    if (fen[i] > 0) {
      for (let j = 0; j < fen[i]; j++) {
        tmp.push({});
      }
    } else {
      let pairs = { p: 'pawn', r: 'rook', n: 'knight', b: 'bishop', q: 'queen', k: 'king' };
      let color = /[A-Z]/.test(fen[i]) ? 'white' : 'black'; // /[RNBQK]/
      let piece = '';
      for (let p in pairs) {
        if (fen[i].toLowerCase() === p) {
          piece = fen[i].replace(fen[i], pairs[p]);
        }
      }

      tmp.push({ color: color, piece: piece })
    }
  }
  return tmp;
}
