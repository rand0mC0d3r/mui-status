/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles'
import React, { useContext } from 'react'
import DataProvider from '../../MuiStore'

const StyledStatusBar = styled('div')(({ theme }: any) => ({
  gap: '4px',
  display: 'flex',
  minHeight: '28px',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'light'
    ? theme.palette.divider
    : theme.palette.background.paper,
  color: `${theme.palette.background.default} !important`,
  // borderBottom: position === 'top' ? `1px solid ${theme.palette.divider}` : 'none',
  // borderTop: position === 'top' ? 'none' : `1px solid ${theme.palette.divider}`,
}))

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
  flex: '1 1 auto',
  width: '0px',
  minWidth: '18px',

  '&::-webkit-scrollbar': {
    display: 'none'
  },
}))

const domId = 'mui-status-statusBar'

export default function ({
  style,
  className
} : {
  style?: React.CSSProperties,
  className?: React.HTMLAttributes<HTMLDivElement>['className'],
}) {
  const { status } = useContext(DataProvider)

  return <>
    {status.some(sItem => sItem.visible) && <StyledStatusBar {...{ id: `${domId}-wrapper`, style, className }}>
      {status.some(sItem => !sItem.secondary) && <StyledPrimaryElem {...{ id: `${domId}-primary` }} />}
      {status.some(sItem => sItem.secondary) && <StyledSecondaryElem {...{ id: `${domId}-secondary` }} />}
    </StyledStatusBar>}
  </>
}
