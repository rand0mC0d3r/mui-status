"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    box: {
      gap: '4px',
      color: theme.palette.action.active
    },
    icon: {
      fontSize: 20
    },
    typography: {
      lineHeight: '0px',
      whiteSpace: 'nowrap',
      userSelect: 'none'
    },
    image: {
      width: '20px',
      height: '20px'
    }
  };
});

var MuiStatusChild = function MuiStatusChild(_ref) {
  var icon = _ref.icon,
      text = _ref.text,
      image = _ref.image,
      mask = _ref.mask,
      className = _ref.className,
      style = _ref.style;
  var theme = (0, _styles.useTheme)();
  var classes = useStyles(theme);
  return /*#__PURE__*/React.createElement(_core.Box, {
    style: style,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    className: (0, _clsx.default)([classes.box, className])
  }, icon && /*#__PURE__*/React.createElement(_core.SvgIcon, {
    id: "MupStatus_icon",
    className: classes.icon,
    color: "action"
  }, icon), text && /*#__PURE__*/React.createElement(_core.Typography, {
    id: "MupStatus_text",
    variant: "subtitle2",
    color: "textPrimary",
    className: classes.typography
  }, text), image && /*#__PURE__*/React.createElement("img", {
    id: "MupStatus_image",
    alt: "injected element",
    className: classes.image,
    style: {
      borderRadius: mask ? '50%' : '0px'
    },
    src: image
  }));
};

MuiStatusChild.defaultProps = {
  mask: false
};
MuiStatusChild.propTypes = {
  icon: _propTypes.default.any,
  text: _propTypes.default.string,
  image: _propTypes.default.any,
  mask: _propTypes.default.bool,
  className: _propTypes.default.any
};
var _default = MuiStatusChild;
exports.default = _default;