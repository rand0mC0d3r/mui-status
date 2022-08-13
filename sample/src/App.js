import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { useMemo, useState } from 'react'
import './App.css'
import ImplementationFrame from './parts/_ImplementationFrame'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [debug, setDebug] = useState(true)
  const [position, setPosition] = useState('top')

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

  return <ThemeProvider {...{ theme }} >
    <ImplementationFrame {...{
      debug, toggleDebug: () => setDebug(!debug),
      darkMode, toggleDarkMode: () => setDarkMode(!darkMode),
      position, setPosition
    }} />
  </ThemeProvider>
}

export default App
