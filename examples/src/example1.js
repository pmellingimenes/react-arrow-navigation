import React from 'react'
import { ArrowNavigation, useArrowNavigation } from 'react-arrow-navigation'

const NavigationChild = ({ xIndex, yIndex }) => {
    const { selected, active } = useArrowNavigation(xIndex, yIndex)
    return (
        <div className={selected && active ? 'child selected' : 'child'}>
            {`Index [${xIndex}, ${yIndex}]`}
        </div>
    )
}

const Example1 = () => (
    <div className="example-container">
        <h2>Example 1</h2>
        <ArrowNavigation className="nav">
            <p>Focus me then you can navigate through these components with arrow keys:</p>
            <NavigationChild xIndex={0} yIndex={0} />
            <NavigationChild xIndex={0} yIndex={1} />
            <NavigationChild xIndex={0} yIndex={2} />
        </ArrowNavigation>
    </div>
)

export default Example1
