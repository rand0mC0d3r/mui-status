import React, { useContext } from 'react'
import DataProvider from '../../MuiStore'

export default function ({
  tooltip = '',
  children,
} : {
  tooltip?: React.ReactNode | string,
  children?: React.ReactNode,
}) {
  const { tooltipComponent } = useContext(DataProvider)
  return <>{tooltipComponent !== undefined ? tooltipComponent(tooltip, <span>{children}</span>) : children}</>
}
