import React from 'react'
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation'

function DropdownMenuItem({ index, label, closeMenu }) {
    const {
        focusProps: { ref, tabIndex, onClick },
    } = useArrowNavigationWithFocusState(0, index)

    return (
        <button
            className="menu-item"
            ref={ref}
            tabIndex={tabIndex}
            onClick={() => {
                onClick()
                alert(`Clicked: "${label}"`) // eslint-disable-line
                closeMenu()
            }}
        >
            {label}
        </button>
    )
}

export default DropdownMenuItem
