import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
/**
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
export default function ({ icon, text, notifications, boldText, image, mask, reverse, reverseIcon, className, style, }: {
    icon?: ReactNode;
    text?: string;
    notifications?: number;
    boldText?: string | number;
    image?: string;
    mask?: boolean;
    reverse?: boolean;
    reverseIcon?: boolean;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    style?: CSSProperties;
}): JSX.Element;
