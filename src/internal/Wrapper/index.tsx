/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { Popover, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MouseEvent, ReactNode, useContext, useState } from 'react'
import InternalStatus from '../InternalStatus'
import DataProvider from '../../Store'

import { PlacementPosition, SettingsObject, StatusObject, StatusType } from '../../index.types'
import InternalConsole from '../InternalConsole'

const SBox = styled('div')<{ column?: string }>(({ column }) => ({
  height: '100%',
  width: '100%',
  gap: '0px',
  position: 'absolute',
  display: 'flex',
  top: '0px',
  bottom: '0px',
  left: '0px',
  right: '0px',
  flexDirection: column === PlacementPosition.Top ? 'column-reverse' : 'column'
}))

const SChildren = styled('div')(() => ({
  flex: '1 1 auto',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
}))

const StyledTypographyNoChildren = styled(Typography)(() => ({
  userSelect: 'none'
}))

const SElement = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  padding: '8px',
}))

const SElementItem = styled('div')(({ theme }) => ({
  display: 'flex',
  minWidth: '165px',
  cursor: 'pointer',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 6px',

  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: `${theme.palette.background.default} !important`,
  },
}))

const SStatusWrapper = styled('div')<{ position?: string }>(({ theme, position }: any) => ({
  gap: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'light'
    ? theme.palette.background.default
    : theme.palette.background.paper,
  boxShadow: `inset 0px ${position === 'top' ? -3 : 3}px 0px -2px ${theme.palette.divider}`,
}))

export default function ({
  children
} : {
  children: ReactNode
}) {
  const { status, handleStatusVisibilityToggle } = useContext(DataProvider)
  const { position, upperBar } = useContext(DataProvider).settings as SettingsObject
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const open = Boolean(anchorEl)

  const onClose = () => setAnchorEl(null)

  const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setAnchorEl(e.currentTarget)
  }

  const statusEntry = (statusItem: StatusObject) => <SElementItem onClick={() => handleStatusVisibilityToggle({ id: statusItem.uniqueId })}>
    {statusItem.visible ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
    {statusItem.children || <StyledTypographyNoChildren variant="caption" color="textSecondary">No content for child</StyledTypographyNoChildren>}
  </SElementItem>

  const entryWrapper = (statusItem: StatusObject) => <Tooltip
    {...{ key: statusItem.uniqueId, title: 'Toggle visibility of tile' }}
  >
    {statusEntry(statusItem)}
  </Tooltip>

  return <>
    <SBox id="mui-status-wrapper" {...{ column: position }}>
      <SChildren id="mui-status-children">
        {children}
        {status.some(({ type }) => type === StatusType.CONSOLE) && <InternalConsole />}
      </SChildren>
      {status.some(({ visible }) => visible) && <SStatusWrapper {...{ position, onContextMenu }}><InternalStatus /></SStatusWrapper>}
    </SBox>
    <Popover
      id="toggle-status-popover"
      {...{ open, anchorEl, onClose, elevation: 1 }}
      anchorOrigin={{ vertical: upperBar ? 'top' : 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: !upperBar ? 'bottom' : 'top', horizontal: 'center' }}
      style={{ marginTop: `${(upperBar ? 1 : -1) * 12}px` }}
    >
      <SElement {...{ onContextMenu: e => { e.preventDefault() } }}>
        {[false, true].map((state: boolean) => <div key={state.toString()}>
          {status.filter(({ secondary }) => secondary === state).map(statusItem => entryWrapper(statusItem))}
        </div>)}
      </SElement>
    </Popover>
  </>
}
