import { Chip } from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ToysIcon from '@material-ui/icons/Toys'
import { useState } from 'react'
import MuiStatus from '../components/MuiStatus'
import MuiStatusChild from '../components/MuiStatusChild'

const AliveStatus = () => {
  const [injectElement, setInjectElement] = useState(false)

  return <>
    <MuiStatus
      style={{ minWidth: '100px' }}
      onClick={() => setInjectElement(!injectElement)}
      id='statusAlive'
      tooltip="Toggle injected status"
    >
      <MuiStatusChild icon={injectElement ? <RadioButtonCheckedIcon />  : <RadioButtonUncheckedIcon />} text='Toggle injection' />
    </MuiStatus>

    {injectElement && <MuiStatus id='dummyObject' tooltip="Dummy element">
      <MuiStatusChild icon={<ToysIcon />} text='Injected' />
    </MuiStatus>}

    <MuiStatus id='dummyButton' tooltip="Dummy element" >
      <Chip size="small" onClick={() => { }} variant="outlined"
        label="test..." />
    </MuiStatus>
  </>
}

export default AliveStatus
