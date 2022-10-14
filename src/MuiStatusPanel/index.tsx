/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popover } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { StatusObject } from '../index.types'
import MupStatus from '../MuiStatus'
import DataProvider from '../MuiStore'

export default function ({
  id,
  secondary = false,
  elevation = 4,
  style,
  tooltip = '',
  children,
  popoverStyle,
  popoverClassName,
  popover
} : {
  id: string,
  secondary?: boolean,
  elevation?: number,
  style?: React.CSSProperties,
  tooltip?: any,
  children?: any,
  popoverStyle?: any,
  popoverClassName?: any,
  popover?: any,
}) {
  const { status, popoverComponent } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  const [anchorEl, setAnchorEl] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const open = Boolean(anchorEl)

  const anchorVertical = isToggled ? 'top' : 'bottom'
  const transformVertical = !isToggled ? 'bottom' : 'top'
  const horizontal = statusObject?.secondary ? 'right' : 'left'

  const onClick = (e: any) => {
    setAnchorEl(e.currentTarget)
    setIsToggled(e.pageY < screen.height / 2)
  }

  const onClose = () => setAnchorEl(null)

  const ComponentPopoverProps = {
    position: isToggled ? 'top' : 'bottom',
    isSecondary: statusObject?.secondary,
    popover,
    popoverProps: {
      anchorEl,
      onClose,
      open,
      style: { marginTop: `${(isToggled ? 1 : -1) * 12}px` },
      anchorOrigin: { vertical: anchorVertical, horizontal },
      transformOrigin: { vertical: transformVertical, horizontal },
    }
  }

  const FallbackPopoverProps = {
    open,
    anchorEl,
    onClose,
    elevation,
    id: `mui-status-panel-popover-${id}`,
    className: popoverClassName,
    style: { ...popoverStyle, marginTop: `${(isToggled ? 1 : -1) * 12}px` },
  }

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  return <>
    <MupStatus {...{ id, tooltip, secondary, onClick, style: { ...style, minWidth: '24px' } }}>{children}</MupStatus>
    {popoverComponent !== undefined
      ? popoverComponent(ComponentPopoverProps)
      : <Popover {...{
        ...FallbackPopoverProps,
        anchorOrigin: { vertical: anchorVertical, horizontal },
        transformOrigin: { vertical: transformVertical, horizontal }
      }}
      >
        {popover}
      </Popover>}
  </>
}
