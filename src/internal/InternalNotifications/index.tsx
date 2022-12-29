/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import DataProvider from '../../Store'
import InternalAlert from '../InternalAlert'

const SWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '550px',
}))

export default function () {
  const { snackbar } = useContext(DataProvider)

  return <SWrapper>
    {snackbar.map(({ uniqueId, severity, message, source, actions, code }) => (
      <InternalAlert key={uniqueId} {...{ uniqueId, actions, severity, source, message, code }} />
    ))}
  </SWrapper>
}
