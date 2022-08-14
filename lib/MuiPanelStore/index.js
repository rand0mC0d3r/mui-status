"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuiPanelProvider = MuiPanelProvider;
exports.default = void 0;

var _react = require("react");

var _MuiWrapper = _interopRequireDefault(require("../MuiWrapper"));

var _excluded = ["expand", "position", "allowRightClick", "debug", "tooltipComponent", "popoverComponent", "children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var settingsStorageKey = 'material-ui-panel.settings';
var statusStorageKey = 'material-ui-panel.status';
var DataContext = /*#__PURE__*/(0, _react.createContext)(null);

function MuiPanelProvider(_ref) {
  var _ref$expand = _ref.expand,
      expand = _ref$expand === void 0 ? true : _ref$expand,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'top' : _ref$position,
      _ref$allowRightClick = _ref.allowRightClick,
      allowRightClick = _ref$allowRightClick === void 0 ? true : _ref$allowRightClick,
      debug = _ref.debug,
      tooltipComponent = _ref.tooltipComponent,
      popoverComponent = _ref.popoverComponent,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var _useState = (0, _react.useState)(props['status'] || []),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      storedStatus = _useState4[0],
      setStoredStatus = _useState4[1];

  (0, _react.useEffect)(function () {
    var storedStatusLocal = localStorage.getItem(statusStorageKey);

    if (storedStatusLocal) {
      setStoredStatus(JSON.parse(storedStatusLocal));
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (storedStatus.length > 0) {
      setStatus(function (status) {
        return status.map(function (statusItem) {
          var found = storedStatus.find(function (ss) {
            return ss.uniqueId === statusItem.uniqueId;
          });
          return found ? _objectSpread(_objectSpread({}, statusItem), found) : statusItem;
        });
      });
    }
  }, [storedStatus]);

  var _useState5 = (0, _react.useState)(props['settings'] || {
    expand: true,
    statusBarAnnounced: false,
    allowRightClick: false,
    debug: false
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      settings = _useState6[0],
      setSettings = _useState6[1];

  var handleStatusAnnouncement = function handleStatusAnnouncement(_ref2) {
    var id = _ref2.id,
        secondary = _ref2.secondary;
    setStatus(function (status) {
      return [].concat(_toConsumableArray(status.filter(function (lo) {
        return lo.uniqueId !== id;
      })), [{
        index: status.length,
        uniqueId: id,
        visible: true,
        secondary: secondary
      }]);
    });
  };

  var handleStatusUpdate = function handleStatusUpdate(_ref3) {
    var id = _ref3.id,
        children = _ref3.children;
    console.log('handleStatusUpdate', id, children);
    setStatus(function (status) {
      return status.map(function (lo) {
        return lo.uniqueId !== id ? lo : _objectSpread(_objectSpread({}, lo), {}, {
          children: children
        });
      });
    });
  };

  var handleStatusVisibilityToggle = function handleStatusVisibilityToggle(_ref4) {
    var id = _ref4.id;
    setStatus(function (status) {
      return status.map(function (lo) {
        return lo.uniqueId === id ? _objectSpread(_objectSpread({}, lo), {}, {
          visible: !lo.visible
        }) : lo;
      });
    });
  };

  var handleStatusDestroy = function handleStatusDestroy(_ref5) {
    var id = _ref5.id;
    setStatus(function (status) {
      return _toConsumableArray(status.filter(function (lo) {
        return lo.uniqueId !== id;
      }));
    });
  };

  var triggerStatusBarAnnounced = function triggerStatusBarAnnounced() {
    if (!settings.statusBarAnnounced) {
      setSettings(function (settings) {
        return _objectSpread(_objectSpread({}, settings), {}, {
          statusBarAnnounced: true
        });
      });
    }
  };

  (0, _react.useEffect)(function () {
    return setSettings(function (settings) {
      return _objectSpread(_objectSpread({}, settings), {}, {
        expand: expand,
        position: position,
        allowRightClick: allowRightClick,
        debug: debug
      });
    });
  }, [allowRightClick, expand, position, debug]);
  (0, _react.useEffect)(function () {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  }, [settings]);
  (0, _react.useEffect)(function () {
    localStorage.setItem(statusStorageKey, JSON.stringify(status.map(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        children: undefined
      });
    })));
  }, [status]);
  (0, _react.useEffect)(function () {
    if (settings.debug) {
      console.log('MuiPanelProvider:', _objectSpread(_objectSpread({}, settings), status));
    }
  }, [settings, status]);
  return /*#__PURE__*/React.createElement(DataContext.Provider, {
    id: "provider",
    value: {
      // passthru props
      tooltipComponent: tooltipComponent,
      popoverComponent: popoverComponent,
      // settings state + crud
      settings: settings,
      setSettings: setSettings,
      // status - wrapper
      triggerStatusBarAnnounced: triggerStatusBarAnnounced,
      // status state + crud
      status: status,
      handleStatusVisibilityToggle: handleStatusVisibilityToggle,
      handleStatusUpdate: handleStatusUpdate,
      handleStatusAnnouncement: handleStatusAnnouncement,
      handleStatusDestroy: handleStatusDestroy
    }
  }, /*#__PURE__*/React.createElement(_MuiWrapper.default, {
    children: children
  }));
}

var _default = DataContext;
exports.default = _default;