/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
// import React from 'react'
// import MuiStatus from './MuiStatus'
// import MuiStatusBar from './MuiStatusBar'
// import MuiStatusChild from './MuiStatusChild'
// import MuiStatusPanel from './MuiStatusPanel'
// import { MuiStatusProvider } from './MuiStore'
import SayBye from './SayBye'
//
const SayHello = ({ name }: { name: string }): JSX.Element => {

  useEffect(() => {
    console.log('SayHello fff useEffect')
  } , [])

  return (<div>Hey {name}, bla bla 33eff344d</div>)
}

export default SayHello
// export { SayBye, MuiStatusChild, MuiStatusPanel, MuiStatus, MuiStatusBar, MuiStatusProvider }
export { SayBye }
// do not export Wrapper
