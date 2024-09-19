import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListEmployees from "./components/ListEmployees"
import NewEmployee from "./components/NewEmployee"
import EditEmployee from "./components/EditEmployee"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListEmployees/>} />
        <Route path="newEmployee" element={<NewEmployee/>}/>
        <Route path="editEmployee/:id" element={<EditEmployee/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
