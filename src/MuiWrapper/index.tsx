import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { Box, Popover } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext, useState } from 'react'
import { PlacementPosition, StatusObject } from '../index.types'
import InternalStatus from '../MuiStatusBar/InternalStatus'
import DataProvider from '../MuiStore'
import Tooltip from '../utils/Tooltip'

const StyledBox = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
}))

const StyledChildren = styled('div')(() => ({
  flex: '1 1 auto'
}))

const StyledEntryElement = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  padding: '8px',
}))

const StyledEntryElementItem = styled('div')(({ theme }) => ({
  display: 'flex',
  minWidth: '165px',
  flexDirection: 'row',
  gap: '4px',
  padding: '4px 8px',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: `${theme.palette.background.default} !important`,
  },
}))

const flexDirection = (position: string) => (position === PlacementPosition.Top ? 'column-reverse' : 'column')

export default function ({ children } : { children: React.ReactNode }) {
  const { status, settings, handleStatusVisibilityToggle } = useContext(DataProvider)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const open = Boolean(anchorEl)

  const onClose = () => setAnchorEl(null)

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
  }

  const statusEntry = (statusItem: StatusObject) => <StyledEntryElementItem
    {...{ onClick: () => handleStatusVisibilityToggle({ id: statusItem.uniqueId }) }}
  >
    {statusItem.visible ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
    {statusItem.children}
  </StyledEntryElementItem>

  const entryWrapper = (statusItem: StatusObject) => <Tooltip
    {...{ key: statusItem.uniqueId, tooltip: 'Toggle visibility of tile', children: statusEntry(statusItem) }}
  />

  return <>
    <StyledBox id="mui-status-wrapper" {...{ display: 'flex', flexDirection: flexDirection(settings.position) }}>
      <StyledChildren id="mui-status-children">{children}</StyledChildren>
      <div id="mui-status-statusBar" {...{ onContextMenu }}>{!settings.statusBarAnnounced && <InternalStatus />}</div>
    </StyledBox>
    <Popover
      {...{ open, anchorEl, onClose }}
      elevation={1}
      id="toggle-status-popover"
      anchorOrigin={{ vertical: settings.upperBar ? 'top' : 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: !settings.upperBar ? 'bottom' : 'top', horizontal: 'center' }}
      style={{ marginTop: `${(settings.upperBar ? 1 : -1) * 12}px` }}
    >
      <StyledEntryElement onContextMenu={e => { e.preventDefault() }}>
        <div>{status.filter(statusItem => !statusItem.secondary).map(statusItem => entryWrapper(statusItem))}</div>
        <div>{status.filter(statusItem => statusItem.secondary).map(statusItem => entryWrapper(statusItem))}</div>
      </StyledEntryElement>
    </Popover>
  </>
}
