/* eslint-disable no-unused-vars */
import React from 'react'

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button>{props.label}</button>
}

export default Button
