import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import DataProvider from '../../Store'

const SPrimary = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'scroll',
  justifyContent: 'flex-start',

  '&::-webkit-scrollbar': {
    display: 'none'
  },
}))

const SSecondary = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  justifyContent: 'flex-end',
  alignItems: 'center',
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
    {status.some(({ secondary }) => !secondary) && <SPrimary {...{ id: `${domId}-primary` }} />}
    {status.some(({ secondary }) => secondary) && <SSecondary {...{ id: `${domId}-secondary` }} />}
  </>
}
