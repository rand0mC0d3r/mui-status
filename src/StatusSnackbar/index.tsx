/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useCallback, useContext, useEffect, useState } from 'react'
import { SnackbarObject } from '../index.types'
import DataProvider from '../Store'

export default function ({
  severity,
  message,
  autoHideDuration = 6000,
  actions,
  source,
  code,
} : {
  severity: 'success' | 'info' | 'warning' | 'error',
  message: string,
  autoHideDuration?: number,
  actions?: any,
  source?: string,
  code?: string,
}) {
  const { snackbar, handleSnackbarAnnouncement } : { snackbar: SnackbarObject[], handleSnackbarAnnouncement: any } = useContext(DataProvider)
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

  return <></>
}
