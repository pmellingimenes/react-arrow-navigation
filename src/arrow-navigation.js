import React, { createContext, useReducer, useRef } from 'react'
import BaseArrowNavigation from './base-arrow-navigation'
import { arrowNavigationReducer } from './reducers'
import { useKey } from './helpers'

export const ArrowNavigationContext = createContext({ dispatch: undefined })

function ArrowNavigation({
    children,
    initialIndex = [undefined, undefined],
    mode = 'roundTheWorld',
    reInitOnDeactivate = false,
    ...divProps
}) {
    const [{ active, childTabIndex }, dispatch] = useReducer(arrowNavigationReducer, {
        active: false,
        childTabIndex: undefined,
        reInitOnDeactivate: reInitOnDeactivate,
    })

    const containerRef = useRef()
    useKey('Escape', () => {
        childTabIndex
            ? dispatch({ type: 'deactivate' })
            : containerRef.current && containerRef.current.blur()
    })

    return (
        <div
            {...divProps}
            tabIndex={childTabIndex ? undefined : 0}
            ref={containerRef}
            onFocus={() => dispatch({ type: 'activate' })}
            onBlur={() => dispatch({ type: 'deactivate' })}
        >
            <ArrowNavigationContext.Provider value={dispatch}>
                <BaseArrowNavigation
                    active={active}
                    initialIndex={initialIndex}
                    mode={mode}
                    reInitOnDeactivate={reInitOnDeactivate}
                >
                    {children}
                </BaseArrowNavigation>
            </ArrowNavigationContext.Provider>
        </div>
    )
}

export default ArrowNavigation
