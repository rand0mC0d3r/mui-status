/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import MuiStatus from './MuiStatus';
import MuiStatusBar from './MuiStatusBar';
import MuiStatusChild from './MuiStatusChild';
import MuiStatusPanel from './MuiStatusPanel';
var SayHello = function (_a) {
    var name = _a.name;
    return (React.createElement("div", null,
        "Hey ",
        name,
        ", tester"));
};
export default SayHello;
export { MuiStatusChild, MuiStatusPanel, MuiStatus, MuiStatusBar };
// do not export Wrapper
