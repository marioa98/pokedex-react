import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing/Landing"

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
    </Routes>
  )
}

export default App
