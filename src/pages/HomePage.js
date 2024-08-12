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
import mockdata from '../data/mock_data';
import { ConsoleSqlOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [openQueryEditor, setOpenQueryEditor] = useState(false);
  const [openQueryEditorForNodes, setopenQueryEditorForNodes] = useState(false);
  const [openSelectNodes, setOpenSelectedNodes] = useState(false);
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedRuleJson, setEditedRuleJson] = useState("");
  const [onUpdate, setOnUpdate] = useState(true);
  const [mockData, setMockData] = useState(mockdata);
  const [selectedBrain,setSelectedBrain] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState([]);


  const fetchRules = async () => {
    const user_id = getUser().id;
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
    if (onUpdate) {
      fetchRules();
      setOnUpdate(false); // Reset onUpdate to false after fetching rules
    }
  }, [onUpdate]);

  const handleOpenQueryEditor = () => {
    setOpenQueryEditor(true);
  };

  const handleCloseQueryEditor = () => {
    setOpenQueryEditor(false);
    setOnUpdate(true);
  };

  const handleOpenQueryForNodes = (node) => {
    setSelectedNode(node);
    setopenQueryEditorForNodes(true);
  };

  const handleCloseQueryForNodes = () => {
    setopenQueryEditorForNodes(false);
    setOnUpdate(true);
  };

  const handleCloseEditDialogOpen = () =>{
    setEditDialogOpen(false);
  }

  const handleEditClick = (rule) => {
    setSelectedRule(rule);
    setEditedRuleJson(rule.json_rule);
    setEditDialogOpen(true);
    };

  const handleEditSave = async (editedData) => {
      await fetchRules();
      try {
        const response = await fetch(`http://localhost:5000/rules/${selectedRule.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: editedData,
        });

        if (!response.ok) {
          throw new Error("Failed to update rule");
        }
        setEditDialogOpen(false);
        setSelectedRule(null);
        setEditedRuleJson("");
        setEditDialogOpen(false);
        setOnUpdate(true);
      } catch (error) {
        console.error("Error updating rule:", error);
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
    const words = JSON.stringify(jsonRule);
    return jsonRule;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSelectednodes = (key) => {
    setSelectedBrain(key);
    const selectedBrainData = mockData.find(mock => mock.system.brain.mac === key);
    if (selectedBrainData) {
      setSelectedNodes(selectedBrainData.system.brain.nodes);
    } else {
      setSelectedNodes([]);
    }
    setOpenSelectedNodes(true);
  };
  

  const handleCloseSelectedNodes = () =>{
    setOpenSelectedNodes(false);
  }

  return (
    <Box display="flex">
      <Box>
      <Box display="flex">
        <Box
        marginLeft="60px"
          display="flex"
          justifyContent="center"
          width="740px"
        >
          <img
            src={R}
            alt=""
            height="70px"
            style={{
              marginTop: "40px",
              marginRight: "15px",
            }}
          />
          <Box marginTop="50px" >
            <img src={Name} alt="" width="300px" height="25px" />
            <Typography
              fontSize="25px"
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
      </Box>
      <Box
        border="2px solid #bab3b3"
        width="700px"
        height="399px"
        padding="20px"
        marginLeft="60px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="25px"
        borderRadius="4px"
        >
          <Box>
            <Typography
            fontSize="24px"
            fontWeight="550"
            marginBottom="20px"
            color="#33c0cb"
            >Select a Brain</Typography>
          <Box height="380px" justifyContent="center" alignItems="center" sx={{
          overflowY:"auto",
        }}>
            {
              mockData.map((mock)=>(
                <Button key={mock.system.brain.mac} color="primary"
                variant="contained"
                sx={{
                  backgroundColor: "#33c0cb",
                  width: "150px",
                  zIndex: "10",
                  margin: "5px",
                  "&:hover": {
                    backgroundColor: "#186a70",
                  },
                }} onClick={() => handleSelectednodes(mock.system.brain.mac)}>
                  {mock.system.brain.mac}
                </Button>
              ))
            }
            <Box display="flex" justifyContent="center">
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
            open={openSelectNodes}
            onClose={handleCloseSelectedNodes}
            disableEscapeKeyDown={true}
          >
          <Box width="700px" maxHeight="auto">
          <Typography
            fontSize="24px"
            fontWeight="550"
            marginBottom="20px"
            color="#33c0cb"
            display="flex"
            justifyContent="center"
            >Select a Node</Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            {selectedNodes.length > 0 ? (
        selectedNodes.map((node) => (
          <Button
            key={node.mac}
            onClick={() => handleOpenQueryForNodes(node)}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#33c0cb",
              width: "150px",
              zIndex: "10",
              margin: "5px",
              "&:hover": {
                backgroundColor: "#186a70",
              },
            }}
          >
            {node.mac}
          </Button>
        ))
      ) : (
        <Typography color="gray">No nodes found for this brain MAC.</Typography>
      )}
          </Box>
</Box>
            <Box display="flex" justifyContent="flex-end" marginRight="5px" marginBottom="5px">
              <Button onClick={handleCloseSelectedNodes} sx={{
              }} > Close</Button>
            </Box>
          </Dialog>
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
            open={openQueryEditorForNodes}
            onClose={handleCloseQueryForNodes}
            disableEscapeKeyDown={true}
          >
            <QueryEditor handleClose={handleCloseQueryForNodes} selectedNode={selectedNode}/>
          </Dialog>
          </Box>
          </Box>
          </Box>
      </Box>
      </Box>
      <Box
        border="2px solid #bab3b3"
        width="600px"
        height="543px"
        padding="20px"
        marginLeft="30px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="4px"
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


