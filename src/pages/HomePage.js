import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, Typography, IconButton,TextField } from "@mui/material";
import Name from "../assets/evotion.webp";
import R from "../assets/R.webp";
import QueryEditor from "./QueryEditor";
import DragAndDropEditor from "./DragAndDropEditor";
import FlowchartEditor from "./FlowchartEditor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUser } from "../sessionStorage/auth";

const HomePage = () => {
  const [openQueryEditor, setOpenQueryEditor] = useState(false);
  const [openDragAndDropEditor, setOpenDragAndDropEditor] = useState(false);
  const [openFlowchartEditor, setOpenFlowchartEditor] = useState(false);
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedRuleJson, setEditedRuleJson] = useState("");
  const [updatedEditor, setUpdatedEditor] = useState(false)


  const fetchRules = async () => {
    const user_id = getUser().id;
    console.log(user_id)
    try {
      const response = await fetch(`http://localhost:5000/users/${user_id}/rules`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRules(data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };
  useEffect(() => {
    fetchRules();
  }, []);

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

  const handleCloseEditDialogOpen = () =>{
    setEditDialogOpen(false);
  }

  const handleEditClick = (rule) => {
    setSelectedRule(rule);
    setEditedRuleJson(rule.json_rule);
    setEditDialogOpen(true);
    };

  const handleEditSave = async () => {
    if (selectedRule) {
      const updatedRule = { ...selectedRule, json_rule: editedRuleJson, updated_at: new Date().toISOString() };

      try {
        const response = await fetch(`http://localhost:5000/rules/${selectedRule.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRule),
        });

        if (!response.ok) {
          throw new Error("Failed to update rule");
        }

        setRules((prevRules) =>
          prevRules.map((rule) =>
            rule.id === selectedRule.id ? updatedRule : rule
          )
        );

        setEditDialogOpen(false);
        setSelectedRule(null);
        setEditedRuleJson("");
      } catch (error) {
        console.error("Error updating rule:", error);
      }
    }
  };

  const handleDeleteRule = async (ruleId) => {
    try {
      const response = await fetch(`http://localhost:5000/rules/${ruleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete rule");
      }

      setRules((prevRules) => prevRules.filter((rule) => rule.id !== ruleId));
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  const truncateJsonRule = (jsonRule) => {
    const words = jsonRule.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : jsonRule;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          width="800px"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={R}
            alt=""
            height="140px"
            style={{
              marginTop: "55px",
              marginRight: "15px",
            }}
          />
          <Box marginTop="85px">
            <img src={Name} alt="" width="500px" height="50px" />
            <Typography
              fontSize="70px"
              fontWeight="670"
              style={{
                display: "flex",
                color: "#33c0cb",
              }}
            >
              ule Engine
            </Typography>
          </Box>
        </Box>
        <Box
          marginTop="50px"
          width="800px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Button
            onClick={handleOpenQueryEditor}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#33c0cb",
              width: "300px",
              zIndex: "10",
              marginLeft: "85px",
              "&:hover": {
                backgroundColor: "#186a70",
                display: "flex",
              },
            }}
          >
            <Typography fontWeight="550">Query Editor</Typography>
          </Button>
          <Dialog
            maxWidth="100px"
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                background:
                  "linear-gradient(to right, #07090c, #12161b, #1b2125, #242a33)",
                border: "1px solid #33c0cb",
              },
            }}
            open={openQueryEditor}
            onClose={handleCloseQueryEditor}
            disableEscapeKeyDown={true}
          >
            <QueryEditor handleClose={handleCloseQueryEditor}/>
          </Dialog>
          <Button
            onClick={handleOpenDragAndDropEditor}
            variant="contained"
            sx={{
              backgroundColor: "#33c0cb",
              width: "300px",
              marginTop: "25px",
              marginLeft: "250px",
              "&:hover": {
                backgroundColor: "#186a70",
              },
            }}
          >
            <Typography fontWeight="550">Drag and Drop Editor</Typography>
          </Button>
          <Dialog
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                background:
                  "linear-gradient(to right, #07090c, #12161b, #1b2125, #242a33)",
                border: "1px solid #33c0cb",
              },
            }}
            open={openDragAndDropEditor}
            onClose={handleCloseDragAndDropEditor}
            maxWidth="1300px"
          >
            <DragAndDropEditor handleClose={handleCloseDragAndDropEditor} />
          </Dialog>
          <Button
            onClick={handleOpenFlowchartEditor}
            variant="contained"
            sx={{
              backgroundColor: "#33c0cb",
              width: "300px",
              marginTop: "25px",
              marginLeft: "410px",
              "&:hover": {
                backgroundColor: "#186a70",
              },
            }}
          >
            <Typography fontWeight="550">Flowchart Editor</Typography>
          </Button>
          <Dialog
            maxWidth="lg"
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                background:
                  "linear-gradient(to right, #07090c, #12161b, #1b2125, #242a33)",
                border: "1px solid #33c0cb",
              },
            }}
            open={openFlowchartEditor}
            onClose={handleCloseFlowchartEditor}
          >
            <Box padding="20px" width="1000px" height="500px">
              <FlowchartEditor handleClose={handleCloseFlowchartEditor} />
            </Box>
          </Dialog>
        </Box>
      </Box>
      <Box
        borderLeft="2px solid grey"
        borderRight="2px solid grey"
        width="600px"
        height="540px"
        padding="20px"
        marginLeft="30px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        
      >
        <Typography
          fontSize="24px"
          fontWeight="550"
          marginBottom="20px"
          color="#33c0cb"
        >
          Rules
        </Typography>
        <Box height="500px" sx={{
          overflowY:"auto"
        }}>
            {rules.length === 0 ? (
              <Typography color="gray">
              You haven't added any rules yet.
            </Typography>
            ): (
              rules.map((rule) => (
                <Box
                  key={rule.id}
                  marginBottom="10px"
                  padding="10px"
                  border="1px solid #33c0cb"
                  borderRadius="5px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography color="white">
                    {truncateJsonRule(rule.json_rule)}
                  </Typography>
                  <Typography color="gray">
                    Created: {formatDate(rule.created_at)}
                  </Typography>
                  <Typography color="gray">
                    Updated: {formatDate(rule.updated_at)}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <IconButton sx={{ color: "#009688" }} onClick={() => handleEditClick(rule)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#e53935" }} onClick={() => handleDeleteRule(rule.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
            <Dialog
  open={editDialogOpen}
  onClose={handleCloseEditDialogOpen}
  maxWidth="100px"
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                background:
                  "linear-gradient(to right, #07090c, #12161b, #1b2125, #242a33)",
                border: "1px solid #33c0cb",
              },
            }}
>
  <QueryEditor handleClose={handleCloseEditDialogOpen} jsonRule={editedRuleJson} saveQuery={handleEditSave} />
</Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;


