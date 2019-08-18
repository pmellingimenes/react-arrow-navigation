import React, { useState, useRef, useEffect } from 'react'
import { ArrowNavigation, useArrowNavigationWithFocusState } from 'react-arrow-navigation'

const DropdownMenuItem = ({ index, label, closeMenu }) => {
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
                alert(`Clicked: "${label}"`)
                closeMenu()
            }}
        >
            {label}
        </button>
    )
}

const DropdownMenu = ({ label, itemLabels }) => {
    const [open, setOpen] = useState(false)
    const navRef = useRef()

    useEffect(() => {
        if (open) {
            navRef.current && navRef.current.focus()
        }
    }, [open])

    return (
        <div className="dropdown">
            <button
                className="dropdown-button"
                onClick={() => {
                    setOpen(!open)
                    navRef.current && navRef.current.focus()
                }}
            >
                {open ? 'Close the menu ⤴' : 'Open the menu ⤵'}
            </button>
            {open && (
                <ArrowNavigation className="menu" ref={navRef} initialIndex={[0, 0]}>
                    {itemLabels.map((itemLabel, index) => (
                        <DropdownMenuItem
                            index={index}
                            label={itemLabel}
                            closeMenu={() => setOpen(false)}
                            key={index}
                        />
                    ))}
                </ArrowNavigation>
            )}
        </div>
    )
}

const Example3 = () => (
    <div className="example-container">
        <h2>Example 3</h2>
        <DropdownMenu itemLabels={['Navigate through', 'The menu items', 'With arrow keys']} />
        <p>
            One final thing to implement here would be to close the dropdown menu when the escape
            key is pressed. Currently the ArrowNavigation component loses focus, so it would make
            sense to sync the dropdown open state with that.
        </p>
    </div>
)

export default Example3
