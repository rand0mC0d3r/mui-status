import { Tooltip } from '@mui/material'
import { ReactNode, useContext } from 'react'
import DataProvider from '../../MuiStore'

export default function ({
  tooltip,
  children,
} : {
  tooltip?: ReactNode | string,
  children?: ReactNode,
}) {
  const { tooltipComponent } = useContext(DataProvider)
  return <>
    {(tooltipComponent !== undefined && tooltip)
      ? tooltipComponent(tooltip, <span>{children}</span>)
      : <Tooltip arrow title={<span style={{ userSelect: 'none' }}>{tooltip}</span>}><span>{children}</span></Tooltip>}
  </>
}
