import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useContext } from 'react'
import DataProvider from '../../MuiStore'

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
    '&::-webkit-scrollbar': {
      display: 'none'
    },
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

    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
}))

export default function ({
  style,
  className
} : {
  style?: React.CSSProperties,
  className?: React.HTMLAttributes<HTMLDivElement>['className'],
}) {
  const theme = useTheme()
  const { status, settings } = useContext(DataProvider)
  const classes = useStyles(theme)

  return <>
    {status.some(statusItem => statusItem.visible) && <div
      {...{ style }}
      id="mui-status-statusBar-wrapper"
      className={clsx([className, classes.statusBarElem, settings.position === 'top' ? classes.upperElem : classes.lowerElem])}
    >
      {status.some(statusItem => !statusItem.secondary)
        && <div {...{ id: 'mui-status-statusBar-primary', className: clsx([classes.childElem, classes.primaryElem]) }} />}
      {status.some(statusItem => statusItem.secondary)
        && <div {...{ id: 'mui-status-statusBar-secondary', className: clsx([classes.childElem, classes.secondaryElem]) }} />}
    </div>}
  </>
}
