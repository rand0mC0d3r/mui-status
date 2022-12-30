/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, useEffect, useState } from 'react'
import DataProvider from '../../../../Store'

const SHeader = styled('div')<{ expanded: string }>(({ expanded }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: expanded === 'true' ? '8px' : '0px',
  marginTop: expanded === 'true' ? '-4px' : '0px',
  justifyContent: 'space-between',
  width: '100%',
}))

const SActionButtons = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
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
  lineHeight: ellipsis === 'true' ? 'initial' : '1.65',
}))

export default function ({
  uniqueId,
  actions,
  severity,
  message,
  isRemoveFlag = false,
}: {
  uniqueId: string,
  actions?: any,
  severity: any,
  message: string,
  isRemoveFlag?: boolean,
}) {
  const { handleSnackbarDestroy } = useContext(DataProvider)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    if (actions?.length > 0) return
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

  return <SHeader expanded={isExpanded.toString()}>
    {(isExpanded)
      ? <STitle onDoubleClick={toggleExpanded} variant="subtitle1" color="inherit">{severity}</STitle>
      : <>
        {!actions
          ? <>{getMessage(true)}</>
          : <STitle onDoubleClick={toggleExpanded} variant="subtitle1" color="inherit">{severity}</STitle>}
      </>}
    <SActionButtons>
      {!actions && <Tooltip arrow title="Expand/Collapse alert">
        <IconButton color="inherit" size="small" onClick={toggleExpanded}>
          {!isExpanded
            ? <ExpandMoreIcon fontSize="small" />
            : <ExpandLessIcon fontSize="small" />}
        </IconButton>
        </Tooltip>}
      <Tooltip arrow title={isRemoveFlag ? 'Close alert' : 'Dismiss alert'}>
        <IconButton color="inherit" onClick={closeAlert} size="small">
          {isRemoveFlag ? <CloseIcon fontSize="small" /> : <ArrowForwardIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </SActionButtons>
  </SHeader>
}
