/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from '@mui/icons-material/Check'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Alert, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

const SCode = styled('textarea')<{ height: number }>(({ height, theme }) => ({
  fontFamily: 'monospace',
  backgroundColor: `${theme.palette.divider}`,
  padding: '8px',
  resize: 'vertical',
  whiteSpace: 'nowrap',
  marginTop: '8px',
  marginBottom: '8px',
  borderColor: 'inherit',
  maxHeight: '300px',
  minHeight: `${(height * 20) + 10}px`,
  borderRadius: '4px',
  color: 'inherit',

  '&:focus-visible': {
    outline: '0px',
  },
}))

const SMessage = styled(Typography)<{ ellipsis: string }>(({ ellipsis }) => ({
  whiteSpace: ellipsis === 'true' ? 'nowrap' : 'normal',
  overflow: ellipsis === 'true' ? 'hidden' : 'unset',
  textOverflow: ellipsis === 'true' ? 'ellipsis' : 'unset',
  lineHeight: ellipsis === 'true' ? 'initial' : '1.65',
}))

const SAlert = styled(Alert)<{ expanded: string, actions: string }>(({ expanded, actions }) => ({
  '.MuiAlert-message': {
    minWidth: 'unset',
    width: '100%',
    padding: expanded === 'true' ? '8px 0px' : '0px',
    display: 'flex',
    flexDirection: (actions === 'true' || expanded === 'true') ? 'column' : 'row',
  },
}))

export default function ({
  uniqueId,
  actions,
  source,
  severity,
  message,
  code,
  isRemoveFlag = false,
}: {
  uniqueId: string,
  actions?: any,
  source?: string,
  severity: any,
  message: string,
  code: string,
  isRemoveFlag?: boolean,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

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
    <Header {...{ uniqueId, actions, severity, message, isRemoveFlag }} />

    {(isExpanded || actions) && getMessage()}

    {isExpanded && code && <SCode
      defaultValue={code}
      height={Math.min(10, code.split('\n').length)}
    />}

    {(isExpanded || actions) && <>
      {(source || actions) && <Footer {...{ actions, severity, source }} />}
    </>}
  </SAlert>
}
