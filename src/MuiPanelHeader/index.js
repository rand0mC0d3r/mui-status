import { Box, Button, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import React, { cloneElement, useContext } from 'react';
import MuiMenuOptions from '../MuiMenuOptions';
import DataProvider from '../MuiPanelStore';
const fontSize = 20;

const useStyles = makeStyles(theme => ({
  toolbox: {
    gap: theme.spacing(1),
    height: "32px"
  },
  groupIcon: {
    transform: 'rotateZ(90deg)',
    background: theme.palette.divider,
    borderRadius: '4px',
    padding: '4px 2px',
    color: theme.palette.background.paper,
  },
  toolboxButton: {
    padding: "0px",
    width: '28px',
    minWidth: '28px',
    lineHeight: '0px'
  },
  collapseButton: {
    padding: "0px",
    width: theme.spacing(2.5),
    minWidth: theme.spacing(2.5),
    lineHeight: '0px'
  },
  headerContainer: {
    gap: theme.spacing(1),
  },
  panelTitle: {
    maxWidth: '265px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: "initial"
  },
  header: {
    cursor: "default",
    position: "relative",
    gap: theme.spacing(1),
    userSelect: "none",
    padding: theme.spacing(1.5, 2, 1.5, 1),
    borderTop: `1px solid transparent`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    backdropFilter: "blur(4px)",
  },
}));

const MuiPanel = withTheme(({
  layoutObject: { uniqueId, side, iconInHeader, icon, asEmbedded, isCollapsed, title, subTitle, asGroup },
  layoutObject,
  theme,
}) => {
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handleToggleCollapse } = useContext(DataProvider);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return <Box
    justifyContent="space-between"
    onDoubleClick={() => handleToggleCollapse({ uniqueId })}
    alignItems="center"
    onContextMenu={(e) => { e.preventDefault(); handleClick(e) }}
      display="flex"
      className={`${classes.header}`}
  >
    <MuiMenuOptions underMenu={true} {...{lo: layoutObject, side, anchorEl, setAnchorEl}} />
    <Box display="flex" alignItems="center" style={{ gap: theme.spacing(1) }}>

        <Tooltip arrow title="Click to toggle collapse">
          <Button disableRipple disableElevation onClick={() => handleToggleCollapse({ uniqueId })} className={classes.collapseButton}>
            {isCollapsed ? <ChevronRightIcon style={{ fontSize }} /> : <ExpandMoreIcon style={{ fontSize }} />}
          </Button>
        </Tooltip>

        {iconInHeader
          && icon !== undefined
          && cloneElement(icon, { color: 'disabled', style: { fontSize: 20 } })}

        <Box className={classes.headerContainer} flexWrap='wrap' display="flex" alignItems="center">
          <Typography
            color={asEmbedded ? 'textSecondary' : 'textPrimary'}
            className={classes.panelTitle}
            style={{ fontWeight: asEmbedded ? 'bold' : 'bold' }}
            variant='subtitle2'
          >{title}</Typography>
          {subTitle && <Tooltip
            title={subTitle}
            placement='bottom'>
            <InfoOutlinedIcon style={{ fontSize: '16px', color: theme.palette.text.hint }} />
          </Tooltip>}
          {asGroup && <Tooltip
            title="As group..."
            placement='bottom'>
            <AmpStoriesIcon className={classes.groupIcon} style={{ fontSize: '16px', color: theme.palette.background.default }} />
          </Tooltip>}
        </Box>
      </Box>
    <Box display="flex" className={classes.toolbox}>
      <Tooltip title="More options for the panel" arrow>
        <Button size="small" onClick={(e) => { e.preventDefault(); handleClick(e) }}>
          <MoreHorizIcon color={'inherit'} />
        </Button>
      </Tooltip>
      </Box>
    </Box>
})

export default MuiPanel;