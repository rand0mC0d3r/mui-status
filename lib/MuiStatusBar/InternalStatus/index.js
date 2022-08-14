"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _CheckBoxOutlineBlankOutlined = _interopRequireDefault(require("@material-ui/icons/CheckBoxOutlineBlankOutlined"));

var _CheckBoxOutlined = _interopRequireDefault(require("@material-ui/icons/CheckBoxOutlined"));

var _react = require("react");

var _MuiStore = _interopRequireDefault(require("../../MuiStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    statusBar: {
      gap: '4px',
      display: 'flex',
      minHeight: '28px',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.type === 'light' ? theme.palette.augmentColor({
        main: theme.palette.divider
      }).dark : theme.palette.background.paper,
      color: "".concat(theme.palette.background.default, " !important")
    },
    upper: {
      borderBottom: "1px solid ".concat(theme.palette.divider),
      borderTop: 'none'
    },
    lower: {
      borderBottom: 'none',
      borderTop: "1px solid ".concat(theme.palette.divider)
    },
    child: {
      display: 'flex',
      flexWrap: 'nowrap'
    },
    statusEntry: {
      display: 'flex',
      flexDirection: 'row',
      gap: '16px',
      padding: '8px'
    },
    statusEntryItem: {
      display: 'flex',
      minWidth: '165px',
      flexDirection: 'row',
      gap: '4px',
      padding: '4px 8px',
      '&:hover': {
        backgroundColor: "".concat(theme.palette.augmentColor({
          main: theme.palette.primary.light
        }).light, " !important"),
        color: "".concat(theme.palette.background.default, " !important")
      }
    },
    primary: {
      overflow: 'scroll',
      justifyContent: 'flex-start',
      scrollSnapType: 'both mandatory',
      gap: '4px',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    secondary: {
      overflow: 'hidden',
      flexWrap: 'nowrap',
      justifyContent: 'flex-end',
      alignItems: 'center',
      scrollSnapType: 'both mandatory',
      gap: '4px',
      flex: '1 1 auto',
      width: '0px',
      minWidth: '80px',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  };
});

var _default = function _default(_ref) {
  var style = _ref.style,
      className = _ref.className;
  var theme = (0, _styles.useTheme)();

  var _useContext = (0, _react.useContext)(_MuiStore.default),
      status = _useContext.status,
      settings = _useContext.settings,
      handleStatusVisibilityToggle = _useContext.handleStatusVisibilityToggle,
      tooltipComponent = _useContext.tooltipComponent;

  var classes = useStyles(theme);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var open = Boolean(anchorEl);

  var onClose = function onClose() {
    return setAnchorEl(null);
  };

  var statusEntry = function statusEntry(s) {
    return /*#__PURE__*/React.createElement("div", {
      className: classes.statusEntryItem,
      onClick: function onClick() {
        return handleStatusVisibilityToggle({
          id: s.uniqueId
        });
      }
    }, s.visible ? /*#__PURE__*/React.createElement(_CheckBoxOutlined.default, null) : /*#__PURE__*/React.createElement(_CheckBoxOutlineBlankOutlined.default, null), s.children);
  };

  var entryWrapper = function entryWrapper(s) {
    return /*#__PURE__*/React.createElement(_react.Fragment, {
      key: s.uniqueId
    }, tooltipComponent !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, tooltipComponent('Toggle visibility of tile', statusEntry(s))) : statusEntry(s));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, status.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: style,
    id: "mui-status-statusBar-wrapper",
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
      setAnchorEl(e.currentTarget);
    },
    className: [className, classes.statusBar, settings.position === 'top' ? classes.upper : classes.lower].filter(function (e) {
      return !!e;
    }).join(' ')
  }, ['primary', 'secondary'].map(function (side, i) {
    return /*#__PURE__*/React.createElement("div", {
      id: "mui-status-statusBar-".concat(side),
      key: "".concat(side, "_status"),
      className: [classes.child, i === 0 ? classes.primary : classes.secondary].filter(function (e) {
        return !!e;
      }).join(' ')
    });
  })), /*#__PURE__*/React.createElement(_core.Popover, {
    open: open,
    anchorEl: anchorEl,
    onClose: onClose,
    elevation: 1,
    id: 'toggle-status-popover',
    anchorOrigin: {
      vertical: settings.upperBar ? 'top' : 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: !settings.upperBar ? 'bottom' : 'top',
      horizontal: 'center'
    },
    style: {
      marginTop: "".concat((settings.upperBar ? 1 : -1) * 12, "px")
    }
  }, /*#__PURE__*/React.createElement("div", {
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
    },
    className: classes.statusEntry
  }, /*#__PURE__*/React.createElement("div", null, status.filter(function (s) {
    return !s.secondary;
  }).map(function (s) {
    return entryWrapper(s);
  })), /*#__PURE__*/React.createElement("div", null, status.filter(function (s) {
    return s.secondary;
  }).map(function (s) {
    return entryWrapper(s);
  })))));
};

exports.default = _default;