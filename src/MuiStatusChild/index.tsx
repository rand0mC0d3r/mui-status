import { Box, SvgIcon, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme: { palette: { action: { active: string } } }) => ({
  boxElem: {
    gap: '4px',
    color: theme.palette.action.active,
  },
  iconElem: {
    fontSize: 20,
  },
  typographyElem: {
    lineHeight: '0px',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  imageElem: {
    width: '20px',
    height: '20px',
  },
}))

export default function ({
  icon,
  text,
  image,
  mask = false,
  className,
  style,
} : {
  icon?: React.ReactNode,
  text?: string,
  image?: string,
  mask?: boolean,
  className?: React.HTMLAttributes<HTMLDivElement>['className'],
  style?: React.CSSProperties,
}) {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <Box {...{
    style,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    className: clsx([classes.boxElem, className]),
  }}
  >
    {icon && <SvgIcon {...{ className: classes.iconElem, color: 'action' }}>
      {icon}
    </SvgIcon>}
    {text && <Typography {...{ variant: 'subtitle2', color: 'textPrimary', className: classes.typographyElem }}>
      {text}
    </Typography>}
    {image && <img {...{
      alt: '', className: classes.imageElem, style: { borderRadius: mask ? '50%' : '0px' }, src: image,
    }}
    />}
  </Box>
}
