import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layout/MainLayout'
import Home from './components/pages/Home'
import PujaDetails from './components/pages/PujaDetails'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/puja/:id" element={<PujaDetails />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
