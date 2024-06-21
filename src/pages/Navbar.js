import { Box, Typography,Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Navigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { logoutUser } from "../sessionStorage/auth";
import { toast } from "react-toastify";


export const Navbar = () => {

  const handleLogout = () =>{
    logoutUser();
    toast.success("Logout Successfully");
    window.location.assign("/");
  }
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box>
            <img src={logo} alt="" width="50px" style={{
              borderRadius:"13px",
              boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2), 0 6px 20px rgba(51, 192, 203, 0.5)',
            }} />
      </Box>
      <Box display="flex"  justifyContent="space-between" marginRight="10px" p={1}>
        {/* <Link style={{
            color:"red",
            textDecoration:"none"
        }} to="/">Login</Link> */}
        {/* <Link to="/query">Query Editor</Link>
        <Link to="/d&d">Drag AND drop editor</Link>
       <Link to="/flowchart">flowChart Editor</Link> */}
       <Button onClick={handleLogout}>
        logout
       </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
