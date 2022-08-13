import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { useMemo, useState } from 'react'
import './App.css'
import ImplementationFrame from './parts/_ImplementationFrame'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [debugMode, setDebugMode] = useState(true)
  const [upperBar, setUpperBar] = useState(false)
  const [help, setHelp] = useState(false)
  const [collapseMode, setCollapseMode] = useState(true)
  const [inverseMarkers, setInverseMarkers] = useState(false)
  const [wikiUrl, setWikiUrl] = useState('http://localhost:3000')

  const theme = useMemo(() => createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: darkMode
        ? { main: '#0969da' }
        : { main: '#0969da' },
      background: darkMode
        ? { default: '#161b22', paper: '#0d1117' }
        : { default: '#FAFAFA', paper: '#FFF' },
    }
  }), [darkMode])

  const toggleDarkMode = () => setDarkMode(darkMode)
  const toggleDebugMode = () => setDebugMode(!debugMode)
  const toggleUpperBar = () => setUpperBar(!upperBar)
  const toggleHelp = () => setHelp(!help)
  const toggleCollapseMode = () => setCollapseMode(!collapseMode)
  const toggleInverseMarkers = () => setInverseMarkers(!inverseMarkers)

  return <ThemeProvider {...{ theme }} >
    <ImplementationFrame {...{
      darkMode, toggleDarkMode,
      help, toggleHelp,
      debugMode, toggleDebugMode,
      upperBar, toggleUpperBar,
      collapseMode, toggleCollapseMode,
      inverseMarkers, toggleInverseMarkers,
      wikiUrl, setWikiUrl
    }} />
  </ThemeProvider>
}

export default App
