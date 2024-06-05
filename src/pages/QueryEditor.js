import { useState,useEffect } from 'react';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import { defaultOperators,QueryBuilder, formatQuery } from 'react-querybuilder';
import { Box, Button, Typography, Paper,TextField } from '@mui/material';
import 'react-querybuilder/dist/query-builder.css';
import 'react-querybuilder/dist/query-builder-layout.css';
import '../styles/QueryEditor.css';

const fields = [

  { name: 'temperature', label: 'Temperature (°C)', type: 'temperature', mac:'AA:BB:CC:DD:EE:FF',
  operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    {
      name: 'out of range',
      label: 'out of range',
    },
    { name:'in range', label:'in range'},
    
  ],
},

  { name: 'level', label: 'Level (%)', type: 'level',mac:'11:22:33:44:55:66',operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    { name:'in range', label:'in range'},
    { name:'out of range', label:'out of range'},
  ],},

  { name: 'switch_state', label: 'Switch State',mac:'22:33:44:55:66:77', type: 'switch' ,
  parameter:'state', operators: [
    { name: '=', label: 'is' },,
  ],}, 
  { name: 'switch_voltage', label: 'Switch Voltage (V)',mac:'22:33:44:55:66:77', type: 'switch',
  parameter:'voltage', operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    { name:'in range', label:'in range'},
    { name:'out of range', label:'out of range'},
  ], },
  { name: 'switch_current', label: 'Switch Current (A)',mac:'22:33:44:55:66:77', type: 'switch',
  parameter:'current', operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    { name:'in range', label:'in range'},
    { name:'out of range', label:'out of range'},
  ], },

  { name: 'battery_soc', label: 'Battery SOC (%)',mac:'33:44:55:66:77:88', type: 'battery',
  parameter:'soc(state of charge)', operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    { name:'in range', label:'in range'},
    { name:'out of range', label:'out of range'},
  ], },
  { name: 'battery_voltage', label: 'Battery Voltage (V)',mac:'33:44:55:66:77:88', type: 'battery',parameter:'voltage' ,operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    { name:'in range', label:'in range'},
    { name:'out of range', label:'out of range'},
  ],},
  { name: 'battery_current', label: 'Battery Current(A)',mac:'33:44:55:66:77:88', type: 'battery',parameter:'current',operators: [
    { name: 'under', label: 'under' },
    { name:'over', label:'over'},
    { name:'in range', label:'in range'},
    { name:'out of range', label:'out of range'},
  ], },
  { name: 'ambiente_state', label: 'Ambiente State', type: 'ambiente', mac:'44:55:66:77:88:99', parameter:'state' },
  { name: 'ambiente_rgb', label: 'Ambiente RGB', type: 'ambiente',parameter:'rgb', mac:'44:55:66:77:88:99', operators: [
    { name: '=', label: 'is' },
  ], },
  { name: 'ambiente_white', label: 'Ambiente White', type: 'ambiente',parameter:'white',mac:'44:55:66:77:88:99', operators: [
    { name: '=', label: 'is' },
  ], },
  { name: 'ambiente_brightness', label: 'Ambiente Brightness (%)', type: 'ambiente',parameter:'brightness',mac:'44:55:66:77:88:99', operators: [
    { name: '=', label: 'is' },
  ], },
];


