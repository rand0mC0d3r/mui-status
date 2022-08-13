import { Tooltip, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Fragment, useContext, useEffect, useState } from 'react'
import DataProvider from '../../MuiPanelStore'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    border: `2px dotted ${theme.palette.divider}`,
    borderRadius: '8px',
    backgroundColor: `${theme.palette.background.paper}c`,
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
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    cursor: 'pointer',
  },
  storeElement: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: '8px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '8px',
    color: theme.palette.text.secondary,
    borderRadius: '8px',

    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary
    }
  }
}))

const MupDebug = () => {
  const { settings, status } = useContext(DataProvider)
  const localStorageKey = 'material-ui-panel.debug'
  const theme = useTheme()
  const classes = useStyles(theme)

  const [dumps, setDumps] = useState([{
    title: 'Status',
    collapsed: true,
  }, {
    title: 'Settings',
    collapsed: true,
  }])

  useEffect(() => {
    const storedDumpSettings = localStorage.getItem(localStorageKey)
    if (storedDumpSettings) {
      setDumps(JSON.parse(storedDumpSettings))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(dumps.map(({ title, collapsed }) => ({ title, collapsed }))))
  }, [dumps])

  useEffect(() => {
    setDumps(dumps => dumps.map(d => {
      if (d.title === 'Settings') {
        return {
          ...d, dataSource: Object.entries(settings).map(([key, val]) => <div key={`settings_${key}`} className={classes.storeElement}><pre
            key={`settings_${key}`}
            className={classes.dumpText}>
            {key}: {JSON.stringify(val)}
          </pre></div>)
        }
      }

      return d
    }))
  }, [settings, classes.dumpText])

  useEffect(() => {
    setDumps(dumps => dumps.map(d => {
      if (d.title === 'Status') {
        return {
          ...d, dataSource: status.map(obj => <div key={`settings_${obj.uniqueId}`} className={classes.storeElement}>
            <pre>children: excluded from dump</pre>
            <pre
              key={`settings_${obj.uniqueId}`}
              className={classes.dumpText}>
              {JSON.stringify({ ...obj, children: undefined }, null, 2)}
            </pre>
          </div>)
        }
      }

      return d
    }))
  }, [status, classes.dumpText])

  const toggleDumpCollapse = (title) => {
    setDumps(dumps => dumps.map((dump) => { if (dump.title === title) dump.collapsed = !dump.collapsed

      return dump }))
  }

  return settings.debugMode
    ? <div key="MupDebug" className={classes.root}>
      {dumps.map(dump => <Fragment key={dump.title}>
        <Tooltip title="Click to toggle collapse status" arrow placement="left">
          <Typography color="textPrimary" className={classes.header} onClick={() => toggleDumpCollapse(dump.title)}
            variant="h6">
            {dump.title} ({dump.dataSource && dump.dataSource.length})
          </Typography>
        </Tooltip>
        {!dump.collapsed && <div className={classes.dataSourceWrapper}>{dump.dataSource}</div>}
      </Fragment>)}
    </div>
	: null
}

export default MupDebug
