"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _react = require("react");

var _MuiStore = _interopRequireDefault(require("../MuiStore"));

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
    root: {
      position: 'absolute',
      border: "2px dotted ".concat(theme.palette.divider),
      borderRadius: '8px',
      backgroundColor: "".concat(theme.palette.background.paper, "c"),
      backdropFilter: 'blur(10px)',
      padding: '8px',
      left: '100px',
      right: '100px',
      top: '100px',
      bottom: '100px',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    dumpText: {
      margin: '0px'
    },
    dataSourceWrapper: {
      display: 'flex',
      padding: '8px 8px',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '16px'
    },
    header: {
      backgroundColor: theme.palette.background.default,
      padding: '8px',
      border: "1px solid ".concat(theme.palette.divider),
      borderRadius: '4px',
      cursor: 'pointer'
    },
    storeElement: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: '8px',
      border: "1px solid ".concat(theme.palette.divider),
      padding: '8px',
      color: theme.palette.text.secondary,
      borderRadius: '8px',
      '&:hover': {
        border: "1px solid ".concat(theme.palette.primary.main),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }
    }
  };
});

var MupDebug = function MupDebug() {
  var _useContext = (0, _react.useContext)(_MuiStore.default),
      settings = _useContext.settings,
      status = _useContext.status;

  var localStorageKey = 'material-ui-panel.debug';
  var theme = (0, _styles.useTheme)();
  var classes = useStyles(theme);

  var _useState = (0, _react.useState)([{
    title: 'Status',
    collapsed: true
  }, {
    title: 'Settings',
    collapsed: true
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      dumps = _useState2[0],
      setDumps = _useState2[1];

  (0, _react.useEffect)(function () {
    var storedDumpSettings = localStorage.getItem(localStorageKey);

    if (storedDumpSettings) {
      setDumps(JSON.parse(storedDumpSettings));
    }
  }, []);
  (0, _react.useEffect)(function () {
    localStorage.setItem(localStorageKey, JSON.stringify(dumps.map(function (_ref) {
      var title = _ref.title,
          collapsed = _ref.collapsed;
      return {
        title: title,
        collapsed: collapsed
      };
    })));
  }, [dumps]);
  (0, _react.useEffect)(function () {
    setDumps(function (dumps) {
      return dumps.map(function (d) {
        if (d.title === 'Settings') {
          return _objectSpread(_objectSpread({}, d), {}, {
            dataSource: Object.entries(settings).map(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  val = _ref3[1];

              return /*#__PURE__*/React.createElement("div", {
                key: "settings_".concat(key),
                className: classes.storeElement
              }, /*#__PURE__*/React.createElement("pre", {
                key: "settings_".concat(key),
                className: classes.dumpText
              }, key, ": ", JSON.stringify(val)));
            })
          });
        }

        return d;
      });
    });
  }, [settings, classes.dumpText]);
  (0, _react.useEffect)(function () {
    setDumps(function (dumps) {
      return dumps.map(function (d) {
        if (d.title === 'Status') {
          return _objectSpread(_objectSpread({}, d), {}, {
            dataSource: status.map(function (obj) {
              return /*#__PURE__*/React.createElement("div", {
                key: "settings_".concat(obj.uniqueId),
                className: classes.storeElement
              }, /*#__PURE__*/React.createElement("pre", null, "children: excluded from dump"), /*#__PURE__*/React.createElement("pre", {
                key: "settings_".concat(obj.uniqueId),
                className: classes.dumpText
              }, JSON.stringify(_objectSpread(_objectSpread({}, obj), {}, {
                children: undefined
              }), null, 2)));
            })
          });
        }

        return d;
      });
    });
  }, [status, classes.dumpText]);

  var toggleDumpCollapse = function toggleDumpCollapse(title) {
    setDumps(function (dumps) {
      return dumps.map(function (dump) {
        if (dump.title === title) dump.collapsed = !dump.collapsed;
        return dump;
      });
    });
  };

  return settings.debugMode ? /*#__PURE__*/React.createElement("div", {
    key: "MupDebug",
    className: classes.root
  }, dumps.map(function (dump) {
    return /*#__PURE__*/React.createElement(_react.Fragment, {
      key: dump.title
    }, /*#__PURE__*/React.createElement(_core.Tooltip, {
      title: "Click to toggle collapse status",
      arrow: true,
      placement: "left"
    }, /*#__PURE__*/React.createElement(_core.Typography, {
      color: "textPrimary",
      className: classes.header,
      onClick: function onClick() {
        return toggleDumpCollapse(dump.title);
      },
      variant: "h6"
    }, dump.title, " (", dump.dataSource && dump.dataSource.length, ")")), !dump.collapsed && /*#__PURE__*/React.createElement("div", {
      className: classes.dataSourceWrapper
    }, dump.dataSource));
  })) : null;
};

var _default = MupDebug;
exports.default = _default;