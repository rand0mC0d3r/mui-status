import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import MuiPanel from '../components/MuiPanel';

const IframePanel = () => {
  return <MuiPanel
    id="iframePanel"
    title="IframePanel"
    subTitle="Sample sub-title text"
    icon={<LanguageOutlinedIcon />}
  >
    <iframe
      title="Random Wiki article"
      style={{ width: "100%", height: "100%", border: '0px none' }}
      src="https://en.wikipedia.org/wiki/Special:Random"
    />
  </MuiPanel>
}

export default IframePanel;