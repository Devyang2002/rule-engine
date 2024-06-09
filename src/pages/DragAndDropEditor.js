import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ItemTypes = {
  FIELD: 'field',
};

const fields = [
  { name: 'temperature', label: 'Temperature (°C)', type: 'temperature', mac: 'AA:BB:CC:DD:EE:FF' },
  { name: 'level', label: 'Level (%)', type: 'level', mac: '11:22:33:44:55:66' },
  { name: 'switch_state', label: 'Switch State', mac: '22:33:44:55:66:77', type: 'switch', parameter: 'state' },
  { name: 'switch_voltage', label: 'Switch Voltage (V)', mac: '22:33:44:55:66:77', type: 'switch', parameter: 'voltage' },
  { name: 'switch_current', label: 'Switch Current (A)', mac: '22:33:44:55:66:77', type: 'switch', parameter: 'current' },
  { name: 'battery_soc', label: 'Battery SOC (%)', mac: '33:44:55:66:77:88', type: 'battery', parameter: 'soc(state of charge)' },
  { name: 'battery_voltage', label: 'Battery Voltage (V)', mac: '33:44:55:66:77:88', type: 'battery', parameter: 'voltage' },
  { name: 'battery_current', label: 'Battery Current(A)', mac: '33:44:55:66:77:88', type: 'battery', parameter: 'current' },
  { name: 'ambiente_state', label: 'Ambiente State', type: 'ambiente', mac: '44:55:66:77:88:99', parameter: 'state' },
  { name: 'ambiente_rgb', label: 'Ambiente RGB', type: 'ambiente', parameter: 'rgb', mac: '44:55:66:77:88:99' },
  { name: 'ambiente_white', label: 'Ambiente White', type: 'ambiente', parameter: 'white', mac: '44:55:66:77:88:99' },
  { name: 'ambiente_brightness', label: 'Ambiente Brightness (%)', type: 'ambiente', parameter: 'brightness', mac: '44:55:66:77:88:99' },
];




const operators = {
  temperature: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  level: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  switch_state: [
    { value: '=', label: 'is' },
  ],
  switch_voltage: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  switch_current: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  battery_soc: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  battery_voltage: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  battery_current: [
    { value: 'under', label: 'under' },
    { value: 'over', label: 'over' },
    { value: 'in range', label: 'in range' },
    { value: 'out of range', label: 'out of range' },
  ],
  ambiente_state: [
    { value: '=', label: 'is' },
  ],
  ambiente_rgb: [
    { value: '=', label: 'is' },
  ],
  ambiente_white: [
    { value: '=', label: 'is' },
  ],
  ambiente_brightness: [
    { value: '=', label: 'is' },
  ],
};

