import { Stack, SvgIcon, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CSSProperties, HTMLAttributes } from 'react'

const SStack = styled(Stack)<{ reverse: string }>(({ theme, reverse }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  userSelect: 'none',
  WebkitFontSmoothing: 'antialiased',
  shapeRendering: 'geometricPrecision',

  gap: `${theme.spacing(0.5)}`,
  flexDirection: reverse === 'true' ? 'row-reverse' : 'row',
}))

const SIcon = styled(SvgIcon)<{ reverse: string }>(({ reverse }) => ({
  fontSize: '14px',
  width: '14px',
  height: '14px',
  flex: '0 1 100%',

  transform: reverse === 'true' ? 'scaleX(-1)' : 'scaleX(1)',
}))

const SText = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  userSelect: 'none',
  fontSize: '12px',
  lineHeight: 'inherit',
}))

const SNotifications = styled(Typography)(({ theme }) => ({
  padding: '0px 6px',
  lineHeight: '1.3',
  fontSize: '10px',

  color: theme.palette.text.primary,
  borderRadius: `${theme.shape.borderRadius * 2}px`,
  backgroundColor: theme.palette.divider,
  border: `0.5px solid ${theme.palette.divider}`,
}))

const SImg = styled('img')<{ mask: string }>(({ mask }) => ({
  width: '18px',
  height: '18px',
  borderRadius: mask === 'true' ? '50%' : '0px',
}))

/**
 * @param icon - (JSX.Element) Icon to display for status element. Expects a Material UI SvgIcon component.
 * @param text - (string | number) Text to display for status element.
 * @param notifications - (string | number) Badge to display relevant notifications.
 * @param image - (string) Image to display for status element. Expects a valid image path.
 * @param mask - (boolean) If needs to be applied a circular mask to the image.
 * @param reverse - (boolean) If needs to be applied a reverse of the default order of the elements.
 * @param reverseIcon - (boolean) If needs to be applied a reverse of the given icon.
 * @param className - (HTMLAttribute) Class name to be applied to the root element.
 * @param style - (CSSProperties) Style to be applied to the root element.
 *
 * @returns (JSX.Element) Status helper element
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
  icon?: JSX.Element,
  text?: string,
  notifications?: string | number,
  image?: string,
  mask?: boolean,
  reverse?: boolean,
  reverseIcon?: boolean,
  className?: HTMLAttributes<HTMLDivElement>['className'],
  style?: CSSProperties,
}) {
  return <SStack {...{ id: 'statusHelper', style, className, reverse: reverse.toString() }}>
    {icon && <SIcon {...{ id: 'sh.icon', reverse: reverseIcon.toString() }}>{icon}</SIcon>}
    {image && <SImg {...{ id: 'sh.image', alt: 'Status entry', mask: mask.toString(), src: image }} />}
    {notifications && <SNotifications {...{ id: 'sh.notifications' }}>{notifications}</SNotifications>}
    {text && <SText {...{ id: 'sh.text', variant: 'caption' }}>{text}</SText>}
  </SStack>
}
