import { findNextXIndex, findNextYIndex } from './helpers'

export function baseArrowNavigationreducer(state, { type, payload }) {
    const { xIndex, yIndex, initialXIndex, initialYIndex, matrix, mode } = state
    function initializeSelectedIndex(xDelta, yDelta) {
        if (!matrix.length) {
            return state
        }

        if (xDelta === 1 || yDelta === 1) {
            if (matrix[0] && matrix[0][0]) {
                return {
                    ...state,
                    xIndex: 0,
                    yIndex: 0,
                }
            }

            return xDelta === 1
                ? {
                      ...state,
                      ...findNextXIndex(0, 0, 1, matrix, 'continuous'),
                  }
                : {
                      ...state,
                      ...findNextYIndex(0, 0, 1, matrix, 'continuous'),
                  }
        }

        if (xDelta === -1) {
            return matrix[0]
                ? { ...state, xIndex: matrix[0].length - 1, yIndex: 0 }
                : {
                      ...state,
                      ...findNextXIndex(0, 0, -1, 'continuous'),
                  }
        }

        if (yDelta === -1) {
            return matrix[matrix.length - 1][0]
                ? { ...state, xIndex: 0, yIndex: matrix.length - 1 }
                : {
                      ...state,
                      ...findNextYIndex(0, matrix.length - 1, -1, 'continuous'),
                  }
        }
    }

    switch (type) {
        case 'registerChild': {
            const { x, y } = payload
            if (!matrix[y]) matrix[y] = []
            matrix[y][x] = true

            return { ...state, matrix }
        }
        case 'deRegisterChild': {
            const { x, y } = payload

            // Remove the child from the matrix
            const row = matrix[y]
            delete row[x]
            // If we removed a child that was at the end of the row, remove all empty elements
            // up to the next child
            const newRow = [...row.slice(0, row.lastIndexOf(true) + 1)]
            newRow.length ? (matrix[y] = newRow) : delete matrix[y]

            // Reset the current index if it pointed to this child
            const indicies = x === xIndex &&
                y === yIndex && { xIndex: initialXIndex, yIndex: initialYIndex }

            return { ...state, ...indicies, matrix }
        }
        case 'updateXIndex':
            return xIndex === undefined && yIndex === undefined
                ? initializeSelectedIndex(payload.delta, undefined)
                : {
                      ...state,
                      ...findNextXIndex(xIndex, yIndex, payload.delta, matrix, mode),
                  }
        case 'updateYIndex':
            return xIndex === undefined && yIndex === undefined
                ? initializeSelectedIndex(undefined, payload.delta)
                : {
                      ...state,
                      ...findNextYIndex(xIndex, yIndex, payload.delta, matrix, mode),
                  }
        case 'resetIndicies':
            return { ...state, xIndex: initialXIndex, yIndex: initialYIndex }

        // to do: use invariant or equivalent here
        default:
            console.log(`${payload.type} does not exist`)
    }
}

export function arrowNavigationReducer(state, { type, payload }) {
    switch (type) {
        case 'activate':
            return { ...state, active: true }
        case 'deactivate':
            return {
                ...state,
                active: false,
                childTabIndex: state.reInitOnDeactivate ? undefined : state.childTabIndex,
            }
        case 'setChildTabIndex': {
            const { x, y } = payload
            return { ...state, childTabIndex: { x, y } }
        }
        case 'unsetChildTabIndex': {
            const { x, y } = payload
            const { x: currentX, y: currentY } = state.childTabIndex || {}
            return {
                ...state,
                childTabIndex: x === currentX && y === currentY ? undefined : state.childTabIndex,
            }
        }
        // to do: use invariant or equivalent here
        default:
            console.log(`${payload.type} does not exist`)
    }
}
