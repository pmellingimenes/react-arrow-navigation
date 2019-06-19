import { useEffect, useRef } from 'react'

export function useKey(key, handler) {
    // Store the handler in a ref so we don't have to memoize it during usage
    const savedHandler = useRef(null)
    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        window.addEventListener('keydown', event => {
            if (event.code === key && savedHandler.current) {
                savedHandler.current(event)
            }
        })
    }, [key])
}

function modulo(x, y) {
    return ((x % y) + y) % y
}

function findBoundedXIndex(xIndex, yIndex, delta, matrix) {
    const xLength = matrix[yIndex].length
    let newXIndex = xIndex + delta

    const iterations = Math.sign(delta) === -1 ? newXIndex + 1 : xLength - newXIndex
    for (let i = 0; i < iterations; i++) {
        if (matrix[yIndex][newXIndex]) {
            return { xIndex: newXIndex, yIndex }
        }

        newXIndex = newXIndex + delta
    }

    return { xIndex, yIndex }
}

function findContinuousXIndex(xIndex, yIndex, delta, matrix) {
    const deltaIsNegative = Math.sign(delta) === -1
    const yLength = matrix.length
    let newYIndex = yIndex

    for (let i = 0; i < yLength + 1; i++) {
        if (!matrix[newYIndex]) continue

        const xLength = matrix[newYIndex].length
        let newXIndex = i === 0 ? xIndex + delta : deltaIsNegative ? xLength - 1 : 0

        for (let j = 0; j < xLength; j++) {
            if (matrix[newYIndex][newXIndex]) {
                return { xIndex: newXIndex, yIndex: newYIndex }
            }

            if (
                (newXIndex >= xLength - 1 && !deltaIsNegative) ||
                (newXIndex === 0 && deltaIsNegative)
            ) {
                break
            }
            newXIndex = newXIndex + delta
        }

        newYIndex = modulo(newYIndex + delta, yLength)
    }

    return { xIndex, yIndex }
}

function findRoundTheWorldXIndex(xIndex, yIndex, delta, matrix) {
    const xLength = matrix[yIndex].length
    let newXIndex = modulo(xIndex + delta, xLength)

    for (let i = 0; i < xLength - 1; i++) {
        if (matrix[yIndex][newXIndex]) {
            return { xIndex: newXIndex, yIndex }
        }

        newXIndex = modulo(newXIndex + delta, xLength)
    }

    return { xIndex, yIndex }
}
export function findNextXIndex(xIndex, yIndex, delta, matrix, mode) {
    switch (mode) {
        case 'bounded':
            return findBoundedXIndex(xIndex, yIndex, delta, matrix)
        case 'continuous':
            return findContinuousXIndex(xIndex, yIndex, delta, matrix)
        default:
            return findRoundTheWorldXIndex(xIndex, yIndex, delta, matrix)
    }
}

function findBoundedYIndex(xIndex, yIndex, delta, matrix) {
    const yLength = matrix.length
    let newYIndex = yIndex + delta

    const iterations = Math.sign(delta) === -1 ? newYIndex + 1 : yLength - newYIndex
    for (let i = 0; i < iterations; i++) {
        if (matrix[newYIndex] && matrix[newYIndex][xIndex]) {
            return { xIndex, yIndex: newYIndex }
        }

        newYIndex = newYIndex + delta
    }

    return { xIndex, yIndex }
}

function getMaxXLength(matrix) {
    let xLength = 0
    matrix.forEach(xArray => {
        if (xArray && xArray.length > xLength) {
            xLength = xArray.length
        }
    })

    return xLength
}

function findContinuousYIndex(xIndex, yIndex, delta, matrix) {
    const deltaIsNegative = Math.sign(delta) === -1
    const xLength = getMaxXLength(matrix)
    const yLength = matrix.length
    let newXIndex = xIndex

    for (let i = 0; i < xLength + 1; i++) {
        let newYIndex = i === 0 ? yIndex + delta : deltaIsNegative ? yLength - 1 : 0

        for (let j = 0; j < yLength; j++) {
            if (matrix[newYIndex] && matrix[newYIndex][newXIndex]) {
                return { xIndex: newXIndex, yIndex: newYIndex }
            }

            if (
                (newYIndex >= yLength - 1 && !deltaIsNegative) ||
                (newYIndex === 0 && deltaIsNegative)
            ) {
                break
            }
            newYIndex = newYIndex + delta
        }

        newXIndex = modulo(newXIndex + delta, xLength)
    }

    return { xIndex, yIndex }
}
function findRoundTheWorldYIndex(xIndex, yIndex, delta, matrix) {
    const yLength = matrix.length
    let newYIndex = modulo(yIndex + delta, yLength)

    for (let i = 0; i < yLength - 1; i++) {
        if (matrix[newYIndex] && matrix[newYIndex][xIndex]) {
            return { xIndex, yIndex: newYIndex }
        }

        newYIndex = modulo(newYIndex + delta, yLength)
    }

    return { xIndex, yIndex }
}

export function findNextYIndex(xIndex, yIndex, delta, matrix, mode) {
    switch (mode) {
        case 'bounded':
            return findBoundedYIndex(xIndex, yIndex, delta, matrix)
        case 'continuous':
            return findContinuousYIndex(xIndex, yIndex, delta, matrix)
        default:
            return findRoundTheWorldYIndex(xIndex, yIndex, delta, matrix)
    }
}
