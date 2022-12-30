/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, useEffect, useState } from 'react'
import { SettingsObject, StatusObject } from '../../index.types'
import DataProvider from '../../Store'

const StyledActionsWrapper = styled('div')(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.divider}`,
  userSelect: 'none',
  alignItems: 'center'
}))

const StyledActions = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: `${theme.shape.borderRadius}px`,
  justifyContent: 'flex-end',
  alignItems: 'center'
}))

const StyledTypography = styled(Typography)(() => ({
  lineHeight: 1
}))

export default function ({
  id,
  popoverTitle,
  popoverActions,
  keepOpen,
  setKeepOpen
} : {
  id: string,
  popoverTitle?: string,
  popoverActions?: any,
  keepOpen?: boolean,
  setKeepOpen?: any
}) {
  const {
    status,
    settings,
  } : {
    status: StatusObject[],
    settings: SettingsObject,
  } = useContext(DataProvider)
  const [statusObject, setStatusObject] = useState<StatusObject | null>(null)

  useEffect(() => {
    const foundObject = status.find(item => item.uniqueId === id)
    if (statusObject === null && foundObject) {
      setStatusObject(foundObject)
    }
  }, [status, id, statusObject])

  return <StyledActionsWrapper>
    <StyledTypography variant="caption" color="textSecondary">{popoverTitle}</StyledTypography>
    <StyledActions>
      {popoverActions}
      {settings.hasLock && <Tooltip title="Toggle keep-open">
        {keepOpen
          ? <LockOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} color="primary" style={{ fontSize: 14 }} />
          : <LockOpenOutlinedIcon onClick={() => setKeepOpen(!keepOpen)} style={{ fontSize: 14 }} />}
      </Tooltip>}
    </StyledActions>
  </StyledActionsWrapper>
}
