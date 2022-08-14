"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _MuiStore = _interopRequireDefault(require("../MuiStore"));

var _InternalStatus = _interopRequireDefault(require("../MuiStatusBar/InternalStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function () {
  return {
    box: {
      height: '100%',
      width: '100%',
      position: 'absolute'
    },
    children: {
      flex: '1 1 auto'
    }
  };
});

var MuiWrapper = function MuiWrapper(_ref) {
  var children = _ref.children;

  var _useContext = (0, _react.useContext)(_MuiStore.default),
      settings = _useContext.settings;

  var classes = useStyles();
  return /*#__PURE__*/React.createElement(_core.Box, {
    id: "MuiPanelManager",
    display: "flex",
    flexDirection: settings.position === 'top' ? 'column-reverse' : 'column',
    className: classes.box
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.children
  }, children), /*#__PURE__*/React.createElement("div", {
    id: "muiStatus-statusBar"
  }, !settings.statusBarAnnounced && /*#__PURE__*/React.createElement(_InternalStatus.default, null)));
};

MuiWrapper.propTypes = {
  children: _propTypes.default.any.isRequired
};
var _default = MuiWrapper;
exports.default = _default;