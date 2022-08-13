import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import MuiStatusChild from '../components/MuiStatusChild'
import MupStatus from '../components/MupStatus'

export default ({
  toggleDarkMode, darkMode,
  toggleUpperBar, upperBar,
  toggleHelp, help,
  toggleDebugMode, debugMode,
  toggleCollapseMode, collapseMode,
  toggleInverseMarkers, inverseMarkers,
}) => {
  const toggles = [
    {
      title: 'Debug',
      status: debugMode,
      statusToggle: toggleDebugMode,
    },
    {
      title: 'Help',
      status: help,
      statusToggle: toggleHelp,
    },
    {
      title: 'Dark',
      status: darkMode,
      statusToggle: toggleDarkMode,
    },
    {
      title: 'Upper Bar',
      status: upperBar,
      statusToggle: toggleUpperBar,
    },
    {
      title: 'Collapse',
      status: collapseMode,
      statusToggle: toggleCollapseMode,
    },
    {
      title: 'Inverse',
      status: inverseMarkers,
      statusToggle: toggleInverseMarkers,
    },
  ]

  return <>{toggles
    .filter(toggle => toggle.status !== undefined)
    .map(toggle => <MupStatus
      secondary
      key={`toggle_${toggle.title}`}
      id={`toggle_${toggle.title}`}
      tooltip={`Toggle the ${toggle.title} flag: ${toggle.status ? 'off' : 'on'}`}
      onClick={() => toggle.statusToggle()}
    >
      <MuiStatusChild
        text={toggle.title}
        icon={toggle.status
          ? <CheckBoxOutlinedIcon />
          : <CheckBoxOutlineBlankOutlinedIcon />
        } />
    </MupStatus>)}</>
}
