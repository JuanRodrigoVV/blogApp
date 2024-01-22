import { useState, forwardRef, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'

const  Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const visibleFunc = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      visibleFunc
    }
  })
  return (
    <>
      {visible === false ? <button onClick={visibleFunc}>{props.label}</button> :
        <>
          {props.children}
          <button onClick={visibleFunc}>Cancel</button>
        </>}
    </>
  )
})

export default Togglable

Togglable.displayName = 'Togglable'


Togglable.propTypes = {
  label: PropTypes.string.isRequired
}