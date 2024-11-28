import './App.css'
import Dashboard from './screens/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JsonEditor from './screens/JsonEditor';
import RegexTester from './screens/RegexTester';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="json_editor" element={<JsonEditor/>} />
            <Route path="regex_tester" element={<RegexTester/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
