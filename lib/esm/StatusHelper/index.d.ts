import { CSSProperties, HTMLAttributes } from 'react';
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
export default function ({ icon, text, notifications, image, mask, reverse, reverseIcon, children, childrenIndex, className, style, }: {
    icon?: JSX.Element;
    text?: string;
    notifications?: string | number;
    image?: string;
    mask?: boolean;
    reverse?: boolean;
    reverseIcon?: boolean;
    children?: JSX.Element;
    childrenIndex?: number;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    style?: CSSProperties;
}): JSX.Element;
