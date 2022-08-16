/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import MuiStatus from './MuiStatus'
import MuiStatusChild from './MuiStatusChild'
import MuiStatusPanel from './MuiStatusPanel'

const SayHello = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, go hello to TypeScript.</div>
)

export default SayHello
export { MuiStatusChild, MuiStatusPanel, MuiStatus }
// do not export Wrapper
