import { useState } from 'react';
import { QueryBuilder, formatQuery, standardClassnames } from 'react-querybuilder';
import { Box,Button, Typography, Paper } from '@mui/material';
import '../styles/QueryEditor.css';
import 'react-querybuilder/dist/query-builder.css';
import 'react-querybuilder/dist/query-builder-layout.css';
// import 'react-querybuilder/dist/query-builder.scss'; 
// import 'react-querybuilder/dist/query-builder-layout.scss';



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
    <Paper elevation={3} className="query-editor-container">
      <Typography variant="h5" gutterBottom>
        Query Editor
      </Typography>
      <Box sx={{
          $rqbBackgroundColor: "red !default",
// $rqb-border-color: "#8081a2 !default",
// "$rqb-border-style": solid !default;
// $rqb-border-radius: 0.25rem !default;
      }}>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={handleQueryChange}
        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
      />
      </Box>
      <Typography variant="h6" gutterBottom>
        Query
      </Typography>
      <pre className="preformatted-query">{formatQuery(query, 'json')}</pre>
      <Button variant="contained" onClick={handleModalClose} color="primary">
        Close
      </Button>
    </Paper>
  );
};

export default QueryEditor;
