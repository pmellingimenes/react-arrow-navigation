# react-arrow-navigation

A library to manage arrow navigation. Mount `ArrowNavigation` in your app, and then add navigation children using the
`useArrowNavigation` hook:

```
// app.js
import { ArrowNavigation, useArrowNavigation } from 'react-arrow-navigation'
import NavChild from './nav-child'

const MyApp = () => (
    <ArrowNavigation>
        <NavChild navIndex={[0, 0]} />
        <NavChild navIndex={[0, 1]} />
        <NavChild navIndex={[0, 2]} />
    </ArrowNavigation>
)
```

```
// nav-child.js
const NavChild = ({ navIndex }) => {
    const { selected, active } = useArrowNavigation(navIndex[0], navIndex[1])
    return (
        <div className={selected && active ? 'selectedChild' : 'child'}>Navigation child</div>
    )
}
```

The `useArrowNavigation` hook returns two values: `selected` and `active` that you can then use to style or change the
state of the navigation child. `selected` is whether the child is currently selected, and `active` is whether the
`ArrowNavigation` component is currently focused and responding to keypresses.

`useArrowNavigation` receives its
