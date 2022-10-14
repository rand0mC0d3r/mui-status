import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import DataProvider from '../../MuiStore';
export default function (_a) {
    var tooltip = _a.tooltip, children = _a.children;
    var tooltipComponent = useContext(DataProvider).tooltipComponent;
    return _jsx(_Fragment, { children: (tooltipComponent !== undefined && tooltip) ? tooltipComponent(tooltip, _jsx("span", { children: children })) : children });
}
