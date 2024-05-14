import { Box, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'


export const Navbar = () => {
  

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box>
            <img src={logo} alt="" width="50px" style={{
              borderRadius:"13px"
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
      </Box>
    </Box>
  );
};

export default Navbar;
