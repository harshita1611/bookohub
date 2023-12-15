
import Navbar from "./components/navbar";
import Home from "./home/page";
import { Button } from "@mui/material";
export default function main() {

    return (
        <div className="bg-[#101418] h-screen text-white">
            <Navbar/>
            <Home/>
        </div>    
    )
}