import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import MuiStatus from '../components/MuiStatus'
import MuiStatusChild from '../components/MuiStatusChild'

export default ({
  setPosition, position,
  toggleDebug, debug,
  toggleDarkMode, darkMode,
}) => {
  const toggles = [
    {
      title: 'Debug',
      status: debug,
      statusToggle: toggleDebug,
    },
    {
      title: 'Dark Mode',
      status: darkMode,
      statusToggle: toggleDarkMode,
    },
    {
      title: 'Position on Top',
      status: position === 'top',
      statusToggle: () => setPosition(position === 'top' ? 'bottom' : 'top'),
    },
  ]

  return <>
    {toggles
      .filter(toggle => toggle.status !== undefined)
      .map(toggle => <MuiStatus
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
      </MuiStatus>)}</>
}
