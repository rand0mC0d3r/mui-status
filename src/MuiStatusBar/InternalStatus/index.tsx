import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import DataProvider from '../../MuiStore'
import Tooltip from '../../utils/Tooltip'

const StyledPrimaryElem = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'scroll',
  justifyContent: 'flex-start',
  scrollSnapType: 'both mandatory',
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
  scrollSnapType: 'both mandatory',
  gap: '4px',
  flex: '0 1 auto',
  minWidth: '18px',

  '&::-webkit-scrollbar': {
    display: 'none'
  },
}))

const StyledKeyboardDoubleArrowUpIcon = styled(KeyboardDoubleArrowUpIcon)(() => ({
  fontSize: 12
}))

const domId = 'mui-status-statusBar'

export default function () {
  const { status, updateIsConsoleOpen } = useContext(DataProvider)

  return <>
    {status.some(({ secondary }) => !secondary) && <StyledPrimaryElem {...{ id: `${domId}-primary` }} />}
    {status.some(({ type }) => type === 'console') && <Tooltip {...{ tooltip: 'Toggle console view' }}>
      <StyledKeyboardDoubleArrowUpIcon {...{ onDoubleClick: () => updateIsConsoleOpen() }} />
    </Tooltip>}
    {status.some(({ secondary }) => secondary) && <StyledSecondaryElem {...{ id: `${domId}-secondary` }} />}
  </>
}
