import { Box, SvgIcon, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const StyledBox = styled(Box)(({ theme }) => ({
  gap: '4px',
  color: theme.palette.action.active,
}))

const StyledSvgIcon = styled(SvgIcon)(() => ({
  fontSize: 20
}))

const StyledTypography = styled(Typography)(() => ({
  lineHeight: '0px',
  whiteSpace: 'nowrap',
  userSelect: 'none',
}))

const StyledImg = styled('img')(() => ({
  width: '20px',
  height: '20px',
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
  return <StyledBox {...{
    style,
    className,
    flexDirection: reverse ? 'row-reverse' : 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  }}
  >
    {icon && <StyledSvgIcon {...{ color: 'action' }}>{icon}</StyledSvgIcon>}
    {text && <StyledTypography {...{ variant: 'subtitle2', color: 'textPrimary' }}>{text}</StyledTypography>}
    {image && <StyledImg {...{ alt: '', style: { borderRadius: mask ? '50%' : '0px' }, src: image }} />}
  </StyledBox>
}
