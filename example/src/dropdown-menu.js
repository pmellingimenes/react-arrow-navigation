import React, { useState, useRef, useEffect } from 'react'

import { ArrowNavigation } from 'react-arrow-navigation'
import DropdownMenuItem from './dropdown-menu-item'

function DropdownMenu({ labels }) {
    const [open, setOpen] = useState(false)
    const navRef = useRef()

    useEffect(() => {
        if (open) {
            navRef.current && navRef.current.focus()
        }
    }, [open])

    return (
        <div className="dropdown-container">
            <button
                onClick={() => {
                    setOpen(!open)
                    navRef.current && navRef.current.focus()
                }}
            >
                Click me
            </button>
            {open && (
                <ArrowNavigation
                    style={{ display: 'flex', flexDirection: 'column' }}
                    ref={navRef}
                    className="menu"
                >
                    {labels.map((label, index) => (
                        <DropdownMenuItem
                            index={index}
                            label={label}
                            closeMenu={() => setOpen(false)}
                            key={index}
                        />
                    ))}
                </ArrowNavigation>
            )}
        </div>
    )
}

export default DropdownMenu
