import { SvgIcon, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const StyledBox = styled('div')<{ reverse?: boolean }>(({ theme, reverse }) => ({
  gap: '4px',
  color: theme.palette.action.active,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  flexDirection: reverse ? 'row-reverse' : 'row',
}))

const StyledSvgIcon = styled(SvgIcon)<{ reverseIcon?: boolean }>(({ reverseIcon }) => ({
  fontSize: 20,
  'shape-rendering': 'geometricprecision',
  transform: reverseIcon ? 'scaleX(-1)' : 'scaleX(1)',
}))

const StyledTypography = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  userSelect: 'none',
  lineHeight: '1',
  fontSize: '12px',
  '-webkit-font-smoothing': 'antialiased',
}))

const StyledBoldTypography = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  userSelect: 'none',
  lineHeight: '1',
  fontSize: '14px',
  padding: '0px 4px',
  fontWeight: 'bold',
  '-webkit-font-smoothing': 'antialiased',
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
  boldText,
  image,
  mask = false,
  reverse = false,
  reverseIcon = false,
  className,
  style,
} : {
  icon?: ReactNode,
  text?: string,
  boldText?: string,
  image?: string,
  mask?: boolean,
  reverse?: boolean,
  reverseIcon?: boolean,
  className?: HTMLAttributes<HTMLDivElement>['className'],
  style?: CSSProperties,
}) {
  return <StyledBox {...{ style, className, reverse }}>
    {icon && <StyledSvgIcon {...{ color: 'action', reverseIcon }}>{icon}</StyledSvgIcon>}
    {boldText && <StyledBoldTypography {...{ variant: 'subtitle2', color: 'textPrimary' }}>{boldText}</StyledBoldTypography>}
    {text && <StyledTypography {...{ variant: 'caption', color: 'textPrimary' }}>{text}</StyledTypography>}
    {image && <StyledImg {...{ alt: '', style: { borderRadius: mask ? '50%' : '0px' }, src: image }} />}
  </StyledBox>
}
