/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { SettingsObject, StatusObject } from '../index.types'
import MupStatus from '../MuiStatus'
import DataProvider from '../MuiStore'

export default function ({
  id,
  secondary = false,
  style,
  onClick,
  tooltip = '',
  children,
  console,
  consoleTitle,
} : {
  id: string,
  secondary?: boolean,
  elevation?: number,
  style?: CSSProperties,
  onClick?: any,
  tooltip?: ReactNode | string,
  children?: ReactNode,
  popoverStyle?: any,
  popoverClassName?: any,
  console?: any,
  consoleTitle?: string,
}) {
  const {
    status,
    handleStatusTypeUpdate,
    handleStatusConsoleTypeUpdate,
    updateConsoleActiveId
  } : {
    status: StatusObject[],
    handleStatusTypeUpdate: any,
    handleStatusConsoleTypeUpdate: any,
    updateConsoleActiveId: any,
  } = useContext(DataProvider)
  const { consoleActiveId } = useContext(DataProvider).settings as SettingsObject
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)
  const [elementFound, setElementFound] = useState<HTMLElement | null>(null)

  const handleOnClick = () => {
    if (onClick) {
      onClick()
    }
    updateConsoleActiveId(consoleActiveId === id ? { } : { id: statusObject?.uniqueId })
  }

  useEffect(() => {
    if (statusObject !== null && consoleActiveId) {
      setElementFound(document.getElementById('mui-status-console') || null)
    }
  }, [statusObject, consoleActiveId])

  useEffect(() => {
    const foundObject = status.find(({ uniqueId }) => uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
      handleStatusTypeUpdate({ id, type: 'console' })
    }
  }, [status, id, statusObject])

  useEffect(() => {
    if (statusObject) {
      handleStatusConsoleTypeUpdate({ id, title: consoleTitle })
    }
  }, [statusObject, id, consoleTitle])

  return <>
    <MupStatus {...{
      id,
      tooltip,
      secondary,
      highlight: (statusObject && statusObject?.uniqueId === consoleActiveId) ? 'primary' : 'default',
      onClick: () => handleOnClick(),
      style: { ...style, cursor: 'context-menu', minWidth: '24px' }
    }}
    >
      {children}
    </MupStatus>
    {elementFound && statusObject && statusObject.uniqueId === consoleActiveId && createPortal(console, elementFound)}
  </>
}
