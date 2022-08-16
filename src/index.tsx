/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import MuiStatusChild from './MuiStatusChild'

const SayHello = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, go hello to TypeScript.</div>
)

export default SayHello
export { MuiStatusChild }
