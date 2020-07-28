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
    if(isWhiteMove) generateInfoMessage("White player move") 
    else generateInfoMessage("Black player move")
}

function generateInfoMessage(message){
    document.getElementById('info').textContent = message
}
function generateErrorMessage(message){
    document.getElementById('errors').textContent = message
    setTimeout(() => document.getElementById('errors').textContent = '', 1000)
}
function generateAvailableMoves(piece,from){
    let availableMoves = []
    const positionFrom = getPosition(from)
    if (piece==='pawn'){
        for(position in table){
            if (isValidPawnMove(positionFrom,position)){
                availableMoves.push(position)
            }
        }
    }
    console.log(availableMoves)
}

function isCheck() {
    return false // todo 
}

function isValidKingMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)
    const rowDifference = Math.abs(positionFrom.row - positionTo.row)
    const columnDifference = Math.abs(positionFrom.column - positionTo.column)
    return (
        (rowDifference === 0 || rowDifference === 1) && (columnDifference === 0 || columnDifference === 1)
    )
}
function isValidQueenMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)
    const rockMove = positionFrom.row === positionTo.row || positionFrom.column === positionTo.column;
    const bishopMove = Math.abs(positionFrom.row - positionTo.row ) === Math.abs(positionFrom.column - positionTo.column)
    return (
        rockMove || bishopMove
    )
}
function isValidPawnMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)
    const fieldFrom = table[from]

    const oneUpWhite = (positionFrom.row - positionTo.row === 1 && fieldFrom.color === 'white' && positionFrom.column - positionTo.column === 0)
    const oneUpBlack = (positionTo.row - positionFrom.row === 1 && fieldFrom.color === 'black' && positionFrom.column - positionTo.column === 0)
    const twoUpWhite = (positionFrom.row - positionTo.row === 2 && fieldFrom.color === 'white' && positionFrom.row === 7)
    const twoUpBlack = (positionTo.row - positionFrom.row === 2 && fieldFrom.color === 'black' && positionFrom.row === 2)

    return (
        oneUpWhite || oneUpBlack || twoUpWhite || twoUpBlack
    )
}
function isValidRookMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)
    return (
        (positionFrom.row === positionTo.row && positionFrom.column !== positionTo.column) || (positionFrom.column === positionTo.column && positionTo.row !== positionTo.column)
    )
}
function isValidBishopMove(from, to) {
    const positionFrom = getPosition(from)
    const positionTo = getPosition(to)
    return (
        Math.abs(positionFrom.row - positionTo.row ) === Math.abs(positionFrom.column - positionTo.column)
    )
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
            generateAvailableMoves(selected.from.piece,selected.from)
            if (isValidMove(selected.from, index)) {
                table[index] = table[selected.from]
                table[selected.from] = {}
                selected = { from: -1, to: -1 }
                isWhiteMove = !isWhiteMove
                generateTable(table)
                
            } else {
                generateErrorMessage("INVALID MOVE")
            }
        }
    }
}
