"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _MuiPanelStore = _interopRequireDefault(require("../MuiPanelStore"));

var _MuiStatus = _interopRequireDefault(require("../MuiStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MuiStatusPanel = function MuiStatusPanel(_ref) {
  var id = _ref.id,
      secondary = _ref.secondary,
      elevation = _ref.elevation,
      style = _ref.style,
      tooltip = _ref.tooltip,
      children = _ref.children,
      popoverStyle = _ref.popoverStyle,
      popoverClassName = _ref.popoverClassName,
      popover = _ref.popover;

  var _useContext = (0, _react.useContext)(_MuiPanelStore.default),
      status = _useContext.status,
      popoverComponent = _useContext.popoverComponent;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      statusObject = _useState2[0],
      setStatusObject = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      anchorEl = _useState4[0],
      setAnchorEl = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isToggled = _useState6[0],
      setIsToggled = _useState6[1];

  var open = Boolean(anchorEl);
  (0, _react.useEffect)(function () {
    var foundObject = status.find(function (item) {
      return item.uniqueId === id;
    });

    if (statusObject === null && foundObject) {
      setStatusObject(foundObject);
    }
  }, [status, id, statusObject]);

  var onClick = function onClick(e) {
    setAnchorEl(e.currentTarget);
    setIsToggled(e.pageY < screen.height / 2);
  };

  var onClose = function onClose() {
    return setAnchorEl(null);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_MuiStatus.default, {
    id: id,
    tooltip: tooltip,
    secondary: secondary,
    onClick: onClick,
    style: _objectSpread(_objectSpread({}, style), {}, {
      minWidth: '24px'
    })
  }, children), popoverComponent !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, popoverComponent({
    position: isToggled ? 'top' : 'bottom',
    isSecondary: statusObject === null || statusObject === void 0 ? void 0 : statusObject.secondary,
    popover: popover,
    popoverProps: {
      anchorEl: anchorEl,
      onClose: onClose,
      open: open,
      style: {
        marginTop: "".concat((isToggled ? 1 : -1) * 12, "px")
      },
      anchorOrigin: {
        vertical: isToggled ? 'top' : 'bottom',
        horizontal: statusObject !== null && statusObject !== void 0 && statusObject.secondary ? 'right' : 'left'
      },
      transformOrigin: {
        vertical: !isToggled ? 'bottom' : 'top',
        horizontal: statusObject !== null && statusObject !== void 0 && statusObject.secondary ? 'right' : 'left'
      }
    }
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_core.Popover, {
    open: open,
    anchorEl: anchorEl,
    onClose: onClose,
    elevation: elevation,
    id: "".concat(id, "-status-popover"),
    className: popoverClassName,
    style: _objectSpread(_objectSpread({}, popoverStyle), {}, {
      marginTop: "".concat((isToggled ? 1 : -1) * 12, "px")
    }),
    anchorOrigin: {
      vertical: isToggled ? 'top' : 'bottom',
      horizontal: statusObject !== null && statusObject !== void 0 && statusObject.secondary ? 'right' : 'left'
    },
    transformOrigin: {
      vertical: !isToggled ? 'bottom' : 'top',
      horizontal: statusObject !== null && statusObject !== void 0 && statusObject.secondary ? 'right' : 'left'
    }
  }, popover)));
};

MuiStatusPanel.defaultProps = {
  secondary: false,
  tooltip: '',
  elevation: 4
};
MuiStatusPanel.propTypes = {
  id: _propTypes.default.string.isRequired,
  secondary: _propTypes.default.bool,
  style: _propTypes.default.any,
  elevation: _propTypes.default.number,
  tooltip: _propTypes.default.string,
  children: _propTypes.default.any,
  popover: _propTypes.default.any
};
var _default = MuiStatusPanel;
exports.default = _default;