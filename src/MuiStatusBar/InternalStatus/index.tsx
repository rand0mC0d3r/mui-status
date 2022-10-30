import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import DataProvider from '../../MuiStore'

const StyledPrimaryElem = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'scroll',
  justifyContent: 'flex-start',
  gap: '4px',

  '&::-webkit-scrollbar': {
    display: 'none'
  },
}))

const StyledSecondaryElem = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '4px',
  flex: '0 1 auto',
  minWidth: '18px',

  '&::-webkit-scrollbar': {
    display: 'none'
  },
}))

const domId = 'mui-status-statusBar'

export default function () {
  const { status } = useContext(DataProvider)

  return <>
    {status.some(({ secondary }) => !secondary) && <StyledPrimaryElem {...{ id: `${domId}-primary` }} />}
    {status.some(({ secondary }) => secondary) && <StyledSecondaryElem {...{ id: `${domId}-secondary` }} />}
  </>
}
