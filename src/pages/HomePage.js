import React, { useState } from 'react'
import { Box, Button, Dialog, Typography } from '@mui/material'
import Name from '../assets/evotion.webp'
import R from '../assets/R.webp'
import { Link} from 'react-router-dom'
import QueryEditor from './QueryEditor'
import DragAndDropEditor from './DragAndDropEditor'
import FlowchartEditor from './FlowchartEditor'

const HomePage = () => {
  const [openQueryEditor, setOpenQueryEditor] = useState(false);
  const [openDragAndDropEditor, setOpenDragAndDropEditor] = useState(false);
  const [openFlowchartEditor, setOpenFlowchartEditor] = useState(false);

  const handleOpenDragAndDropEditor = () => {
    setOpenDragAndDropEditor(true);
  };

  const handleCloseDragAndDropEditor = () => {
    setOpenDragAndDropEditor(false);
  };

  const handleOpenFlowchartEditor = () => {
    setOpenFlowchartEditor(true);
  };

  const handleCloseFlowchartEditor = () => {
    setOpenFlowchartEditor(false);
  };


  const handleOpenQueryEditor = () => {
    setOpenQueryEditor(true);
  };

  const handleCloseQueryEditor = () => {
    setOpenQueryEditor(false);
  };
  return (
    <Box display="flex">
    <Box display="flex"  width="1100px" height="280px" justifyContent="center" alignItems="center">
      <img src={R} alt="" height="185px"  style={{
        marginTop:"115px",
        marginRight:"15px"
      }}/>
      <Box marginTop="150px">
      <img src={Name} alt="" width="700px" height="70px"/>
      <Typography fontSize="90px" fontWeight="740" style={{
        display:"flex",
        color:"#33c0cb"
      }}>ule Engine</Typography>
      </Box>
    </Box>
    <Box marginTop="100px" height="180px" display="flex" flexDirection="column" justifyContent="space-between">
    <Button onClick={handleOpenQueryEditor} variant='contained' sx={{
        backgroundColor:"#E0115F",
        width:"350px",
        zIndex:"10",
        "&:hover":{
          backgroundColor:"white",
          color:"#E0115F",
          boxShadow: "0px 0px 10px 5px #E0115F"
        }
      }}>
        <Typography fontWeight="550">Query Editor</Typography>
      </Button>
      <Dialog maxWidth="1500px" open={openQueryEditor} onClose={handleCloseQueryEditor}>
      <QueryEditor handleClose={handleCloseQueryEditor} /> 
      </Dialog>
      <Button onClick={handleOpenDragAndDropEditor} variant='contained' sx={{
        backgroundColor:"#DC143C",
        width:"350px",
        zIndex:"10",
        "&:hover":{
          backgroundColor:"white",
          color:"#DC143C",
          boxShadow: "0px 0px 10px 5px #DC143C"
        }
      }}>
        <Typography fontWeight="550">Drag and Drop Editor</Typography>
      </Button>
      <Dialog open={openDragAndDropEditor} onClose={handleCloseDragAndDropEditor}>
        <DragAndDropEditor handleClose={handleCloseDragAndDropEditor} />
      </Dialog>
      
      <Button onClick={handleOpenFlowchartEditor} variant='contained' sx={{
        backgroundColor:"#FF2400",
        width:"350px",
        zIndex:"10",
        "&:hover":{
          backgroundColor:"white",
          color:"#FF2400",
          boxShadow: "0px 0px 10px 5px #FF2400"
        }
      }}>
        <Typography fontWeight="550">Flowchart Editor</Typography>
      </Button>
      <Dialog  open={openFlowchartEditor} onClose={handleCloseFlowchartEditor}>
        <FlowchartEditor handleClose={handleCloseFlowchartEditor} />
      </Dialog>
    </Box>
    </Box>
  )
}

export default HomePage