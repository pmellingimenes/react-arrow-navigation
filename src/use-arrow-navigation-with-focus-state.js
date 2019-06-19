import { useRef, useContext, useEffect } from 'react'
import useArrowNavigation from './use-arrow-navigation'
import { ArrowNavigationContext } from './'

export default function useArrowNavigationWithFocusState(x, y) {
    const { selected, active } = useArrowNavigation(x, y)
    const dispatch = useContext(ArrowNavigationContext)
    const ref = useRef()

    useEffect(() => {
        selected
            ? dispatch({ type: 'setChildTabIndex', payload: { x, y } })
            : dispatch({ type: 'unsetChildTabIndex', payload: { x, y } })

        if (selected && active && document.activeElement !== ref.current) {
            ref.current && ref.current.focus()
        }

        if (!(selected && active) && document.activeElement === ref.current) {
            ref.current && ref.current.blur()
        }

        return () => {
            dispatch({ type: 'unsetChildTabIndex', payload: { x, y } })
        }
    }, [x, y, selected, active, dispatch])

    const focusProps = { ref, tabIndex: selected ? 0 : undefined }
    return { selected, active, focusProps }
}
