import { Box, SvgIcon, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  box: {
    gap: '4px',
    color: theme.palette.action,
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
    height: '20px',
  }
}))

const MupStatusChild = ({
  icon,
  text,
  image,
  mask,
  className,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return <Box
    display="flex"
    alignItems="center"
    flexWrap="nowrap"
    className={clsx([classes.box, className])}
  >
    {icon && <SvgIcon
      id="MupStatus_icon"
      className={classes.icon}
      color='action'
    >
      {icon}
    </SvgIcon>}

    {text && <Typography
      id="MupStatus_text"
      variant="subtitle2"
      color="textPrimary"
      className={classes.typography}
    >
      {text}
    </Typography>}

    {image && <img
      id="MupStatus_image"
      alt="injected element"
      className={classes.image}
      style={{ borderRadius: mask ? '50%' : '0px' }}
      src={image} />}
  </Box>
}

MupStatusChild.defaultProps = {
  mask: false,
}

MupStatusChild.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string,
  image: PropTypes.any,
  mask: PropTypes.bool,
  className: PropTypes.any,
}

export default MupStatusChild
