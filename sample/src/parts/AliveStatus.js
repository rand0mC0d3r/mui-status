import SignalWifi1BarIcon from '@material-ui/icons/SignalWifi1Bar'
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar'
import { useEffect, useState } from 'react'
import MuiStatusChild from '../components/MuiStatusChild'
import MupStatus from '../components/MupStatus'

const breakpoint = 60
const max = 300

export default () => {
  const [speed, setSpeed] = useState(175)
  const [highlight, setHighlight] = useState('default')

  useEffect(() => {
    const interval = setInterval(() => {
      const signChosen = Math.ceil(Math.random() * 250) > 210 ? '-1' : '1'
      const number = speed + signChosen * Math.ceil(Math.random() * 150)
      setHighlight(number < breakpoint ? 'secondary' : number < max ? 'default' : 'primary')
      setSpeed(() => number)
    }, 750)

    return () => clearInterval(interval)
  }, [])

  return <MupStatus {...{ highlight }}
    secondary
    id='statusAliveUpdating'
    tooltip={<div>
      <img
        src="https://quickchart.io/chart?bkg=white&c={type:'bar',data:{labels:['Q','2'],datasets: [{label:'Users',data:[50,60]}]}}"
        style={{ width: '120px' }}
      />
      <div>text</div>
    </div>}
  >
    <MuiStatusChild
      icon={highlight === 'secondary' ? <SignalWifi1BarIcon /> : <SignalWifi4BarIcon />}
      text={`${speed} KB/s`}
      textStyle={{ minWidth: '60px' }}
    />
  </MupStatus>
}
