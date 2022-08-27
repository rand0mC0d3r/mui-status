/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import MuiStatus from './MuiStatus'
import MuiStatusBar from './MuiStatusBar'
import MuiStatusChild from './MuiStatusChild'
import MuiStatusPanel from './MuiStatusPanel'

const SayHello = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, tester</div>
)

export default SayHello
export { MuiStatusChild, MuiStatusPanel, MuiStatus, MuiStatusBar }
// do not export Wrapper
