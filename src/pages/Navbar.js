import { Box, Typography,Button, IconButton } from "@mui/material";
import logo from '../assets/logo.png';
import { logoutUser } from "../sessionStorage/auth";
import { toast } from "react-toastify";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


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
       <Button onClick={handleLogout} sx={{
          marginTop: "-10px"
       }}>
        <IconButton sx={{
          color: "#e53935",
        }}>
          <LogoutOutlinedIcon/>
        </IconButton>
       </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
