import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { SettingsObject } from '../../index.types'
import DataProvider from '../../MuiStore'
import Tooltip from '../../utils/Tooltip'

const StyledStatusConsole = styled('div')(() => ({
  flex: '1 1 auto',
  overflow: 'hidden'
}))

const StyledWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  bottom: '0px',
  left: '0px',
  overflow: 'hidden',
  right: '0px',
  height: '350px',
}))

const StyledActionsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  padding: '0px',
  border: `1px solid ${theme.palette.divider}`,
  borderStyle: 'solid none',
  alignItems: 'center',
}))

const StyledTabs = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '0px',
}))

const StyledTab = styled(Typography)<{ active?: boolean }>(({ theme, active }) => ({
  padding: '4px 8px',
  cursor: 'pointer',
  backgroundColor: active ? theme.palette.primary.light : theme.palette.background.default,
  color: active ? theme.palette.background.default : theme.palette.text.secondary,
  fontWeight: active ? 'bold' : 'normal',
}))

const domId = 'mui-status-console'
const domIdWrapper = 'mui-status-console-wrapper'

export default function () {
  const { status, settings, updateConsoleActiveId } = useContext(DataProvider)
  const { consoleActiveId } = settings as SettingsObject

  return <>
    {consoleActiveId && <>
      {status.some(sItem => sItem.type === 'console') && <StyledWrapper id={domIdWrapper}>
        <StyledActionsWrapper>
          <StyledTabs>
            {status.filter(sItem => sItem.type === 'console').map(s => <StyledTab
              key={s.uniqueId}
              onClick={() => updateConsoleActiveId({ id: s.uniqueId })}
              active={s.uniqueId === consoleActiveId}
              variant="caption"
            >
              {s.uniqueId}
            </StyledTab>)}

          </StyledTabs>
          <Tooltip tooltip="Close console section">
            <CloseIcon onClick={() => updateConsoleActiveId({})} />
          </Tooltip>
        </StyledActionsWrapper>
        <StyledStatusConsole id={domId} />
      </StyledWrapper>}
    </>}
  </>
}
