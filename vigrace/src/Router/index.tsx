import { BrowserRouter as Router, Routes, Route } from "react-router"
import Homepage from "../pages/Homepage"
import { useTheme } from "@heroui/use-theme"

export default function AppRouter(){
    useTheme(); 
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/contact" element={<div>Contact</div>} />
            </Routes>
        </Router>
    )
}