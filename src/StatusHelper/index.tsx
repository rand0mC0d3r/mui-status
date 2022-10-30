/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, SvgIcon, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const StyledBox = styled(Stack)<{ reverse: string }>(({ theme, reverse }: { theme: any, reverse: string }) => ({
  gap: `${theme.spacing(0.5)}`,
  color: theme.palette.action.active,
  flexDirection: reverse === 'true' ? 'row-reverse' : 'row',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  userSelect: 'none',
  WebkitFontSmoothing: 'antialiased',
  shapeRendering: 'geometricPrecision',

}))

const StyledSvgIcon = styled(SvgIcon)<{ reverseicon: string }>(({ theme, reverseicon } : { theme: any, reverseicon: string }) => ({
  fontSize: '14px',
  flex: '0 1 100%',
  color: theme.palette.action.active,
  transform: reverseicon === 'true' ? 'scaleX(-1)' : 'scaleX(1)',
}))

const StyledTypography = styled(Typography)(({ theme } : { theme: any }) => ({
  whiteSpace: 'nowrap',
  userSelect: 'none',
  fontSize: theme.typography.caption.fontSize,
  lineHeight: 'inherit',
}))

const StyledNotificationsTypography = styled(Typography)(({ theme } : { theme: any }) => ({
  borderRadius: `${theme.shape.borderRadius * 2}px`,
  padding: '0px 6px',
  lineHeight: '1.3',
  fontSize: '10px',
  backgroundColor: theme.palette.divider,
  border: `0.5px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}))

const StyledImg = styled('img')<{ mask: boolean }>(({ mask } : { mask: boolean }) => ({
  width: '18px',
  height: '18px',
  borderRadius: mask ? '50%' : '0px',
}))

/**
 * @param icon - (ReactNode) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string | number) Text to display for status element.
 * @param notifications - (string | number) Badge to display relevant notifications.
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
  image,
  mask = false,
  reverse = false,
  reverseIcon = false,
  className,
  style,
} : {
  icon?: ReactNode,
  text?: string,
  notifications?: string | number,
  image?: string,
  mask?: boolean,
  reverse?: boolean,
  reverseIcon?: boolean,
  className?: HTMLAttributes<HTMLDivElement>['className'],
  style?: CSSProperties,
}) {
  return <StyledBox id="statusHelper" {...{ style, className, reverse: reverse.toString() }}>
    {icon && <StyledSvgIcon {...{ reverseicon: reverseIcon.toString() }}>{icon}</StyledSvgIcon>}
    {image && <StyledImg {...{ alt: '', mask, src: image }} />}
    {notifications && <StyledNotificationsTypography {...{ variant: 'subtitle2', color: 'textPrimary' }}>
      {notifications}
    </StyledNotificationsTypography>}
    {text && <StyledTypography {...{ variant: 'caption', color: 'textSecondary' }}>{text}</StyledTypography>}
  </StyledBox>
}
