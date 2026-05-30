import { useEffect } from 'react'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  useEffect(() => {
    // Prevent context menu on right-click for game purposes
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Dashboard />
    </div>
  )
}

export default App
