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

function isValidKingMove(positionFrom, positionTo) {
    const rowDifference = Math.abs(positionFrom.row - positionTo.row)
    const columnDifference = Math.abs(positionFrom.column - positionTo.column)
    return (rowDifference === 0 || rowDifference === 1) && (columnDifference === 0 || columnDifference === 1)
}
function isValidQueenMove(from, to) {
    return isValidBishopMove(from, to) || isValidRookMove(from, to)
}
function isValidPawnMove(positionFrom, positionTo) {
    const from = getIndex(positionFrom.row, positionFrom.column)
    const to = getIndex(positionTo.row, positionTo.column)
    const fieldFrom = table[from]

    const oneUpWhite = positionFrom.row - positionTo.row === 1 && fieldFrom.color === 'white'
    const oneUpBlack = positionTo.row - positionFrom.row === 1 && fieldFrom.color === 'black'
    const twoUpWhite = positionFrom.row - positionTo.row === 2 && fieldFrom.color === 'white' && positionFrom.row === 7
    const twoUpBlack = positionTo.row - positionFrom.row === 2 && fieldFrom.color === 'black' && positionFrom.row === 2

    const isSameColumn = positionFrom.column === positionTo.column
    const isOneFieldDiagonalUp = Math.abs(positionFrom.column - positionTo.column) === 1 && (oneUpWhite || oneUpBlack)
    if (isSameColumn) {
        return oneUpWhite || oneUpBlack || twoUpWhite || twoUpBlack
    } else if (isOneFieldDiagonalUp) {
        const isDifferentColor = table[to].color !== table[from].color
        const isFieldOccupied = table[to].piece
        return isFieldOccupied && isDifferentColor
    } else {
        return false
    }
}
function isValidRookMove(positionFrom, positionTo) {
    if (isPathAvailable(positionFrom, positionTo)) {
        return (positionFrom.row === positionTo.row && positionFrom.column !== positionTo.column)
            || (positionFrom.column === positionTo.column && positionTo.row !== positionTo.column)
    }
    return false
}
function isValidBishopMove(positionFrom, positionTo) {
    if (isPathAvailable(positionFrom, positionTo)) {
        return Math.abs(positionFrom.row - positionTo.row) === Math.abs(positionFrom.column - positionTo.column)
    }
    return false
}
function isValidKnightMove(positionFrom, positionTo) {
    return (
        Math.abs(positionFrom.row - positionTo.row) === 2
        && Math.abs(positionFrom.column - positionTo.column) === 1
        ||
        Math.abs(positionFrom.row - positionTo.row) === 1
        && Math.abs(positionFrom.column - positionTo.column) === 2
    )
}

function isPathAvailable(positionFrom, positionTo) {
    const isDiagonal = positionFrom.column !== positionTo.column && positionFrom.row !== positionTo.row
    if (isDiagonal) {

        let startRow = positionFrom.row
        let endRow = positionTo.row
        if (startRow > endRow) {
            startRow = positionTo.row
            endRow = positionFrom.row
        }
        let startColumn = positionFrom.column
        let endColumn = positionTo.column
        if (startColumn > endColumn) {
            startColumn = positionTo.column
            endColumn = positionFrom.column
        }

        for (let i = startRow + 1; i < endRow; i++) {
            for (let j = startColumn + 1; j < endColumn; j++) {
                const index = getIndex(i, j)
                if (table[index].piece) {
                    return false
                }
            }
        }
    } else {
        const isUpOrDown = positionFrom.column === positionTo.column
        if (isUpOrDown) {
            let start = positionFrom.row
            let end = positionTo.row
            if (start > end) {
                start = positionTo.row
                end = positionFrom.row
            }
            for (let i = start + 1; i < end; i++) {
                const index = getIndex(i, positionFrom.column)
                if (table[index].piece) {
                    return false
                }
            }
        } else {
            let start = positionFrom.column
            let end = positionTo.column
            if (start > end) {
                start = positionTo.column
                end = positionFrom.column
            }
            for (let i = start + 1; i < end; i++) {
                const index = getIndex(positionFrom.row, i)
                if (table[index].piece) {
                    return false
                }
            }
        }
    }

    return true
}

function getPosition(index) {
    return {
        row: Math.ceil(index / 8),
        column: index % 8 + 1
    }
}

function getIndex(row, column) {
    return (row - 1) * 8 + column - 1
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

        const positionFrom = getPosition(from)
        const positionTo = getPosition(to)
        if (fieldFrom.piece === 'knight') {
            const isValid = isValidKnightMove(positionFrom, positionTo)
            console.log(isValid)
            return isValid
        }
        if (fieldFrom.piece === 'bishop') {
            return isValidBishopMove(positionFrom, positionTo)
        }
        if (fieldFrom.piece === 'king') {
            return isValidKingMove(positionFrom, positionTo)
        }
        if (fieldFrom.piece === 'queen') {
            return isValidQueenMove(positionFrom, positionTo)
        }
        if (fieldFrom.piece === 'pawn') {
            return isValidPawnMove(positionFrom, positionTo)
        }
        if (fieldFrom.piece === 'rook') {
            return isValidRookMove(positionFrom, positionTo)
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
            // generateAvailableMoves(selected.from.piece, selected.from)
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

function generateErrorMessage(msg) {
    alert(msg)
}
