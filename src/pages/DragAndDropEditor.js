import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/QueryEditor.css';

const ItemTypes = {
  FIELD: 'field',
};

const fields = [
  { name: 'temperature', label: 'Temperature' },
  { name: 'humidity', label: 'Humidity' },
];

const operators = [
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
  { value: '<', label: '<' },
  { value: '>', label: '>' },
  { value: 'between', label: 'between' },
  { value: 'not between', label: 'not between' },
];

const Field = ({ name, label }) => {
  const [, ref] = useDrag({
    type: ItemTypes.FIELD,
    item: { name, label },
  });

  return (
    <Box ref={ref} sx={{ padding: '8px', backgroundColor: '#292929', color: 'white', borderRadius: '4px', marginBottom: '8px' }}>
      {label}
    </Box>
  );
};

const DroppedField = ({ field, index, updateField, removeField }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleClick2 = () => {
    setIsClicked2(!isClicked2);
  };

  const handleClick3 = () => {
    setIsClicked3(!isClicked3);
  };
  const handleOperatorChange = (event) => {
    updateField(index, { ...field, operator: event.target.value });
  };

  const handleValueChange = (event, valueIndex) => {
    const newValues = [...(field.values || ['', ''])];
    newValues[valueIndex] = event.target.value;
    updateField(index, { ...field, values: newValues });
  };

  const handleRemove = () => {
    removeField(index);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#292929', padding: '8px', borderRadius: '4px' ,
    }}>
      <Typography sx={{ color: 'white', marginRight: '8px' }}>{field.label}</Typography>
      <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px',
        marginLeft:"10px"
       }}>
        <InputLabel  sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Operator</InputLabel>
        <Select value={field.operator || ''} onChange={handleOperatorChange} onClick={handleClick3} sx={{ color: 'white', backgroundColor: '#333' ,
         '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#33c0cb',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#33c0cb',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#33c0cb',
        },
        '&::after': {
          borderBottomColor: '#33c0cb',
        },
        '& .MuiSvgIcon-root': {
          color: isClicked3 ? '#33c0cb' : 'white',
        },
        }}>
          {operators.map((operator) => (
            <MenuItem key={operator.value} value={operator.value}>
              {operator.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {(field.operator === 'between' || field.operator === 'not between') ? (
        <>
          <TextField
            variant="filled"
            label="Value 1"
            value={(field.values && field.values[0]) || ''}
            onChange={(e) => handleValueChange(e, 0)}
            onClick={handleClick}
            sx={{color:"white", backgroundColor: '#333', borderRadius: '4px', minWidth: "150px", marginRight: '10px',
            marginLeft:"10px",
            "& .MuiInputBase-input":{
              color:"white"
            },
            '& .MuiFilledInput-root': {
              '&.Mui-focused': {
                borderColor: '#33c0cb',
              },
              '&::after': {
                borderBottomColor: '#33c0cb',
              },
            },
            '& .MuiInputLabel-root': {
              color: isClicked ? '#33c0cb' : 'white',
              '&.Mui-focused': {
                color: '#33c0cb',
              },
            }, }}
          />
          <TextField
            variant="filled"
            label="Value 2"
            value={(field.values && field.values[1]) || ''}
            onChange={(e) => handleValueChange(e, 1)}
            onClick={handleClick2}
            sx={{ backgroundColor: '#333', borderRadius: '4px', minWidth: "150px", marginRight: '10px',
            marginLeft:"10px",
            "& .MuiInputBase-input":{
              color:"white"
            },
            '& .MuiFilledInput-root': {
              '&.Mui-focused': {
                borderColor: '#33c0cb',
              },
              '&::after': {
                borderBottomColor: '#33c0cb',
              },
            },
            '& .MuiInputLabel-root': {
              color: isClicked2 ? '#33c0cb' : 'white',
              '&.Mui-focused': {
                color: '#33c0cb',
              },
            },
          }}
          />
        </>
      ) : (
        <TextField
          variant="filled"
          label="Value"
          value={(field.values && field.values[0]) || ''}
          onChange={(e) => handleValueChange(e, 0)}
          onClick={handleClick}
          sx={{ backgroundColor: '#333', borderRadius: '4px', minWidth: "150px", marginRight: '10px',
          marginLeft:"10px",
          "& .MuiInputBase-input":{
            color:"white"
          },
          '& .MuiFilledInput-root': {
            '&.Mui-focused': {
              borderColor: '#33c0cb',
            },
            '&::after': {
              borderBottomColor: '#33c0cb',
            },
          },
          '& .MuiInputLabel-root': {
            color: isClicked ? '#33c0cb' : 'white',
            '&.Mui-focused': {
              color: '#33c0cb',
            },
          },
           }}
        />
      )}
      <IconButton onClick={handleRemove} sx={{ color: 'white' }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

const DropZone = ({ onDrop, droppedFields, updateField, removeField }) => {
  const [, ref] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item) => onDrop(item),
  });

  return (
    <Box ref={ref} sx={{ padding: '16px', minHeight: '200px', backgroundColor: '#1e1e1e', borderRadius: '4px', marginTop: '16px' }}>
      {droppedFields.length === 0 ? (
        <Typography color="white">Drop fields here</Typography>
      ) : (
        droppedFields.map((field, index) => (
          <DroppedField key={index} field={field} index={index} updateField={updateField} removeField={removeField} />
        ))
      )}
    </Box>
  );
};

const DragAndDropEditor = ({ handleClose }) => {
  const [droppedFields, setDroppedFields] = useState([]);

  const handleDrop = (field) => {
    setDroppedFields((prevFields) => [...prevFields, { ...field, operator: '', values: ['', ''] }]);
  };

  const updateField = (index, updatedField) => {
    const newFields = [...droppedFields];
    newFields[index] = updatedField;
    setDroppedFields(newFields);
  };

  const removeField = (index) => {
    setDroppedFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    handleClose();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper elevation={3} className="query-editor-container" sx={{
        minWidth:"500px",
      }}>
        <Typography variant="h5" color="white" gutterBottom>
          Drag and Drop Editor
        </Typography>
        <Box>
          {fields.map((field) => (
            <Field key={field.name} name={field.name} label={field.label} />
          ))}
        </Box>
        <DropZone onDrop={handleDrop} droppedFields={droppedFields} updateField={updateField} removeField={removeField} />
        <Typography variant="h6" color="white" gutterBottom>
          Dropped Fields
        </Typography>
        <Box>
          {droppedFields.map((field, index) => (
            <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
              {field.label} {field.operator} {(field.operator === 'between' || field.operator === 'not between') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]}
            </Typography>
          ))}
        </Box>
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
    </DndProvider>
  );
};

export default DragAndDropEditor;