const CustomValueEditor = ({ field, operator, value, handleOnChange }) => {
  if (operator === 'out of range' || operator === 'in range') {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="number"
          value={value[0] || ''}
          onChange={(e) => handleOnChange([e.target.value, value[1]])}
          placeholder="Min Value"
          style={{
            backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
          }}
        />
        <input
          type="number"
          value={value[1] || ''}
          onChange={(e) => handleOnChange([value[0], e.target.value])}
          placeholder="Max Value"
          style={{
            backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
          }}
        />
      </div>
    );
  }

  if (field === 'battery_current') {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="number"
          value={value?.current || ''}
          onChange={(e) => handleOnChange({ ...value, current: e.target.value })}
          placeholder="Current Value"
          style={{
            backgroundColor: "#292929",
            color: "white",
            borderRadius: "4px",
            borderColor: "#292929"
          }}
        />
        <select
          value={value?.channel || ''}
          onChange={(e) => handleOnChange({ ...value, channel: e.target.value })}
          style={{
            backgroundColor: '#292929',
            color: 'white',
            borderRadius: '4px',
            borderColor: '#292929',
          }}
        >
          <option value="">Channel</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    );
  }
  if (field === 'switch_state' || field === 'ambiente_state') {
    return (
      <select
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        style={{
          backgroundColor: '#292929',
          color: 'white',
          borderRadius: '4px',
          borderColor: '#292929',
        }}
      >
        <option >Select a value</option>
        <option value="on">On</option>
        <option value="off">Off</option>
      </select>
    );
  }

  if (field === 'ambiente_rgb') {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="number"
          value={value[0] || ''}
          onChange={(e) => handleOnChange([e.target.value, value[1], value[2]])}
          placeholder="R Value"
          style={{
            backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
          }}
        />
        <input
          type="number"
          value={value[1] || ''}
          onChange={(e) => handleOnChange([value[0], e.target.value, value[2]])}
          placeholder="G Value"
          style={{
            backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
          }}
        />
        <input
          type="number"
          value={value[2] || ''}
          onChange={(e) => handleOnChange([value[0], value[1], e.target.value])}
          placeholder="B Value"
          style={{
            backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
          borderColor: "#292929"
          }}
        />
      </div>
    );
  }


  return (
    <input
      type={field.type === 'number' ? 'number' : 'text'}
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      style={{
        backgroundColor: "#292929",
      color: "white",
      borderRadius: "4px",
      borderColor: "#292929"
      }}
    />
  );
};

const transformQueryToCustomJSON = (query) => {
  const fieldCapIndexMap = fields.reduce((acc, field, index) => {
    acc[field.name] = index;
    return acc;
  }, {});

  const transformRule = (rule) => {
    if (rule.rules) {
      return {
        combinator: rule.combinator,
        rules: rule.rules.map(transformRule)
      };
    } else {
      const field = fields.find(f => f.name === rule.field);
      return {
        id: rule.id,
        mac: field.mac,
        cap_index: fieldCapIndexMap[rule.field] || 0,
        operator: rule.operator,
        value: rule.value,
        type: field?.type,
        parameter: field?.parameter || undefined,
        channel: field?.channel || undefined,
      };
    }
  };

  return query.rules.map(transformRule);
};


const QueryEditor = ({ handleClose }) => {
  const [query, setQuery] = useState({
    combinator: 'and',
    rules: [],
  });

  const [formattedQuery, setFormattedQuery] = useState('');

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    const transformedQuery = transformQueryToCustomJSON(newQuery);
    setFormattedQuery(JSON.stringify(transformedQuery, null, 2));
  };

  
  const handleModalClose = () => {
    handleClose();
  };
  
  const handleShowData = () =>{
    const transformedQuery = transformQueryToCustomJSON(query);
    console.log(JSON.stringify(transformedQuery, null, 2));
  }

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
        },
        "& .rule-value-list-item":{
          backgroundColor: "#292929",
          color: "white",
          borderRadius: "4px",
        },
      }}>

        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
          <QueryBuilder
            fields={fields}
            query={query}
            onQueryChange={handleQueryChange}
            showLockButtons
            controlElements={{ valueEditor: CustomValueEditor}}
            controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
          />
        </QueryBuilderDnD>
      </Box>
      <Typography variant="h6" color="white" gutterBottom>
        Query
      </Typography>
      <pre className="preformatted-query" >{formattedQuery}</pre>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained"  color="primary" sx={{
          backgroundColor: "#33c0cb",
          display: "flex",
          marginRight:"10px",
          justifyContent: "flex-end",
          "&:hover": {
            backgroundColor: "#186a70",
          }
        }} onClick={handleShowData}>
          Export Query
        </Button>
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
