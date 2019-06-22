# react-arrow-navigation

> A react library for managing navigation with arrow keys

## Install

```bash
npm install --save react-arrow-navigation
```

## Usage

Mount `ArrowNavigation` in your app, and then add navigation children with the `useArrowNavigation` hook:

```jsx
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

```jsx
// nav-child.js
import { useArrowNavigation } from 'react-arrow-navigation'

const NavChild = ({ navIndex }) => {
    const { selected, active } = useArrowNavigation(navIndex[0], navIndex[1])
    return <div className={selected && active ? 'child selected' : 'child'}>Nav child</div>
}
```

The `useArrowNavigation` hook returns values `selected` and `active` that you can then use to style or change the
state of the navigation child.

`selected` is whether the child is currently selected, and `active` is whether the
`ArrowNavigation` component is currently responding to keypresses. It also returns a `select` callback you can use
to select the current navigation child e.g. to update the selected index on click.

`useArrowNavigation` communicates with `ArrowNavigation` using the context API, so navigation children can be
arbitrarily nested.

`ArrowNavigation` returns a div that toggles the active prop using it's `onFocus` and `onBlur` events. You can also
pass in additional props that are spread onto the div, including a ref:

```jsx
import { useState, useRef, useEffect } from 'react'
import { ArrowNavigation, useArrowNavigation } from 'react-arrow-navigation'
import NavChild from './nav-child'

const MyApp = () => {
    const [open, setOpen] = useState(false)
    const navRef = useRef()

    useEffect(() => {
        if (open) {
            navRef.current && navRef.current.focus()
        }
    }, [open])

    return (
        <div>
            <button onClick={() => setOpen(!open)}>Click me</button>
            {open && (
                <ArrowNavigation style={{ display: 'flex', flexDirection: 'column' }} ref={navRef}>
                    <NavChild navIndex={[0, 0]} />
                    <NavChild navIndex={[1, 0]} />
                    <NavChild navIndex={[2, 0]} />
                </ArrowNavigation>
            )}
        </div>
    )
}
```

To manage the active state yourself, use [`BaseArrowNavigation`](#BaseArrowNavigation).

For cases where you want navigation child to be focused when it is selected, there is another hook:
`useArrowNavigationWithFocusState`. It returns a `focusProps` prop which you spread onto the navigation child.
It sets the tabIndex, focuses the element when it is selected, and moves the navigation selection to the child when
it is clicked:

```jsx
// nav-child.js
import { useArrowNavigationWithFocusState } from 'react-arrow-navigation'

const NavChild = ({ navIndex }) => {
    const { selected, active } = useArrowNavigationWithFocusState(navIndex[0], navIndex[1])
    return (
        <div className={selected && active ? 'child selected' : 'child'} {...focusProps}>
            Nav child
        </div>
    )
}
```

## API

### ArrowNavigation

`ArrowNavigation` manages the selection state of the navigation children, and the active state of the component
based on whether it is focused. It accepts the following props:

##### `children`

Any React node.

##### `initialIndex`: `[number, number]` (optional)

An index that will be selected when the `ArrowNavigation` component is first focused.

##### `mode`: `'roundTheWorld' | 'continuous' | 'bounded'` (optional)

The edge mode of the navigation: what happens when a user goes over the edges of the child indexes. The options
are:

1. `'roundTheWorld'` (this is the default)

![round the world edge mode diagram](./round-the-world.png)

2. `'continuous'`

![continuous edge mode diagram](./continuous.png)

3. `'bounded'`

![bounded edge mode diagram](./bounded.png)

##### `reInitOnDeactivate`: `true | false` (optional)

If true the selection state will reset when `ArrowNavigation` deactivates. Otherwise the selected child will be
remembered when the active state is toggled.

##### `...divProps`

All other props passed to `ArrowNavigation` are passed onto the `div` it returns. This includes support for the
`ref` prop using `React.forwardRef`.

### useArrowNavigation(x: number, y: number)

The `useArrowNavigation` hook accepts the x and y index of the navigation child. It is compatible with
`ArrowNavigation` and `BaseArrowNavigation`. It returns the following values:

##### `selected`: `true | false`

Whether this child is currently selected.

##### `active`: `true | false`

Whether the navigation component (`ArrowNavigation` or `BaseArrowNavigation`) is active. Active means it is responding
to keypresses.

##### `select`: `() => void`

A callback that can be call to change this child's `selected` state to `true`.

### useArrowNavigationWithFocusState

The `useArrowNavigation` hook accepts the x and y index of the navigation child. It is only compatible with
`ArrowNavigation`. It returns the following props:

`selected`, `active`, and `select` are the same as for [`useArrowNavigation`](#useArrowNavigation)

##### `selected`: `true | false`

##### `active`: `true | false`

##### `select`: `() => void`

##### `focusProps`: `{ ref, tabIndex, onClick }`

`focusProps` should be spread onto the navigation child. They will:

-   Set the `tabIndex` to `0` if it is selected and `-1` otherwise
-   Focus the child when it is selected, _and_ the navigation component is active
-   Set this child's `selected` prop to true when clicked

### BaseArrowNavigation

`BaseArrowNavigation` works in a similar way to `ArrowNavigation`, except it does not return a containing div, and
does not manage it's active state. This is now passed in with a prop. It accepts these props:

`children`, `initialIndex`, `mode`, and `reInitOnDeactivate` are the same as for [`ArrowNavigation`](#ArrowNavigation)

##### `children`

##### `initialIndex`: `[number, number]` (optional)

##### `mode`: `'roundTheWorld' | 'continuous' | 'bounded'` (optional)

##### `reInitOnDeactivate`: `true | false` (optional)

##### `active`: `true | false`

Whether the component should update the selected child index in response to keypresses.

## License

MIT © [jack aldridge](https://github.com/jackaldridge)
