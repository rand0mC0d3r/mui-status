/* eslint-disable @typescript-eslint/no-explicit-any */
import AppsOutageIcon from '@mui/icons-material/AppsOutage'
import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Resizable } from 're-resizable'
import { useCallback, useContext, useEffect } from 'react'
import { SettingsObject } from '../../index.types'
import DataProvider from '../../MuiStore'
import Tooltip from '../../utils/Tooltip'

const StyledStatusConsole = styled('div')(() => ({
  flex: '1 0 auto',
  overflow: 'hidden',
}))

const StyledResizable = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  // zIndex: '10000 !important',
}))

const StyledWrapper = styled('div')(({ theme }: {theme: any}) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  bottom: '0px',
  left: '0px',
  alignItems: 'center',
  right: '0px',

  // '& > div:nth-child(1) > div:nth-child(1)': {
  //   zIndex: '0 !important',
  //   backgroundColor: 'transparent !important',
  // },

  // '& > div:nth-child(1) > div:nth-child(1)': {
  //   backgroundColor: 'blue !important',
  // },

  '& > div > div:nth-child(2) > div:not(:first-child)': {
    display: 'none',
  }
}))

const StyledEmptyWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
}))

const StyledActionsWrapper = styled('div')(({ theme }: {theme: any}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  padding: '0px',
  boxShadow: `inset 0px 1px 0px 0px ${theme.palette.divider}, inset 0px -1px 0px 0px ${theme.palette.divider}`,
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

const StyledTab = styled(Typography)<{ activated?: string }>(({ theme, activated } : { theme: any, activated: boolean }) => ({
  padding: '4px 12px',
  cursor: 'pointer',
  backgroundColor: activated ? theme.palette.primary.main : 'transparent',
  color: activated ? theme.palette.background.default : theme.palette.text.secondary,

  '&:hover': {
    backgroundColor: activated ? theme.palette.primary.dark : theme.palette.divider,
    color: activated ? theme.palette.background.default : theme.palette.text.primary,
  }
}))

const domId = 'mui-status-console'
const domIdWrapper = 'mui-status-console-wrapper'
const relevantType = 'console'

export default function () {
  const { status, updateConsoleActiveId, updateIsConsoleOpen } = useContext(DataProvider)
  const { consoleActiveId, isConsoleOpen } = useContext(DataProvider).settings as SettingsObject

  const isActivated = (uniqueId: string) => uniqueId === consoleActiveId ? consoleActiveId : undefined
  const relevantConsoles = status.filter(({ type }) => type === relevantType)

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event
    if ((keyCode === 27 || keyCode === 192)) {
      updateIsConsoleOpen()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return <>
    {(consoleActiveId || isConsoleOpen) && <>
      {status.some(({ type }) => type === relevantType) && <StyledWrapper {...{ id: domIdWrapper }}>
        <Resizable
          style={{ display: 'flex', flexDirection: 'column' }}
          minHeight="300px"
          maxHeight="800px"
          defaultSize={{
            width: '100%',
            height: 350
          }}
        >
          <StyledResizable>
            {/* <StyledActionsWrapper>
              <StyledTabs>
                {relevantConsoles.map(({ uniqueId, title }) => <StyledTab {...{
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
            </StyledActionsWrapper> */}
            {relevantConsoles.some(({ uniqueId }) => uniqueId === consoleActiveId)
              ? <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StyledTabs>
                    {relevantConsoles.map(({ uniqueId, title }) => <StyledTab {...{
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
                </div>
                <StyledStatusConsole {...{ id: domId }} />
              </div>
              : <StyledEmptyWrapper>
                <AppsOutageIcon />
                <Typography {...{ variant: 'caption', color: 'textSecondary' }}>Seems no consoles available. Select one from above</Typography>
              </StyledEmptyWrapper>}
          </StyledResizable>
        </Resizable>
      </StyledWrapper>}
    </>}
  </>
}
