import React, { createContext, useReducer, useEffect } from 'react'
import { baseArrowNavigationreducer } from './reducers'
import { useKey } from './helpers'

export const BaseArrowNavigationContext = createContext({
    xIndex: undefined,
    yIndex: undefined,
    registerChild: undefined,
})

function BaseArrowNavigation({
    children,
    initialIndex = [undefined, undefined],
    mode = 'roundTheWorld',
    active = true,
    reInitOnDeactivate = false,
}) {
    const initialXIndex = initialIndex[0]
    const initialYIndex = initialIndex[1]
    const [{ xIndex, yIndex }, dispatch] = useReducer(baseArrowNavigationreducer, {
        xIndex: initialXIndex,
        yIndex: initialYIndex,
        initialXIndex,
        initialYIndex,
        matrix: [],
        mode,
    })

    useEffect(() => {
        if (reInitOnDeactivate && !active) {
            dispatch({ type: 'resetIndexes' })
        }
    }, [active, dispatch, reInitOnDeactivate, initialXIndex, initialYIndex])

    useKey('ArrowLeft', () => active && dispatch({ type: 'updateXIndex', payload: { delta: -1 } }))
    useKey('ArrowRight', () => active && dispatch({ type: 'updateXIndex', payload: { delta: 1 } }))
    useKey('ArrowUp', () => active && dispatch({ type: 'updateYIndex', payload: { delta: -1 } }))
    useKey('ArrowDown', () => active && dispatch({ type: 'updateYIndex', payload: { delta: 1 } }))

    useKey('Left', () => active && dispatch({ type: 'updateXIndex', payload: { delta: -1 } }))
    useKey('Right', () => active && dispatch({ type: 'updateXIndex', payload: { delta: 1 } }))
    useKey('Up', () => active && dispatch({ type: 'updateYIndex', payload: { delta: -1 } }))
    useKey('Down', () => active && dispatch({ type: 'updateYIndex', payload: { delta: 1 } }))

    const contextValue = { xIndex, yIndex, active, dispatch }
    return (
        <BaseArrowNavigationContext.Provider value={contextValue}>
            {children}
        </BaseArrowNavigationContext.Provider>
    )
}

export default BaseArrowNavigation
