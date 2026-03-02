import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Prep from './Prep';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/prep" element={<Prep />} />
        <Route path="*" element={<Navigate to="/prep" replace />} />
      </Routes>
    </Router>
  )
}
