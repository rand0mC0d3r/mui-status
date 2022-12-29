/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// import { Alert, Snackbar } from '@mui/material'
// import { Alert } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react'
import { SnackbarObject } from '../index.types'
import DataProvider from '../Store'

export default function ({
  severity,
  // vertical = 'bottom',
  // horizontal = 'right',
  message,
  autoHideDuration = 6000,
  isExpanded = false,
  actions,
  source,
  // onClose,
  code,
} : {
  severity: 'success' | 'info' | 'warning' | 'error',
  // vertical?: 'top' | 'bottom',
  // horizontal?: 'left' | 'center' | 'right',
  message: string,
  autoHideDuration?: number,
  isExpanded?: boolean,
  actions?: any,
	source?: string,
  // onClose?: any,
  code?: string,
}) {
  const { snackbar, handleSnackbarAnnouncement } : { snackbar: SnackbarObject[], handleSnackbarAnnouncement: any } = useContext(DataProvider)
  // const [open, setOpen] = useState<boolean>(true)
  const [ownId, setOwnId] = useState<string | null>()
  const [snackbarObject, setSnackbarObject] = useState<SnackbarObject | null>(null)

  const callbackHandleStatusAnnouncement = useCallback(
    () => {
      console.log(ownId, severity, message, code, autoHideDuration)
      handleSnackbarAnnouncement({ ownId, actions, source, severity, message, code, autoHideDuration })
    },
    [severity, ownId, message, actions, source, code, autoHideDuration, handleSnackbarAnnouncement]
  )

  useEffect(() => {
    if (ownId) {
      const snackbarObjectFound = snackbar.find(({ uniqueId }) => uniqueId === ownId)
      if (snackbarObjectFound) {
        setSnackbarObject(snackbarObjectFound)
      }
    }
  }, [snackbar, ownId, snackbarObject])

  useEffect(() => {
    if (ownId && snackbarObject === null) {
      callbackHandleStatusAnnouncement()
    }
  }, [ownId, snackbarObject, callbackHandleStatusAnnouncement])

  useEffect(() => { setOwnId((Math.random() + 1).toString(36).substring(7)) }, [])

  return <>
    {/* <Snackbar onClick={() => setOpen(false)} {...{ anchorOrigin: { vertical, horizontal }, open, onClose, autoHideDuration }}> */}
    {/* <Alert {...{ onClose, severity }}>
      {message}
      <code>{code}</code>
    </Alert> */}
    {/* </Snackbar> */}
  </>
}
