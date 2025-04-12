import { BrowserRouter as Router, Routes, Route } from "react-router"
import Homepage from "../pages/Homepage"
import Dashboard from "../pages/Dashboard";
import { useTheme } from "@heroui/use-theme"

export default function AppRouter(){
    useTheme(); 
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}