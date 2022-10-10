import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useContext } from 'react'
import DataProvider from '../../MuiStore'

const domId = 'mui-status-statusBar'
const useStyles = makeStyles(theme => ({
  statusBarElem: {
    gap: '4px',
    display: 'flex',
    minHeight: '28px',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.type === 'light'
      ? theme.palette.augmentColor({ main: theme.palette.divider }).dark
      : theme.palette.background.paper,
    color: `${theme.palette.background.default} !important`,
  },
  upperElem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
  },
  lowerElem: {
    borderBottom: 'none',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  childElem: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  primaryElem: {
    overflow: 'scroll',
    justifyContent: 'flex-start',
    scrollSnapType: 'both mandatory',
    gap: '4px',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  secondaryElem: {
    overflow: 'hidden',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    scrollSnapType: 'both mandatory',

    gap: '4px',
    flex: '1 1 auto',
    width: '0px',
    minWidth: '18px',

    '&::-webkit-scrollbar': { display: 'none' },
  },
}))

export default function ({
  style,
  className
} : {
  style?: React.CSSProperties,
  className?: React.HTMLAttributes<HTMLDivElement>['className'],
}) {
  const { status, settings } = useContext(DataProvider)

  const theme = useTheme()
  const classes = useStyles(theme)
  const wrapperCN = clsx([className, classes.statusBarElem, settings.position === 'top' ? classes.upperElem : classes.lowerElem])
  const primaryCN = clsx([classes.childElem, classes.primaryElem])
  const secondaryCN = clsx([classes.childElem, classes.secondaryElem])

  return <>
    {status.some(sItem => sItem.visible) && <div {...{ id: `${domId}-wrapper`, style, className: wrapperCN }}>
      {status.some(sItem => !sItem.secondary) && <div {...{ id: `${domId}-primary`, className: primaryCN }} />}
      {status.some(sItem => sItem.secondary) && <div {...{ id: `${domId}-secondary`, className: secondaryCN }} />}
    </div>}
  </>
}
