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
            if(i%2===1)fieldColor = index % 2 ? 'white' : 'black'
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
    return false
}
function isValidQueenMove(from, to) {
    return true
}
function isValidPawnMove(from, to) {
    return false
}
function isValidRookMove(from, to) {
    return false
}
function isValidBishopMove(from, to) {
    return false
}
function isValidKnightMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)
    return (
        Math.abs(positionFrom.row - positionTo.row) === 2
        && Math.abs(positionFrom.column - positionTo.column) === 1
            ||
        Math.abs(positionFrom.row - positionTo.row) === 1
        && Math.abs(positionFrom.column - positionTo.column) === 2 
    )
}


function getPosition(index) {
    return {
        row: Math.ceil(index/8),
        column: index % 8 +1
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
            return isValidPawnMove(from, to)
        }
        if (fieldFrom.piece === 'rook') {
            return isValidRookMove(from, to)
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
