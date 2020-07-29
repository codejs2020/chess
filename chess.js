console.log(table)
generateTable(table)

function generateTable(fields) {
    let html = '<table>'
    let index = 0
    for (let i = 0; i < 8; i++) {
        html += '<tr>'
        for (let j = 0; j < 8; j++) {
            const field = fields[index]
            const piece = field.piece
            const color = field.color
            let fieldColor = index % 2 ? 'black' : 'white'
            if (i % 2 === 1) fieldColor = index % 2 ? 'white' : 'black'
            html += `<td data-index='${index}' class='${fieldColor}'>${piece ? pieces[piece][color] : ''}</td>`
            ++index
        }
        html += '</tr>'
    }
    html += '</table>'

    document.getElementById('table').innerHTML = html
}

function isCheck() {
    return false // todo
}

function isValidKingMove(from, to) {
  const positionFrom = getPosition(from)
  const positionTo = getPosition(to)

  let rowMove = Math.abs(positionFrom.row - positionTo.row)
  let collumnMove = Math.abs(positionFrom.column - positionTo.column)
  if(positionFrom.row === positionTo.row || positionFrom.column === positionTo.column){
    return (rowMove === 1 || collumnMove === 1 )
  }
  if(positionFrom.row !== positionTo.row || positionFrom.column !== positionTo.column){
    return (rowMove === 1 && collumnMove === 1 )
  }
}
function isValidQueenMove(from, to) {
    return true
}

function isValidPawnMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)


    let rowMove = Math.abs(positionFrom.row - positionTo.row)
    let collumnMove = Math.abs(positionFrom.column - positionTo.column)

    let pawnMove = rowMove === 1 && collumnMove === 0
    let oppeningPawnMove = rowMove === 2 && collumnMove === 0

    if(positionFrom.row > positionTo.row) {
      if(table[to].piece){
        return  rowMove === 1 && collumnMove === 1
      }
        if (positionFrom.row === 7 || positionFrom.row === 2) {
            return oppeningPawnMove || pawnMove

        } else {
            return pawnMove
        }
    }

}

function isValidRookMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)

    let rowMove = Math.abs(positionFrom.row - positionTo.row)
    let collumnMove = Math.abs(positionFrom.column - positionTo.column)
    if(positionFrom.column === positionTo.column){
        return rowMove
    }
     if(positionFrom.row === positionTo.row){
        return collumnMove
    }

}

    function isValidBishopMove(from, to) {
      const positionFrom = getPosition(from)
      const positionTo = getPosition(to)

      let rowMove = Math.abs(positionFrom.row - positionTo.row)
      let collumnMove = Math.abs(positionFrom.column - positionTo.column)

      if(positionFrom.row !== positionTo.row && positionFrom.column !== positionTo.column){
        return (rowMove && collumnMove)
      }
    }

    function isValidKnightMove(from, to) {
        const positionFrom = getPosition(from)
        const positionTo = getPosition(to)


        let rowMove = Math.abs(positionFrom.row - positionTo.row)
        let collumnMove = Math.abs(positionFrom.column - positionTo.column)
        return (
            rowMove === 2 && collumnMove === 1 || rowMove === 1 && collumnMove === 2
        )
    }


    function getPosition(index) {
        return {
            row: Math.ceil(index / 8),
            column: index % 8 + 1
        }

    }


    function isValidMove(from, to) {
        let isValid = false
        const fieldFrom = table[from]
        const fieldTo = table[to]

        if (fieldFrom.piece) {
            const piece = fieldFrom.piece
            const color = fieldFrom.color

            if (fieldFrom.color === fieldTo.color) {
                return false
            }

            if (fieldFrom.piece === 'knight') {
                const isValid = isValidKnightMove(from, to)
                console.log(isValid)
                return isValid
            }
            if (fieldFrom.piece === 'bishop') {
                return isValidBishopMove(from, to)
            }
            if (fieldFrom.piece === 'king') {
                return isValidKingMove(from, to)
            }
            if (fieldFrom.piece === 'queen') {
                return isValidQueenMove(from, to)
            }
            if (fieldFrom.piece === 'pawn') {
                const isValid = isValidPawnMove(from, to)
                console.log(isValid)
                return isValid
            }
            if (fieldFrom.piece === 'rook') {
                const isValid = isValidRookMove(from, to)
                console.log(isValid)
                return isValid
            }

            if (isCheck()) {

            }

        } else {
            return false
        }

        return isValid
    }


    document.getElementById('table').addEventListener('click', tableClick)

    function tableClick(event) {
        if (event.target.tagName === 'TD') {
            const index = event.target.dataset.index
            console.log(index, selected)
            if (selected.from === -1) {
                selected.from = index
            } else { // table
                if (isValidMove(selected.from, index)) {
                    table[index] = table[selected.from]
                    table[selected.from] = {}
                    selected = { from: -1, to: -1 }
                    generateTable(table)
                    isWhiteMove = !isWhiteMove
                } else {

                }
            }
        }
    }
