/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Alert, AlertTitle, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { cloneElement, useContext, useEffect, useState } from 'react'
import DataProvider from '../../Store'

const SHeader = styled('div')<{ expanded: string }>(({ expanded }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: expanded === 'true' ? '8px' : '0px',
  marginTop: expanded === 'true' ? '-4px' : '0px',
  justifyContent: 'space-between',
  width: '100%',
}))

const SBottom = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '8px',
}))

const SActionButtons = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
}))

const SActions = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: '1 1 auto',
  justifyContent: 'flex-end',
}))

const STitle = styled(Typography)(() => ({
  userSelect: 'none',
  textTransform: 'capitalize',
  fontWeight: 'bold',
}))

const SMessage = styled(Typography)<{ ellipsis: string }>(({ ellipsis }) => ({
  whiteSpace: ellipsis === 'true' ? 'nowrap' : 'normal',
  overflow: ellipsis === 'true' ? 'hidden' : 'unset',
  textOverflow: ellipsis === 'true' ? 'ellipsis' : 'unset',
  lineHeight: 'initial'
}))

const SAlert = styled(Alert)<{ expanded: string, actions: string }>(({ expanded, actions }) => ({
  '.MuiAlert-message': {
    minWidth: 'unset',
    width: '100%',
    padding: expanded === 'true' ? '8px 0px' : '0px',
    display: actions === 'true' ? 'block' : 'flex',
    flexDirection: (actions === 'true' || expanded === 'true') ? 'column' : 'row',
  },
}))

export default function ({
  uniqueId,
  actions,
  source,
  severity,
  message,
  code
}: {
  uniqueId: string,
  actions?: any,
  source?: string,
  severity: any,
  message: string,
  code: string
}) {
  const { handleSnackbarDestroy } = useContext(DataProvider)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const closeAlert = () => {
    handleSnackbarDestroy({ uniqueId })
  }

  useEffect(() => {
    if (actions) {
      setIsExpanded(true)
    }
  }, [actions])

  const getMessage = (ellipsis = false) => <SMessage ellipsis={ellipsis.toString()}>
    {message}
  </SMessage>

  return <SAlert
    expanded={isExpanded.toString()}
    actions={(actions?.length > 0).toString()}
    key={uniqueId}
    icon={<Tooltip arrow title={severity}>
      <span style={{ lineHeight: '0px' }}>
        {severity === 'info' && <PriorityHighOutlinedIcon fontSize="inherit" />}
        {severity === 'success' && <CheckIcon fontSize="inherit" />}
        {severity === 'warning' && <WarningAmberIcon fontSize="inherit" />}
        {severity === 'error' && <ErrorOutlineOutlinedIcon fontSize="inherit" />}
      </span>
    </Tooltip>}
    {...{ severity }}
  >
    <SHeader expanded={isExpanded.toString()}>
      {(isExpanded)
        ? <STitle variant="subtitle1" color="inherit">{severity}</STitle>
        : <>
          {!actions
            ? <>{getMessage(true)}</>
            : <STitle variant="subtitle1" color="inherit">{severity}</STitle>}
        </>}
      <SActionButtons>
        {!actions && <Tooltip arrow title="Expand/Collapse alert">
          <IconButton color="inherit" size="small" onClick={toggleExpanded}>
            {!isExpanded
              ? <ExpandMoreIcon fontSize="small" />
              : <ExpandLessIcon fontSize="small" />}
          </IconButton>
        </Tooltip>}
        <Tooltip arrow title="Close alert">
          <IconButton color="inherit" onClick={closeAlert} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </SActionButtons>
    </SHeader>

    {(isExpanded || actions) && getMessage()}

    {code && <code>
        {code}
      </code>}

    {(isExpanded || actions) && <>
      {(source || actions) && <SBottom>
        {source && <Typography variant="caption" color="textSecondary">
          Source:
          {source}
        </Typography>}
        <SActions>
          {actions && actions.map((action: any) => <>{cloneElement(action, { variant: 'contained', disableElevation: true })}</>)}
        </SActions>
      </SBottom>}
    </>}
  </SAlert>
}
