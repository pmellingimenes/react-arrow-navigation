import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Example1 from './example1'
import Example2 from './example2'
import Example3 from './example3'

const App = () => (
    <>
        <Example1 />
        <Example2 />
        <Example3 />
    </>
)

ReactDOM.render(<App />, document.getElementById('root'))
