/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { Popover, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MouseEvent, ReactNode, useContext, useState } from 'react'
import InternalStatus from '../MuiStatusBar/InternalStatus'
import DataProvider from '../MuiStore'
import Tooltip from '../utils/Tooltip'

import { PlacementPosition, StatusObject } from '../index.types'

const StyledBox = styled('div')<{ column?: string }>(({ column }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  display: 'flex',
  top: '0px',
  bottom: '0px',
  left: '0px',
  right: '0px',
  flexDirection: column === PlacementPosition.Top ? 'column-reverse' : 'column'
}))

const StyledChildren = styled('div')(() => ({
  flex: '1 1 auto',
  overflow: 'hidden',
  position: 'relative',
}))

const StyledTypographyNoChildren = styled(Typography)(() => ({
  userSelect: 'none'
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
  cursor: 'pointer',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: `${theme.palette.background.default} !important`,
  },
}))

const StyledStatusBar = styled('div')<{ position?: string }>(({ theme, position }: any) => ({
  gap: '4px',
  display: 'flex',
  minHeight: '28px',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'light'
    ? theme.palette.background.default
    : theme.palette.background.paper,
  color: `${theme.palette.background.default} !important`,
  boxShadow: `inset 0px ${position === 'top' ? -3 : 3}px 0px -2px ${theme.palette.divider}`,
}))

const StyledStatusBarWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export default function ({
  children
} : {
  children: ReactNode
}) {
  const { status, settings, handleStatusVisibilityToggle } = useContext(DataProvider)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const open = Boolean(anchorEl)

  const onClose = () => setAnchorEl(null)

  const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
  }

  const statusEntry = (statusItem: StatusObject) => <StyledEntryElementItem onClick={() => handleStatusVisibilityToggle({ id: statusItem.uniqueId })}>
    {statusItem.visible ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
    {statusItem.children || <StyledTypographyNoChildren variant="caption" color="textSecondary">No content for child</StyledTypographyNoChildren>}
  </StyledEntryElementItem>

  const entryWrapper = (statusItem: StatusObject) => <Tooltip
    {...{ key: statusItem.uniqueId, tooltip: 'Toggle visibility of tile', children: statusEntry(statusItem) }}
  />

  return <>
    <StyledBox id="mui-status-wrapper" {...{ column: settings.position }}>
      <StyledChildren id="mui-status-children">{children}</StyledChildren>
      <StyledStatusBarWrapper id="mui-status-statusBar" {...{ onContextMenu }}>
        {status.some(sItem => sItem.visible) && <StyledStatusBar position={settings.position}>
          {!settings.statusBarAnnounced && <InternalStatus />}
        </StyledStatusBar>}
      </StyledStatusBarWrapper>
    </StyledBox>
    <Popover
      id="toggle-status-popover"
      {...{ open, anchorEl, onClose, elevation: 1 }}
      anchorOrigin={{ vertical: settings.upperBar ? 'top' : 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: !settings.upperBar ? 'bottom' : 'top', horizontal: 'center' }}
      style={{ marginTop: `${(settings.upperBar ? 1 : -1) * 12}px` }}
    >
      <StyledEntryElement {...{ onContextMenu: e => { e.preventDefault() } }}>
        {[false, true].map((state: boolean) => <div key={state.toString()}>
          {status.filter(statusItem => statusItem.secondary === state).map(statusItem => entryWrapper(statusItem))}
        </div>)}
      </StyledEntryElement>
    </Popover>
  </>
}
