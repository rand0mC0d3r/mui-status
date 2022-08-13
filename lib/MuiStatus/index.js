"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styles = require("@material-ui/core/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _reactDom = require("react-dom");

var _MuiPanelStore = _interopRequireDefault(require("../MuiPanelStore"));

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

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    default: {
      WebkitFontSmoothing: 'auto',
      height: '100%',
      padding: '0px 4px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      justifyContent: 'center',
      alignSelf: 'stretch',
      position: 'relative'
    },
    interactive: {
      cursor: 'pointer'
    },
    actionNormal: {
      '&:hover': {
        backgroundColor: "".concat(theme.palette.augmentColor({
          main: theme.palette.divider
        }).light, " !important")
      }
    },
    actionHighlightSecondary: {
      '&:hover': {
        backgroundColor: "".concat(theme.palette.augmentColor({
          main: theme.palette.secondary.main
        }).dark, " !important"),
        color: "".concat(theme.palette.background.default, " !important")
      }
    },
    actionHighlightPrimary: {
      '&:hover': {
        backgroundColor: "".concat(theme.palette.augmentColor({
          main: theme.palette.primary.main
        }).dark, " !important"),
        color: "".concat(theme.palette.background.default, " !important")
      }
    },
    hightlight: {
      backgroundColor: theme.palette.secondary.main,
      '& > div > *': {
        color: "".concat(theme.palette.background.default, " !important")
      }
    },
    hightlightPrimary: {
      backgroundColor: theme.palette.primary.main,
      '& > div > *': {
        color: "".concat(theme.palette.background.default, " !important")
      }
    }
  };
});

var MuiStatus = function MuiStatus(_ref) {
  var id = _ref.id,
      secondary = _ref.secondary,
      style = _ref.style,
      _ref$onClick = _ref.onClick,
      _onClick = _ref$onClick === void 0 ? false : _ref$onClick,
      _onContextMenu = _ref.onContextMenu,
      _ref$highlight = _ref.highlight,
      highlight = _ref$highlight === void 0 ? 'default' : _ref$highlight,
      tooltip = _ref.tooltip,
      children = _ref.children;

  var _useContext = (0, _react.useContext)(_MuiPanelStore.default),
      status = _useContext.status,
      settings = _useContext.settings,
      tooltipComponent = _useContext.tooltipComponent,
      handleStatusUpdate = _useContext.handleStatusUpdate,
      handleStatusAnnouncement = _useContext.handleStatusAnnouncement,
      handleStatusDestroy = _useContext.handleStatusDestroy;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      statusObject = _useState2[0],
      setStatusObject = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      elementFound = _useState4[0],
      setElementFound = _useState4[1];

  var theme = (0, _styles.useTheme)();
  var classes = useStyles(theme);
  var callbackOnClick = (0, _react.useCallback)(function (e) {
    _onClick(e);
  }, [_onClick]);
  (0, _react.useEffect)(function () {
    var elementSearched = document.getElementById("material-ui-panel-statusBar-".concat(secondary ? 'secondary' : 'primary'));

    if (elementSearched !== null) {
      setElementFound(elementSearched);
    }
  }, [secondary, statusObject]);
  var callbackHandleStatusAnnouncement = (0, _react.useCallback)(function (id) {
    handleStatusAnnouncement({
      id: id,
      secondary: secondary,
      children: children
    });
  }, [secondary, children, handleStatusAnnouncement]);
  var callbackHandleStatusDestroy = (0, _react.useCallback)(function () {
    handleStatusDestroy({
      id: id
    });
  }, [id]);
  (0, _react.useEffect)(function () {
    return function () {
      callbackHandleStatusDestroy();
    };
  }, [callbackHandleStatusDestroy]);
  (0, _react.useEffect)(function () {
    if (id && statusObject === null && !status.some(function (item) {
      return item.uniqueId === id;
    })) {
      callbackHandleStatusAnnouncement(id);
    }
  }, [id, statusObject, status, callbackHandleStatusAnnouncement]);
  (0, _react.useEffect)(function () {
    var foundObject = status.find(function (item) {
      return item.uniqueId === id;
    });

    if ((statusObject === null || (statusObject === null || statusObject === void 0 ? void 0 : statusObject.visible) !== (foundObject === null || foundObject === void 0 ? void 0 : foundObject.visible)) && foundObject) {
      setStatusObject(foundObject);
    }
  }, [status, id, statusObject]);

  var generateClasses = function generateClasses() {
    return (0, _clsx.default)([classes.default, highlight !== 'default' && classes.hightlight, highlight === 'primary' && classes.hightlightPrimary, _onClick && [classes.interactive, highlight === 'default' && classes.actionNormal, highlight !== 'default' && classes.actionHighlight, highlight === 'primary' && classes.actionHighlightPrimary, highlight === 'secondary' && classes.actionHighlightSecondary]]);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, statusObject !== null && !!id && elementFound && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/(0, _reactDom.createPortal)(statusObject.visible ? /*#__PURE__*/React.createElement("div", {
    id: id,
    key: "MupStatus_".concat(id, "_wrapper"),
    onClick: function onClick(e) {
      _onClick ? callbackOnClick(e) : null;
      handleStatusUpdate({
        id: id,
        children: children
      });
    },
    onContextMenu: function onContextMenu(e) {
      return settings.allowRightClick ? _onContextMenu ? _onContextMenu(e) : null : e.preventDefault();
    },
    className: generateClasses(),
    style: _objectSpread(_objectSpread({}, style), {}, {
      order: statusObject.index
    })
  }, tooltipComponent !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, tooltipComponent(tooltip, /*#__PURE__*/React.createElement("span", null, children))) : children) : /*#__PURE__*/React.createElement(React.Fragment, null), elementFound)));
};

MuiStatus.defaultProps = {
  secondary: false,
  highlight: 'default',
  tooltip: '',
  asButton: false
};
MuiStatus.propTypes = {
  id: _propTypes.default.string.isRequired,
  secondary: _propTypes.default.bool,
  asMenu: _propTypes.default.any,
  style: _propTypes.default.any,
  onClick: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  highlight: _propTypes.default.oneOf(['default', 'primary', 'secondary']),
  tooltip: _propTypes.default.any,
  children: _propTypes.default.any
};
var _default = MuiStatus;
exports.default = _default;