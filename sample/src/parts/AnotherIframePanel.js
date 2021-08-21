import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import { useState } from 'react';
import MuiPanel from '../components/MuiPanel';

const IframePanel = () => {
  const [url, setUrl] = useState("https://material-ui.com/components/material-icons/");

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return <MuiPanel
    id="anotherIframePanel"
    title="AnotherIframePanel"
    subTitle="Sample sub-title text"
    icon={<LanguageOutlinedIcon />}
  >
    <FilledInput fullWidth id="component-filled" value={url} onChange={handleChange} />

    <iframe
      title="Random Wiki article"
      style={{ width: "100%", height: "100%", border: '0px none' }}
      src={url}
    />
  </MuiPanel>
}

export default IframePanel;