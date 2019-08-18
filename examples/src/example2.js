import React from 'react'
import { ArrowNavigation, useArrowNavigation } from 'react-arrow-navigation'

const ButtonGroupButton = ({ xIndex }) => {
    const { selected, select } = useArrowNavigation(xIndex, 0)
    return (
        <div
            className={selected ? 'bg-button selected' : 'bg-button'}
            onClick={() => {
                // Click handler logic goes here
                select() // Then call the `select` callback
            }}
        >
            {`Option ${xIndex + 1}`}
        </div>
    )
}

const Example2 = () => (
    <div className="example-container">
        <h2>Example 2</h2>
        <p>Focus the button group, then you can navigate through the buttons with arrow keys:</p>
        <div className="button-group-container">
            <ArrowNavigation className="button-group">
                <ButtonGroupButton xIndex={0} />
                <ButtonGroupButton xIndex={1} />
                <ButtonGroupButton xIndex={2} />
            </ArrowNavigation>
        </div>
    </div>
)

export default Example2
