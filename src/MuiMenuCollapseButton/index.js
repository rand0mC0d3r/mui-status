import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from '../MuiPanelStore';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'absolute',
		zIndex: 1,
		bottom: theme.spacing(4),
		boxShadow: `inset -1px 0px 1px 0px ${theme.palette.divider}`,
		border: `1px solid ${theme.palette.divider}`,
		backgroundColor: theme.palette.background.paper,
	},
}))

const MuiMenuCollapseButton = withTheme(({ theme, side }) => {
	const { settings, toggleSettingIsCollapsed } = useContext(DataProvider);
	const classes = useStyles(theme)

	return <Tooltip
		placement={side}
		arrow
		title={settings.isCollapsed
			? 'Expand Panel'
			: 'Minimize Panel'}
	>
		<IconButton
			className={classes.root}
			size="small"
			style={{
				right: side === 'left' && '-24px',
				left: side === 'right' && '-24px',
				borderRadius: side === 'right'
					? `${theme.shape.borderRadius}px 0px 0px ${theme.shape.borderRadius}px`
					: `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
			}}
			onClick={toggleSettingIsCollapsed}
		>
			{side === 'right' && (settings.isCollapsed
				? <ArrowLeft style={{ fontSize: 16 }} />
				: <ArrowRight style={{ fontSize: 16 }} />)}
			{side === 'left' && (settings.isCollapsed
				? <ArrowRight style={{ fontSize: 16 }} />
				: <ArrowLeft style={{ fontSize: 16 }} />)}
		</IconButton>
	</Tooltip>
})

MuiMenuCollapseButton.defaultProps = {
	side: 'right',
}

MuiMenuCollapseButton.propTypes = {
	side: PropTypes.oneOf(['left', 'right']),
}

export default MuiMenuCollapseButton;
