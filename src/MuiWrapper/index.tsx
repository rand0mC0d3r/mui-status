/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Popover } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import React, { Fragment, useContext, useState } from 'react'
import InternalStatus from '../MuiStatusBar/InternalStatus'
import DataProvider, { Position } from '../MuiStore'

const useStyles = makeStyles(theme => ({
  boxElem: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  childrenElem: {
    flex: '1 1 auto',
  },
  entryItemElem: {
    display: 'flex',
    minWidth: '165px',
    flexDirection: 'row',
    gap: '4px',
    padding: '4px 8px',

    '&:hover': {
      backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.primary.light }).light} !important`,
      color: `${theme.palette.background.default} !important`,
    },
  },
  entryElem: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    padding: '8px',
  },
}))

const flexDirection = (position: string) => (position === Position.top ? 'column-reverse' : 'column')

export default function ({
  children,
} : {
  children: React.ReactNode
}) {
  const {
    status, settings, tooltipComponent, handleStatusVisibilityToggle,
  } = useContext(DataProvider)
  const theme = useTheme()
  const classes = useStyles(theme)

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const open = Boolean(anchorEl)

  const onContextMenu = (e: any) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
  }
  const onClose = () => setAnchorEl(null)

  const statusEntry = (s: any) => (
    <div {...{ className: classes.entryItemElem, onClick: () => handleStatusVisibilityToggle({ id: s.uniqueId }) }}>
      {s.visible ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
      {s.children}
    </div>
  )

  const entryWrapper = (s: any) => (
    <Fragment key={s.uniqueId}>
      {tooltipComponent !== undefined ? tooltipComponent('Toggle visibility of tile', statusEntry(s)) : statusEntry(s)}
    </Fragment>
  )

  return <>
    <Box id="mui-status-wrapper" {...{ display: 'flex', flexDirection: flexDirection(settings.position), className: classes.boxElem }}>
      <div id="mui-status-children" className={classes.childrenElem}>{children}</div>
      <div id="mui-status-statusBar" {...{ onContextMenu }}>{!settings.statusBarAnnounced && <InternalStatus />}</div>
    </Box>

    <Popover
      {...{ open, anchorEl, onClose }}
      elevation={1}
      id="toggle-status-popover"
      anchorOrigin={{ vertical: settings.upperBar ? 'top' : 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: !settings.upperBar ? 'bottom' : 'top', horizontal: 'center' }}
      style={{ marginTop: `${(settings.upperBar ? 1 : -1) * 12}px` }}
    >
      <div onContextMenu={e => { e.preventDefault() }} className={classes.entryElem}>
        <div>{status.filter(statusItem => !statusItem.secondary).map(statusItem => entryWrapper(statusItem))}</div>
        <div>{status.filter(statusItem => statusItem.secondary).map(statusItem => entryWrapper(statusItem))}</div>
      </div>
    </Popover>
  </>
}
