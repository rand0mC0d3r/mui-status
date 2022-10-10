import { Box, SvgIcon, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme: { palette: { action: { active: string } } }) => ({
  box: {
    gap: '4px',
    color: theme.palette.action.active,
  },
  svgIcon: {
    fontSize: 20
  },
  typography: {
    lineHeight: '0px',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  img: {
    width: '20px',
    height: '20px',
  },
}))
/**
 *
 * @param icon - (ReactNode) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string) Text to display for status element.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status element
 */
export default function ({
  icon,
  text,
  image,
  mask = false,
  reverse = false,
  className,
  style,
} : {
  icon?: React.ReactNode,
  text?: string,
  image?: string,
  mask?: boolean,
  reverse?: boolean,
  className?: React.HTMLAttributes<HTMLDivElement>['className'],
  style?: React.CSSProperties,
}) {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <Box {...{
    style,
    flexDirection: reverse ? 'row-reverse' : 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    className: clsx([classes.box, className]),
  }}
  >
    {icon && <SvgIcon {...{ className: classes.svgIcon, color: 'action' }}>{icon}</SvgIcon>}
    {text && <Typography {...{ className: classes.typography, variant: 'subtitle2', color: 'textPrimary' }}>{text}</Typography>}
    {image && <img {...{ alt: '', className: classes.img, style: { borderRadius: mask ? '50%' : '0px' }, src: image }} />}
  </Box>
}
