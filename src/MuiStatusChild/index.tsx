import { Box, SvgIcon, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme: { palette: { action: { active: any } } }) => ({
  box: {
    gap: '4px',
    color: theme.palette.action.active,
  },
  icon: {
    fontSize: 20
  },
  typography: {
    lineHeight: '0px',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  },
  image: {
    width: '20px',
    height: '20px',
  }
}))

const MuiStatusChild = ({
  icon,
  text,
  image,
  mask = false,
  className,
  style
} : {
  icon?: any,
  text?: string,
  image?: any,
  mask?: boolean,
  className?: any,
  style?: any,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <Box {...{ style }}
    display="flex" alignItems="center" justifyContent="space-between"
    flexWrap="nowrap" className={clsx([classes.box, className])}
  >
    {icon && <SvgIcon
      id="MupStatus_icon"
      className={classes.icon}
      color='action'
    >
      {icon}
    </SvgIcon>}

    {text && <Typography
      id="MupStatus_text"
      variant="subtitle2"
      color="textPrimary"
      className={classes.typography}
    >
      {text}
    </Typography>}

    {image && <img
      id="MupStatus_image"
      alt="injected element"
      className={classes.image}
      style={{ borderRadius: mask ? '50%' : '0px' }}
      src={image} />}
  </Box>
}
export default MuiStatusChild
