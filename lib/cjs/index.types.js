"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.PlacementPosition = exports.StatusType = void 0;
var StatusType;
(function (StatusType) {
    StatusType["SIMPLE"] = "simple";
    StatusType["PANEL"] = "panel";
    StatusType["CONSOLE"] = "console";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
var PlacementPosition;
(function (PlacementPosition) {
    PlacementPosition["Top"] = "top";
    PlacementPosition["Bottom"] = "bottom";
})(PlacementPosition = exports.PlacementPosition || (exports.PlacementPosition = {}));
exports.Direction = {
    Top: 'top',
    TopLeft: 'topLeft',
    TopRight: 'topRight',
    Right: 'right',
    Bottom: 'bottom',
    BottomLeft: 'bottomLeft',
    BottomRight: 'bottomRight',
    Left: 'left',
};
