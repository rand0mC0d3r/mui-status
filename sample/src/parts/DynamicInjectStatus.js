import { Chip } from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ToysIcon from '@material-ui/icons/Toys'
import { useState } from 'react'
import MuiStatusChild from '../components/MuiStatusChild'
import MupStatus from '../components/MupStatus'

const AliveStatus = () => {
  const [injectElement, setInjectElement] = useState(false)

  return <>
    <MupStatus
      style={{ minWidth: '100px' }}
      onClick={() => setInjectElement(!injectElement)}
      id='statusAlive'
      tooltip="Toggle injected status"
    >
      <MuiStatusChild icon={injectElement ? <RadioButtonCheckedIcon />  : <RadioButtonUncheckedIcon />} text='Toggle injection' />
    </MupStatus>

    {injectElement && <MupStatus id='dummyObject' tooltip="Dummy element">
      <MuiStatusChild icon={<ToysIcon />} text='Injected' />
    </MupStatus>}

    <MupStatus id='dummyButton' tooltip="Dummy element" >
      <Chip size="small" onClick={() => { }} variant="outlined"
        label="test..." />
    </MupStatus>
  </>
}

export default AliveStatus
