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

const StyledCloseIcon = styled(CloseIcon)(() => ({
  fontSize: '20px'
}))

const StyledTab = styled(Typography)<{ activated?: string }>(({ theme, activated }) => ({
  padding: '4px 8px',
  cursor: 'pointer',
  backgroundColor: activated ? theme.palette.primary.main : theme.palette.background.default,
  color: activated ? theme.palette.background.default : theme.palette.text.secondary,
}))

const domId = 'mui-status-console'
const domIdWrapper = 'mui-status-console-wrapper'
const relevantType = 'console'

export default function () {
  const { status, settings, updateConsoleActiveId } = useContext(DataProvider)
  const { consoleActiveId } = settings as SettingsObject

  const isActivated = (uniqueId: string) => uniqueId === consoleActiveId ? consoleActiveId : undefined

  return <>
    {consoleActiveId && <>
      {status.some(({ type }) => type === relevantType) && <StyledWrapper {...{ id: domIdWrapper }}>
        <StyledActionsWrapper>
          <StyledTabs>
            {status
              .filter(({ type }) => type === relevantType)
              .map(({ uniqueId, title }) => <StyledTab {...{
                key: uniqueId,
                variant: 'caption',
                onClick: () => updateConsoleActiveId({ id: uniqueId }),
                activated: isActivated(uniqueId)
              }}
              >
                {title || uniqueId}
              </StyledTab>)}
          </StyledTabs>
          <Tooltip {...{ tooltip: 'Close console section' }}>
            <StyledCloseIcon {...{ onClick: () => updateConsoleActiveId({}) }} />
          </Tooltip>
        </StyledActionsWrapper>
        <StyledStatusConsole {...{ id: domId }} />
      </StyledWrapper>}
    </>}
  </>
}
