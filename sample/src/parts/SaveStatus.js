import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import CloudDoneOutlinedIcon from '@material-ui/icons/CloudDoneOutlined'
import CloudOffOutlinedIcon from '@material-ui/icons/CloudOffOutlined'
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined'
import { useState } from 'react'
import MuiStatus from '../components/MuiStatus'
import MuiStatusChild from '../components/MuiStatusChild'

const SaveStatus = () => {
  const [open, setOpen] = useState(false)
  const [elements, setElements] = useState([{ key: 'document', icon: <CloudOutlinedIcon />, text: 'Document ready' }])
  const [highlight, setHighlight] = useState('default')

  const handleClose = () => { setOpen(false)}

  const handleDefault = () => {
    setElements([{ key: 'document', icon: <CloudDoneOutlinedIcon />, text: 'Document saved' }])
    setHighlight('default')
  }

  const handleAgree = () => {
    setElements([{ key: 'document', icon: <CloudDoneOutlinedIcon />, text: 'Document saved' }])
    setHighlight('primary')
  }

  const handleAgreeFail = () => {
    setElements([{ key: 'document', icon: <CloudOffOutlinedIcon />, text: 'Document failed' }])
    setHighlight('secondary')
  }

  return <>
    <MuiStatus
      style={{ minWidth: '132px' }}
      id='statusSaveDoc'
      highlight={highlight}
      onClick={() => setOpen(true)}
      tooltip="Save Document?"
    >
      {elements.map(({ key, text, icon }) => <MuiStatusChild {...{ key, text, icon }} />)}
    </MuiStatus>

    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">{'Save changes made to document?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your document is not yet synchronized with the server. Do you want to save your changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Exit
        </Button>
        <Button onClick={handleDefault} color="default">
          Default
        </Button>
        <Button onClick={handleAgree} color="primary">
          Success
        </Button>
        <Button onClick={handleAgreeFail} color="secondary">
          Fail
        </Button>
      </DialogActions>
    </Dialog>
  </>
}

export default SaveStatus
