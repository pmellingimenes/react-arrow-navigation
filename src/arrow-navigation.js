import React, { createContext, useReducer, useRef } from 'react'
import BaseArrowNavigation from './base-arrow-navigation'
import { arrowNavigationReducer } from './reducers'
import { useKey } from './helpers'

export const ArrowNavigationContext = createContext({ dispatch: undefined })

const ArrowNavigation = React.forwardRef(
    (
        {
            children,
            initialIndex = [undefined, undefined],
            mode = 'roundTheWorld',
            reInitOnDeactivate = false,
            ...divProps
        },
        providedRef
    ) => {
        const [{ active, childTabIndex }, dispatch] = useReducer(arrowNavigationReducer, {
            active: false,
            childTabIndex: undefined,
            reInitOnDeactivate: reInitOnDeactivate,
        })

        const containerRef = useRef()
        const ref = providedRef || containerRef

        useKey('Escape', () => {
            childTabIndex ? dispatch({ type: 'deactivate' }) : ref.current && ref.current.blur()
        })

        return (
            <div
                {...divProps}
                tabIndex={childTabIndex ? undefined : 0}
                ref={ref}
                onFocus={() => dispatch({ type: 'activate' })}
                onBlur={e => {
                    if (
                        ref.current &&
                        e.relatedTarget !== null &&
                        !ref.current.contains(e.relatedTarget)
                    ) {
                        dispatch({ type: 'deactivate' })
                    }
                }}
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
)

export default ArrowNavigation
