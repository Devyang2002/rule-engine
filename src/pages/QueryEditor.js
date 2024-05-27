import { useState } from 'react';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import { Box, Button, Typography, Paper } from '@mui/material';
import 'react-querybuilder/dist/query-builder.css';
import 'react-querybuilder/dist/query-builder-layout.css';
import '../styles/QueryEditor.css';

const fields = [
  { name: 'temperature', label: 'Temperature' },
  { name: 'humidity', label: 'Humidity' },
];

const QueryEditor = ({ handleClose }) => {
  const [query, setQuery] = useState({
    combinator: 'and',
    rules: [],
  });

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleModalClose = () => {
    handleClose();
  };
  

  return (
    <Paper elevation={3} className="query-editor-container" sx={{ minWidth: '500px' }}>
      <Typography variant="h5" color="white" gutterBottom>
        Query Editor
      </Typography>
      <Box sx={{
        "& .queryBuilder-dragHandle": {
          color: "white"
        },
        "& .ruleGroup-combinators": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .ruleGroup-addRule": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .ruleGroup-addGroup": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .ruleGroup-lock": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .rule-fields": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .rule-operators": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .rule-value": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .rule-remove": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .rule-lock": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        },
        "& .ruleGroup-remove": {
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
        }
      }}>
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
          <QueryBuilder
            fields={fields}
            query={query}
            onQueryChange={handleQueryChange}
            showLockButtons
            controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
          />
        </QueryBuilderDnD>
      </Box>
      <Typography variant="h6" color="white" gutterBottom>
        Query
      </Typography>
      <pre className="preformatted-query">{formatQuery(query, 'json')}</pre>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleModalClose} color="primary" sx={{
          backgroundColor: "#33c0cb",
          display: "flex",
          justifyContent: "flex-end",
          "&:hover": {
            backgroundColor: "#186a70",
          }
        }}>
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default QueryEditor;
