import { SvgIcon, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const StyledBox = styled('div')<{ reverse?: boolean | undefined }>(({ theme, reverse }) => ({
  gap: `${theme.shape.borderRadius}px`,
  color: theme.palette.action.active,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  userSelect: 'none',
  flexDirection: reverse ? 'row-reverse' : 'row',
  WebkitFontSmoothing: 'antialiased',
  shapeRendering: 'geometricPrecision',
}))

const StyledSvgIcon = styled(SvgIcon)<{ reversed?: boolean | undefined }>(({ theme, reversed }) => ({
  fontSize: theme.typography.h6.fontSize,
  transform: reversed ? 'scaleX(-1)' : 'scaleX(1)',
}))

const StyledTypography = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  userSelect: 'none',
  fontSize: '12px',
  lineHeight: 'inherit',
}))

const StyledBoldTypography = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  userSelect: 'none',
  fontSize: '12px',
  lineHeight: 'inherit',
  fontWeight: 'bold',
}))

const StyledNotificationsTypography = styled(Typography)(({ theme }) => ({
  borderRadius: '8px',
  padding: '0px 6px',
  fontSize: '10px',
  backgroundColor: theme.palette.divider,
  boxShadow: `0px 0px 1px 1px ${theme.palette.background.default}6`,
  color: theme.palette.text.primary,
}))

const StyledImg = styled('img')(() => ({
  width: '18px',
  height: '18px',
}))

/**
 *
 * @param icon - (ReactNode) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string | number) Text to display for status element.
 * @param notifications - (number) Badge to display relevant notifications.
 * @param boldText - (string | number) Text to display in a heavier way.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements.
 * @param reverseIcon - (boolean) If needs to be applied a reverse of the given icon.
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status element
 */
export default function ({
  icon,
  text,
  notifications,
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
  notifications?: number,
  boldText?: string | number,
  image?: string,
  mask?: boolean,
  reverse?: boolean,
  reverseIcon?: boolean,
  className?: HTMLAttributes<HTMLDivElement>['className'],
  style?: CSSProperties,
}) {
  return <StyledBox {...{ style, className, reverse }}>
    {icon && <StyledSvgIcon {...{ color: 'action' }} reversed={reverseIcon}>{icon}</StyledSvgIcon>}
    {image && <StyledImg {...{ alt: '', style: { borderRadius: mask ? '50%' : '0px' }, src: image }} />}
    {notifications && <StyledNotificationsTypography {...{ variant: 'subtitle2', color: 'textPrimary' }}>{notifications}</StyledNotificationsTypography>}
    {boldText && <StyledBoldTypography {...{ variant: 'caption', color: 'textPrimary' }}>{boldText}</StyledBoldTypography>}
    {text && <StyledTypography {...{ variant: 'caption', color: 'textPrimary' }}>{text}</StyledTypography>}
  </StyledBox>
}
