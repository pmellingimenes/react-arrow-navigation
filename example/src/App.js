import React from 'react'
import './app.css'
import DropdownMenu from './dropdown-menu'

function App() {
    return (
        <div className="app">
            <DropdownMenu
                labels={['now you can', 'navigate through', 'the menu items', 'with arrow keys']}
            />
        </div>
    )
}

export default App
