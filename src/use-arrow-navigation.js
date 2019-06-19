import { useContext, useEffect } from 'react'
import { BaseArrowNavigationContext } from './base-arrow-navigation'

export default function useArrowNavigation(x, y = 0) {
    const { xIndex, yIndex, active, dispatch } = useContext(BaseArrowNavigationContext)

    useEffect(() => {
        dispatch({ type: 'registerChild', payload: { x, y } })

        return () => {
            dispatch({ type: 'deRegisterChild', payload: { x, y } })
        }
    }, [x, y, dispatch])

    const selected = x === xIndex && y === yIndex
    return { selected, active }
}
