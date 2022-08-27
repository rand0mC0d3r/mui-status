import React, { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import DataProvider from '../MuiStore'
import InternalStatus from './InternalStatus'

export default ({
  style,
  className
}: {
  style?: any,
  className?: any
}) => {
  const { triggerStatusBarAnnounced  } = useContext(DataProvider)
  const [documentElement, setDocumentElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const detectDocumentElement = document.getElementById('muiStatus-statusBar')
    if(detectDocumentElement) {
      setDocumentElement(detectDocumentElement)
      triggerStatusBarAnnounced()
    }
  }, [])

  return documentElement
    ? createPortal(<InternalStatus {...{ style: { ...style, padding: '0px', margin: '0px' }, className }} />, documentElement)
    : null
}