const Field = ({ name, label }) => {
  const [, ref] = useDrag({
    type: ItemTypes.FIELD,
    item: { name, label },
  });

  return (
    <Box ref={ref} sx={{ width:"150px",padding: '8px', backgroundColor: '#292929', color: 'white', borderRadius: '4px', marginBottom: '8px',
     }}>
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
    const newValues = [...(field.values || ['', '', ''])];
    newValues[valueIndex] = event.target.value;
    updateField(index, { ...field, values: newValues });
  };

  const handleChannelChange = (event) => {
    updateField(index, { ...field, channel: event.target.value });
  };

  const handleRemove = () => {
    removeField(index);
  };

  const fieldOperators = operators[field.name] || [];

  const renderFields = () => {
    if (field.operator === 'in range' || field.operator === 'out of range') {
      return (
        <>
          <TextField
            variant="filled"
            label="Value 1"
            value={(field.values && field.values[0]) || ''}
            onChange={(e) => handleValueChange(e, 0)}
            onClick={handleClick}
            sx={textFieldStyle(isClicked)}
          />
          <TextField
            variant="filled"
            label="Value 2"
            value={(field.values && field.values[1]) || ''}
            onChange={(e) => handleValueChange(e, 1)}
            onClick={handleClick2}
            sx={textFieldStyle(isClicked2)}
          />
        </>
      );
    }

    switch (field.name) {
      case 'ambiente_rgb':
        return (
          <>
            <TextField
              variant="filled"
              label="Red"
              value={(field.values && field.values[0]) || ''}
              onChange={(e) => handleValueChange(e, 0)}
              onClick={handleClick}
              sx={textFieldStyle(isClicked)}
            />
            <TextField
              variant="filled"
              label="Green"
              value={(field.values && field.values[1]) || ''}
              onChange={(e) => handleValueChange(e, 1)}
              onClick={handleClick2}
              sx={textFieldStyle(isClicked2)}
            />
            <TextField
              variant="filled"
              label="Blue"
              value={(field.values && field.values[2]) || ''}
              onChange={(e) => handleValueChange(e, 2)}
              onClick={handleClick3}
              sx={textFieldStyle(isClicked3)}
            />
          </>
        );
      case 'battery_soc':
      case 'switch_state':
      case 'ambiente_state':
        return (
          <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px', marginLeft: "10px" }}>
            <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>State</InputLabel>
            <Select
              value={(field.values && field.values[0]) || ''}
              onChange={(e) => handleValueChange(e, 0)}
              onClick={handleClick}
              sx={selectStyle(isClicked)}
            >
              <MenuItem value="on">On</MenuItem>
              <MenuItem value="off">Off</MenuItem>
            </Select>
          </FormControl>
        );
        case 'battery_current':
        return (
          <>
            <TextField
              variant="filled"
              label="Amphere Value"
              value={(field.values && field.values[0]) || ''}
              onChange={(e) => handleValueChange(e, 0)}
              onClick={handleClick}
              sx={textFieldStyle(isClicked)}
            />
            <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px', marginLeft: "10px" }}>
              <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Channel</InputLabel>
              <Select
                value={(field.channel && field.channel) || ''}
                onChange={handleChannelChange}
                onClick={handleClick3}
                sx={selectStyle(isClicked3)}
              >
                {[1, 2, 3, 4, 5].map((channel) => (
                  <MenuItem key={channel} value={channel}>
                    {channel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      default:
        return (
          <TextField
            variant="filled"
            label="Value"
            value={(field.values && field.values[0]) || ''}
            onChange={(e) => handleValueChange(e, 0)}
            onClick={handleClick}
            sx={textFieldStyle(isClicked)}
          />
        );
    }
  };

  const textFieldStyle = (isClicked) => ({
    color: "white",
    backgroundColor: '#333',
    borderRadius: '4px',
    minWidth: "150px",
    marginRight: '10px',
    marginLeft: "10px",
    "& .MuiInputBase-input": {
      color: "white"
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
  });

  const selectStyle = (isClicked) => ({
    color: 'white',
    backgroundColor: '#333',
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
      color: isClicked ? '#33c0cb' : 'white',
    },
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#292929', padding: '8px', borderRadius: '4px' }}>
      <Typography sx={{ color: 'white', marginRight: '8px' }}>{field.label}</Typography>
      <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px', marginLeft: "10px" }}>
        <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Operator</InputLabel>
        <Select
          value={field.operator || ''}
          onChange={handleOperatorChange}
          onClick={handleClick3}
          sx={{
            color: 'white', backgroundColor: '#333',
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
          }}
        >
          {fieldOperators.map((operator) => (
            <MenuItem key={operator.value} value={operator.value}>
              {operator.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {renderFields()}
      <IconButton onClick={handleRemove} sx={{ color: '#ff1744' }}>
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
        maxWidth:"1000px",
      }}>
        <Typography variant="h5" color="white" gutterBottom>
          Drag and Drop Editor
        </Typography>
        <Box sx={{ display:"flex" , flexWrap:"wrap", gap:"8px"}}>
          {fields.map((field) => (
            <Field key={field.name} name={field.name} label={field.label} />
          ))}
        </Box>
        <DropZone onDrop={handleDrop} droppedFields={droppedFields} updateField={updateField} removeField={removeField}/>
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