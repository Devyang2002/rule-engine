// import { useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { Box, Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { toast } from 'react-toastify';

// const ItemTypes = {
//   FIELD: 'field',
// };

// const fields = [
//   { name: 'temperature', label: 'Temperature (°C)', type: 'temperature', mac: 'AA:BB:CC:DD:EE:FF' },
//   { name: 'level', label: 'Level (%)', type: 'level', mac: '11:22:33:44:55:66' },
//   { name: 'switch_state', label: 'Switch State', mac: '22:33:44:55:66:77', type: 'switch', parameter: 'state' },
//   { name: 'switch_voltage', label: 'Switch Voltage (V)', mac: '22:33:44:55:66:77', type: 'switch', parameter: 'voltage' },
//   { name: 'switch_current', label: 'Switch Current (A)', mac: '22:33:44:55:66:77', type: 'switch', parameter: 'current' },
//   { name: 'battery_soc', label: 'Battery SOC (%)', mac: '33:44:55:66:77:88', type: 'battery', parameter: 'soc(state of charge)' },
//   { name: 'battery_voltage', label: 'Battery Voltage (V)', mac: '33:44:55:66:77:88', type: 'battery', parameter: 'voltage' },
//   { name: 'battery_current', label: 'Battery Current(A)', mac: '33:44:55:66:77:88', type: 'battery', parameter: 'current' },
//   { name: 'ambiente_state', label: 'Ambiente State', type: 'ambiente', mac: '44:55:66:77:88:99', parameter: 'state' },
//   { name: 'ambiente_rgb', label: 'Ambiente RGB', type: 'ambiente', parameter: 'rgb', mac: '44:55:66:77:88:99' },
//   { name: 'ambiente_white', label: 'Ambiente White', type: 'ambiente', parameter: 'white', mac: '44:55:66:77:88:99' },
//   { name: 'ambiente_brightness', label: 'Ambiente Brightness (%)', type: 'ambiente', parameter: 'brightness', mac: '44:55:66:77:88:99' },
// ];




// const operators = {
//   temperature: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   level: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   switch_state: [
//     { value: '=', label: 'is' },
//   ],
//   switch_voltage: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   switch_current: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   battery_soc: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   battery_voltage: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   battery_current: [
//     { value: 'under', label: 'under' },
//     { value: 'over', label: 'over' },
//     { value: 'in range', label: 'in range' },
//     { value: 'out of range', label: 'out of range' },
//   ],
//   ambiente_state: [
//     { value: '=', label: 'is' },
//   ],
//   ambiente_rgb: [
//     { value: '=', label: 'is' },
//   ],
//   ambiente_white: [
//     { value: '=', label: 'is' },
//   ],
//   ambiente_brightness: [
//     { value: '=', label: 'is' },
//   ],
// };

// const Field = ({ name, label }) => {
//   const [, ref] = useDrag({
//     type: ItemTypes.FIELD,
//     item: { name, label },
//   });

//   return (
//     <Box ref={ref} sx={{ width: '150px', padding: '8px', backgroundColor: '#292929', color: 'white', borderRadius: '4px', marginBottom: '8px' }}>
//       {label}
//     </Box>
//   );
// };

// const DroppedField = ({ field, index, updateField, removeField, handleNestedDrop }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const [nestedFields, setNestedFields] = useState([]);

//   const [{ canDrop, isOver }, drop] = useDrop({
//     accept: ItemTypes.FIELD,
//     drop: (item) => handleNestedDrop(item),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   });

//   const handleClick = (setClickState, clickState) => setClickState(!clickState);

//   const handleOperatorChange = (event) => updateField(index, { ...field, operator: event.target.value });

//   const handleValueChange = (event, valueIndex) => {
//     const newValues = [...(field.values || ['', '', ''])];
//     newValues[valueIndex] = event.target.value;
//     updateField(index, { ...field, values: newValues });
//   };

//   const handleChannelChange = (event) => updateField(index, { ...field, channel: event.target.value });

//   const fieldOperators = operators[field.name] || [];

//   const renderFields = () => {
//     if (field.operator === 'in range' || field.operator === 'out of range') {
//       return (
//         <>
//           <TextField
//             variant="filled"
//             label="Value 1"
//             value={field.values[0] || ''}
//             onChange={(e) => handleValueChange(e, 0)}
//             onClick={() => handleClick(setIsClicked, isClicked)}
//             sx={textFieldStyle(isClicked)}
//           />
//           <TextField
//             variant="filled"
//             label="Value 2"
//             value={field.values[1] || ''}
//             onChange={(e) => handleValueChange(e, 1)}
//             onClick={() => handleClick(setIsClicked, isClicked)}
//             sx={textFieldStyle(isClicked)}
//           />
//         </>
//       );
//     }

//     switch (field.name) {
//       case 'ambiente_rgb':
//         return (
//           <>
//             <TextField
//               variant="filled"
//               label="Red"
//               value={field.values[0] || ''}
//               onChange={(e) => handleValueChange(e, 0)}
//               onClick={() => handleClick(setIsClicked, isClicked)}
//               sx={textFieldStyle(isClicked)}
//             />
//             <TextField
//               variant="filled"
//               label="Green"
//               value={field.values[1] || ''}
//               onChange={(e) => handleValueChange(e, 1)}
//               onClick={() => handleClick(setIsClicked, isClicked)}
//               sx={textFieldStyle(isClicked)}
//             />
//             <TextField
//               variant="filled"
//               label="Blue"
//               value={field.values[2] || ''}
//               onChange={(e) => handleValueChange(e, 2)}
//               onClick={() => handleClick(setIsClicked, isClicked)}
//               sx={textFieldStyle(isClicked)}
//             />
//           </>
//         );
//       case 'battery_soc':
//       case 'switch_state':
//       case 'ambiente_state':
//         return (
//           <FormControl variant="filled" sx={{ minWidth: '150px', marginRight: '10px', marginLeft: '10px' }}>
//             <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>State</InputLabel>
//             <Select
//               value={field.values[0] || ''}
//               onChange={(e) => handleValueChange(e, 0)}
//               onClick={() => handleClick(setIsClicked, isClicked)}
//               sx={selectStyle(isClicked)}
//             >
//               <MenuItem value="on">On</MenuItem>
//               <MenuItem value="off">Off</MenuItem>
//             </Select>
//           </FormControl>
//         );
//       case 'battery_current':
//         return (
//           <>
//             <TextField
//               variant="filled"
//               label="Amphere Value"
//               value={field.values[0] || ''}
//               onChange={(e) => handleValueChange(e, 0)}
//               onClick={() => handleClick(setIsClicked, isClicked)}
//               sx={textFieldStyle(isClicked)}
//             />
//             <FormControl variant="filled" sx={{ minWidth: '150px', marginRight: '10px', marginLeft: '10px' }}>
//               <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Channel</InputLabel>
//               <Select
//                 value={field.channel || ''}
//                 onChange={handleChannelChange}
//                 onClick={() => handleClick(setIsClicked, isClicked)}
//                 sx={selectStyle(isClicked)}
//               >
//                 {[1, 2, 3, 4, 5].map((channel) => (
//                   <MenuItem key={channel} value={channel}>
//                     {channel}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </>
//         );
//       default:
//         return (
//           <TextField
//             variant="filled"
//             label="Value"
//             value={field.values[0] || ''}
//             onChange={(e) => handleValueChange(e, 0)}
//             onClick={() => handleClick(setIsClicked, isClicked)}
//             sx={textFieldStyle(isClicked)}
//           />
//         );
//     }
//   };

//   // const handleNestedDrop = (item) => {
//   //   const nestedField = { ...item, operator: '', values: ['', ''] };
//   //   setNestedFields((prevFields) => [...prevFields, nestedField]);
//   // };

//   const removeNestedField = (index) => {
//     setNestedFields((prevFields) => prevFields.filter((_, i) => i !== index));
//   };

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#292929', padding: '8px', borderRadius: '4px' }}>
//       <Box ref={drop} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px', backgroundColor: canDrop ? '#333333' : isOver ? '#444444' : '#292929', padding: '8px', borderRadius: '4px' }}>
//         <Typography sx={{ color: 'white', marginRight: '8px' }}>{field.label}</Typography>
//         <FormControl variant="filled" sx={{ minWidth: '150px', marginRight: '10px', marginLeft: '10px' }}>
//           <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Operator</InputLabel>
//           <Select
//             value={field.operator || ''}
//             onChange={handleOperatorChange}
//             onClick={() => handleClick(setIsClicked, isClicked)}
//             sx={selectStyle(isClicked)}
//           >
//             {fieldOperators.map((operator) => (
//               <MenuItem key={operator.value} value={operator.value}>
//                 {operator.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {renderFields()}
//         {nestedFields.length > 0 && (
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
//             <Typography sx={{ color: 'white', marginBottom: '4px' }}>Nested Conditions:</Typography>
//             {nestedFields.map((nestedField, nestedIndex) => (
//               <DroppedField
//                 key={nestedIndex}
//                 field={nestedField}
//                 index={nestedIndex}
//                 updateField={updateFieldForAction} // Use updateField or updateFieldForAction based on your context
//                 removeField={() => removeNestedField(nestedIndex)}
//               />
//             ))}
//           </Box>
//         )}
//       </Box>
//       <IconButton onClick={() => removeField(index)} sx={{ color: '#ff1744' }}>
//         <CloseIcon />
//       </IconButton>
//     </Box>
//   );
// };

// const DragAndDropEditor = ({ handleClose }) => {
//   const [droppedFields, setDroppedFields] = useState([]);
//   const [droppedFieldsForActions, setDroppedFieldsForActions] = useState([]);

//   const handleDrop = (field) => setDroppedFields((prevFields) => [...prevFields, { ...field, operator: '', values: ['', ''] }]);

//   const handleDropForAction = (field) => setDroppedFieldsForActions((prevFields) => [...prevFields, { ...field, operator: '', values: ['', ''] }]);

//   const updateField = (index, updatedField) => setDroppedFields((prevFields) => prevFields.map((field, i) => (i === index ? updatedField : field)));

//   const updateFieldForAction = (index, updatedField) =>
//     setDroppedFieldsForActions((prevFields) => prevFields.map((field, i) => (i === index ? updatedField : field)));

//   const removeField = (index) => setDroppedFields((prevFields) => prevFields.filter((_, i) => i !== index));

//   const removeFieldForAction = (index) => setDroppedFieldsForActions((prevFields) => prevFields.filter((_, i) => i !== index));

//   const handleNestedDrop = (item) => {
//     const nestedField = { ...item, operator: '', values: ['', ''] };
//     setDroppedFields((prevFields) => [...prevFields, nestedField]);
//   };

//   return (
//     <Box sx={{ padding: '16px' }}>
//       <Typography variant="h5" sx={{ marginBottom: '16px' }}>
//         Drag and Drop Editor
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Box sx={{ marginBottom: '16px' }}>
//           <Typography variant="h6" sx={{ marginBottom: '8px', color: 'white' }}>
//             Drop Fields for Conditions:
//           </Typography>
//           <Box sx={{ display: 'flex', gap: '16px' }}>
//             {fields.map((field, index) => (
//               <Field key={index} name={field.name} label={field.label} />
//             ))}
//           </Box>
//         </Box>
//         <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
//           <DropZone onDrop={handleDrop} droppedFields={droppedFields} updateField={updateField} removeField={removeField} handleNestedDrop={handleNestedDrop} />
//           <DropZoneForAction onDrop={handleDropForAction} droppedFieldsForActions={droppedFieldsForActions} updateFieldForAction={updateFieldForAction} removeFieldForAction={removeFieldForAction} />
//         </Box>
//         <Button variant="contained" color="primary" onClick={handleClose}>
//           Close
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default DragAndDropEditor;

// const Field = ({ name, label }) => {
//   const [, ref] = useDrag({
//     type: ItemTypes.FIELD,
//     item: { name, label },
//   });

//   return (
//     <Box ref={ref} sx={{ width:"150px",padding: '8px', backgroundColor: '#292929', color: 'white', borderRadius: '4px', marginBottom: '8px',
//      }}>
//       {label}
//     </Box>
//   );
// };

// const DroppedField = ({ field, index, updateField, removeField }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const [isClicked2, setIsClicked2] = useState(false);
//   const [isClicked3, setIsClicked3] = useState(false);

//   const handleClick = () => {
//     setIsClicked(!isClicked);
//   };

//   const handleClick2 = () => {
//     setIsClicked2(!isClicked2);
//   };

//   const handleClick3 = () => {
//     setIsClicked3(!isClicked3);
//   };

//   const handleOperatorChange = (event) => {
//     updateField(index, { ...field, operator: event.target.value });
//   };

//   const handleValueChange = (event, valueIndex) => {
//     const newValues = [...(field.values || ['', '', ''])];
//     newValues[valueIndex] = event.target.value;
//     updateField(index, { ...field, values: newValues });
//   };

//   const handleChannelChange = (event) => {
//     updateField(index, { ...field, channel: event.target.value });
//   };

//   const handleRemove = () => {
//     removeField(index);
//   };

//   const fieldOperators = operators[field.name] || [];

//   const renderFields = () => {
//     if (field.operator === 'in range' || field.operator === 'out of range') {
//       return (
//         <>
//           <TextField
//             variant="filled"
//             label="Value 1"
//             value={(field.values && field.values[0]) || ''}
//             onChange={(e) => handleValueChange(e, 0)}
//             onClick={handleClick}
//             sx={textFieldStyle(isClicked)}
//           />
//           <TextField
//             variant="filled"
//             label="Value 2"
//             value={(field.values && field.values[1]) || ''}
//             onChange={(e) => handleValueChange(e, 1)}
//             onClick={handleClick2}
//             sx={textFieldStyle(isClicked2)}
//           />
//         </>
//       );
//     }

//     switch (field.name) {
//       case 'ambiente_rgb':
//         return (
//           <>
//             <TextField
//               variant="filled"
//               label="Red"
//               value={(field.values && field.values[0]) || ''}
//               onChange={(e) => handleValueChange(e, 0)}
//               onClick={handleClick}
//               sx={textFieldStyle(isClicked)}
//             />
//             <TextField
//               variant="filled"
//               label="Green"
//               value={(field.values && field.values[1]) || ''}
//               onChange={(e) => handleValueChange(e, 1)}
//               onClick={handleClick2}
//               sx={textFieldStyle(isClicked2)}
//             />
//             <TextField
//               variant="filled"
//               label="Blue"
//               value={(field.values && field.values[2]) || ''}
//               onChange={(e) => handleValueChange(e, 2)}
//               onClick={handleClick3}
//               sx={textFieldStyle(isClicked3)}
//             />
//           </>
//         );
//       case 'battery_soc':
//       case 'switch_state':
//       case 'ambiente_state':
//         return (
//           <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px', marginLeft: "10px" }}>
//             <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>State</InputLabel>
//             <Select
//               value={(field.values && field.values[0]) || ''}
//               onChange={(e) => handleValueChange(e, 0)}
//               onClick={handleClick}
//               sx={selectStyle(isClicked)}
//             >
//               <MenuItem value="on">On</MenuItem>
//               <MenuItem value="off">Off</MenuItem>
//             </Select>
//           </FormControl>
//         );
//         case 'battery_current':
//         return (
//           <>
//             <TextField
//               variant="filled"
//               label="Amphere Value"
//               value={(field.values && field.values[0]) || ''}
//               onChange={(e) => handleValueChange(e, 0)}
//               onClick={handleClick}
//               sx={textFieldStyle(isClicked)}
//             />
//             <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px', marginLeft: "10px" }}>
//               <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Channel</InputLabel>
//               <Select
//                 value={(field.channel && field.channel) || ''}
//                 onChange={handleChannelChange}
//                 onClick={handleClick3}
//                 sx={selectStyle(isClicked3)}
//               >
//                 {[1, 2, 3, 4, 5].map((channel) => (
//                   <MenuItem key={channel} value={channel}>
//                     {channel}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </>
//         );
//       default:
//         return (
//           <TextField
//             variant="filled"
//             label="Value"
//             value={(field.values && field.values[0]) || ''}
//             onChange={(e) => handleValueChange(e, 0)}
//             onClick={handleClick}
//             sx={textFieldStyle(isClicked)}
//           />
//         );
//     }
//   };

//   const textFieldStyle = (isClicked) => ({
//     color: "white",
//     backgroundColor: '#333',
//     borderRadius: '4px',
//     minWidth: "150px",
//     marginRight: '10px',
//     marginLeft: "10px",
//     "& .MuiInputBase-input": {
//       color: "white"
//     },
//     '& .MuiFilledInput-root': {
//       '&.Mui-focused': {
//         borderColor: '#33c0cb',
//       },
//       '&::after': {
//         borderBottomColor: '#33c0cb',
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: isClicked ? '#33c0cb' : 'white',
//       '&.Mui-focused': {
//         color: '#33c0cb',
//       },
//     },
//   });

//   const selectStyle = (isClicked) => ({
//     color: 'white',
//     backgroundColor: '#333',
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#33c0cb',
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#33c0cb',
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#33c0cb',
//     },
//     '&::after': {
//       borderBottomColor: '#33c0cb',
//     },
//     '& .MuiSvgIcon-root': {
//       color: isClicked ? '#33c0cb' : 'white',
//     },
//   });

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#292929', padding: '8px', borderRadius: '4px' }}>
//       <Typography sx={{ color: 'white', marginRight: '8px' }}>{field.label}</Typography>
//       <FormControl variant="filled" sx={{ minWidth: "150px", marginRight: '10px', marginLeft: "10px" }}>
//         <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: '#33c0cb' } }}>Operator</InputLabel>
//         <Select
//           value={field.operator || ''}
//           onChange={handleOperatorChange}
//           onClick={handleClick3}
//           sx={{
//             color: 'white', backgroundColor: '#333',
//             '&:hover .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#33c0cb',
//             },
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#33c0cb',
//             },
//             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#33c0cb',
//             },
//             '&::after': {
//               borderBottomColor: '#33c0cb',
//             },
//             '& .MuiSvgIcon-root': {
//               color: isClicked3 ? '#33c0cb' : 'white',
//             },
//           }}
//         >
//           {fieldOperators.map((operator) => (
//             <MenuItem key={operator.value} value={operator.value}>
//               {operator.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {renderFields()}
//       <IconButton onClick={handleRemove} sx={{ color: '#ff1744' }}>
//         <CloseIcon />
//       </IconButton>
//     </Box>
//   );
// };


// const DropZone = ({ onDrop, droppedFields, updateField, removeField }) => {
//   const [, ref] = useDrop({
//     accept: ItemTypes.FIELD,
//     drop: (item) => onDrop(item),
//   });

//   return (
//     <Box ref={ref} sx={{ padding: '16px', minHeight: '200px', backgroundColor: '#1e1e1e', borderRadius: '4px', marginTop: '16px' }}>
//       {droppedFields.length === 0 ? (
//         <Typography color="white">Drop fields here</Typography>
//       ) : (
//         droppedFields.map((field, index) => (
//           <DroppedField key={index} field={field} index={index} updateField={updateField} removeField={removeField} />
//         ))
//       )}
//     </Box>
//   );
// };

  

// const DragAndDropEditor = ({ handleClose }) => {
//   const [droppedFields, setDroppedFields] = useState([]);
//   const [droppedFieldsForActions, setDroppedFieldsForActions] = useState([]);
//   const [action, setAction] = useState(false);

//   const handleDrop = (field) => {
//     setDroppedFields((prevFields) => [...prevFields, { ...field, operator: '', values: ['', ''] }]);
//   };

//   const handleDropForAction = (field) => {
//     setDroppedFieldsForActions((prevFields) => [...prevFields, { ...field, operator: '', values: ['', ''] }]);
//   };

//   const updateField = (index, updatedField) => {
//     const newFields = [...droppedFields];
//     newFields[index] = updatedField;
//     setDroppedFields(newFields);
//   };

//   const updateFieldForAction = (index, updatedField) => {
//     const newFields = [...droppedFieldsForActions];
//     newFields[index] = updatedField;
//     setDroppedFieldsForActions(newFields);
//   };

//   const removeField = (index) => {
//     setDroppedFields((prevFields) => prevFields.filter((_, i) => i !== index));
//   };

//   const removeFieldForAction = (index) => {
//     setDroppedFieldsForActions((prevFields) => prevFields.filter((_, i) => i !== index));
//   };

//   const handleModalClose = () => {
//     handleClose();
//   };

//   const handleToggleAction = () =>{
//     if (!droppedFields.length) {
//       toast("Please add at least one rule",{
//         style:{
//             backgroundColor:"#07090c",
//             color:"white",
//           }});
//       return;
//     }

//     const isValid = droppedFields.every(field => {
//       if (field.operator === 'in range' || field.operator === 'out of range') {
//         return field.values && field.values[0] !== '' && field.values[1] !== '';
//       } else if (field.name === 'ambiente_rgb') {
//         return field.values && field.values[0] !== '' && field.values[1] !== '' && field.values[2] !== '';
//       } else if (field.name === 'battery_current') {
//         return field.values && field.values[0] !== '' && field.channel !== '';
//       } else {
//         return field.values && field.values[0] !== '';
//       }
//     });

//     if (!isValid) {
//       toast("Please ensure all rules have a value entered",{
//         style:{
//             backgroundColor:"#07090c",
//             color:"white",
//           }
//       });
//       return;
//     }
//     setAction(!action);
//   }

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Paper elevation={3} className="query-editor-container" sx={{
//         maxWidth:"1000px",
//       }}>
//         { !action ? (
//           <>
//           <Typography variant="h5" color="white" gutterBottom>
//           Drag and Drop Editor
//         </Typography>
//         <Box sx={{ display:"flex" , flexWrap:"wrap", gap:"8px"}}>
//           {fields.map((field) => (
//             <Field key={field.name} name={field.name} label={field.label} />
//           ))}
//         </Box>
//         <DropZone onDrop={handleDrop} droppedFields={droppedFields} updateField={updateField} removeField={removeField}/>
//         <Typography variant="h6" color="white" gutterBottom>
//           Dropped Fields
//         </Typography>
//         <Box>
//           {droppedFields.map((field, index) => (
//             <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
//               {field.label} {field.operator} {(field.operator === 'in range' || field.operator === 'out of range') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]} {(field.label === 'Ambiente RGB')  && `${field.values[0]}, ${field.values[1]} and ${field.values[2]}`}
//             </Typography>
//           ))}
//         </Box>
//         <Box display="flex" justifyContent="flex-end">
//         <Button variant="contained" color="primary" sx={{
//               backgroundColor: "#33c0cb",
//               display: "flex",
//               marginRight: "10px",
//               justifyContent: "flex-end",
//               "&:hover": {
//                 backgroundColor: "#186a70",
//               }
//             }} onClick={handleToggleAction}>
//               + Action
//             </Button>
//           <Button variant="contained" onClick={handleModalClose} color="primary" sx={{
//             backgroundColor: "#33c0cb",
//             display: "flex",
//             justifyContent: "flex-end",
//             "&:hover": {
//               backgroundColor: "#186a70",
//             }
//           }}>
//             Close
//           </Button>
//         </Box></>
//         ) : (
//           <>
//           <Typography variant="h5" color="white" gutterBottom>
//           Add Actions
//         </Typography>
//         <Box sx={{ display:"flex" , flexWrap:"wrap", gap:"8px"}}>
//           {fields.map((field) => (
//             <Field key={field.name} name={field.name} label={field.label} />
//           ))}
//         </Box>
//         <DropZone onDrop={handleDropForAction} droppedFields={droppedFieldsForActions} updateField={updateFieldForAction} removeField={removeFieldForAction}/>
//         <Typography variant="h6" color="white" gutterBottom>
//           Dropped Fields
//         </Typography>
//         <Box>
//           {droppedFieldsForActions.map((field, index) => (
//             <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
//               {field.label} {field.operator} {(field.operator === 'in range' || field.operator === 'out of range') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]} 
//             </Typography>
//           ))}
//         </Box>
//         <Box display="flex" justifyContent="flex-end">
//         <Button variant="contained" color="primary" sx={{
//               backgroundColor: "#33c0cb",
//               display: "flex",
//               marginRight: "10px",
//               justifyContent: "flex-end",
//               "&:hover": {
//                 backgroundColor: "#186a70",
//               }
//             }} onClick={handleToggleAction}>
//               Back To rules
//             </Button>
//           <Button variant="contained" onClick={handleModalClose} color="primary" sx={{
//             backgroundColor: "#33c0cb",
//             display: "flex",
//             justifyContent: "flex-end",
//             "&:hover": {
//               backgroundColor: "#186a70",
//             }
//           }}>
//             Export Query
//           </Button>
//         </Box>
//           </>
//         )}
//       </Paper>
//     </DndProvider>
//   );
// };

// export default DragAndDropEditor;

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Field from './Field'; // Replace with your Field component
// import DropZone from './DropZone'; // Replace with your DropZone component
// import DroppedGroup from './DroppedGroup'; // Import DroppedGroup component
import { toast } from 'react-toastify';

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

const DragAndDropEditor = ({ handleClose, fields = [] }) => { // Ensure fields has a default value
  const [droppedFields, setDroppedFields] = useState([]);
  const [droppedFieldsForActions, setDroppedFieldsForActions] = useState([]);
  const [action, setAction] = useState(false);

  const handleDrop = (item, groupIndex = null) => {
    const newField = { ...item, operator: '', values: ['', ''] };
    if (groupIndex !== null) {
      setDroppedFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[groupIndex].fields.push(newField);
        return newFields;
      });
    } else {
      setDroppedFields((prevFields) => [...prevFields, newField]);
    }
  };

  const handleDropForAction = (field) => {
    setDroppedFieldsForActions((prevFields) => [...prevFields, { ...field, operator: '', values: ['', ''] }]);
  };

  const updateFieldForAction = (index, updatedField) => {
    const newFields = [...droppedFieldsForActions];
    newFields[index] = updatedField;
    setDroppedFieldsForActions(newFields);
  };

  const removeFieldForAction = (index) => {
    setDroppedFieldsForActions((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const createNewGroup = () => {
    setDroppedFields((prevFields) => [...prevFields, { type: 'group', operator: 'AND', fields: [] }]);
  };

  const updateField = (index, updatedField, groupIndex = null) => {
    if (groupIndex !== null) {
      setDroppedFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[groupIndex].fields[index] = updatedField;
        return newFields;
      });
    } else {
      const newFields = [...droppedFields];
      newFields[index] = updatedField;
      setDroppedFields(newFields);
    }
  };

  const removeField = (index, groupIndex = null) => {
    if (groupIndex !== null) {
      setDroppedFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[groupIndex].fields = newFields[groupIndex].fields.filter((_, i) => i !== index);
        return newFields;
      });
    } else {
      setDroppedFields((prevFields) => prevFields.filter((_, i) => i !== index));
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleToggleAction = () => {
    if (!droppedFields.length) {
      toast("Please add at least one rule", {
        style: {
          backgroundColor: "#07090c",
          color: "white",
        }
      });
      return;
    }

    const isValid = droppedFields.every(field => {
      if (field.type === 'group') {
        return field.fields.every(subField => {
          if (subField.operator === 'in range' || subField.operator === 'out of range') {
            return subField.values && subField.values[0] !== '' && subField.values[1] !== '';
          } else if (subField.name === 'ambiente_rgb') {
            return subField.values && subField.values[0] !== '' && subField.values[1] !== '' && subField.values[2] !== '';
          } else if (subField.name === 'battery_current') {
            return subField.values && subField.values[0] !== '' && subField.channel !== '';
          } else {
            return subField.values && subField.values[0] !== '';
          }
        });
      } else {
        if (field.operator === 'in range' || field.operator === 'out of range') {
          return field.values && field.values[0] !== '' && field.values[1] !== '';
        } else if (field.name === 'ambiente_rgb') {
          return field.values && field.values[0] !== '' && field.values[1] !== '' && field.values[2] !== '';
        } else if (field.name === 'battery_current') {
          return field.values && field.values[0] !== '' && field.channel !== '';
        } else {
          return field.values && field.values[0] !== '';
        }
      }
    });

    if (!isValid) {
      toast("Please ensure all rules have a value entered", {
        style: {
          backgroundColor: "#07090c",
          color: "white",
        }
      });
      return;
    }
    setAction(!action);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper elevation={3} className="query-editor-container" sx={{
        maxWidth: "1000px",
      }}>
        {!action ? (
          <>
            <Typography variant="h5" color="white" gutterBottom>
              Drag and Drop Editor
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {fields.map((field) => (
                <Field key={field.name} name={field.name} label={field.label} />
              ))}
            </Box>
            <Button variant="contained" color="primary" sx={{
              backgroundColor: "#33c0cb",
              marginBottom: "8px",
              "&:hover": {
                backgroundColor: "#186a70",
              }
            }} onClick={createNewGroup}>
              + Add Group
            </Button>
            <DropZone onDrop={handleDrop} droppedFields={droppedFields} updateField={updateField} removeField={removeField} />
            <Typography variant="h6" color="white" gutterBottom>
              Dropped Fields
            </Typography>
            <Box>
              {droppedFields.map((field, index) => (
                field.type === 'group' ? (
                  <DroppedGroup
                    key={index}
                    group={field}
                    groupIndex={index}
                    updateField={updateField}
                    removeField={removeField}
                    handleDrop={handleDrop}
                  />
                ) : (
                  <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
                    {field.label} {field.operator} {(field.operator === 'in range' || field.operator === 'out of range') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]} {(field.label === 'Ambiente RGB') && `${field.values[0]}, ${field.values[1]} and ${field.values[2]}`}
                  </Typography>
                )
              ))}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" sx={{
                backgroundColor: "#33c0cb",
                display: "flex",
                marginRight: "10px",
                justifyContent: "flex-end",
                "&:hover": {
                  backgroundColor: "#186a70",
                }
              }} onClick={handleToggleAction}>
                + Action
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
          </>
        ) : (
          <>
            <Typography variant="h5" color="white" gutterBottom>
              Add Actions
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {fields.map((field) => (
                <Field key={field.name} name={field.name} label={field.label} />
              ))}
            </Box>
            <DropZone onDrop={handleDropForAction} droppedFields={droppedFieldsForActions} updateField={updateFieldForAction} removeField={removeFieldForAction} />
            <Typography variant="h6" color="white" gutterBottom>
              Dropped Fields
            </Typography>
            <Box>
              {droppedFieldsForActions.map((field, index) => (
                <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
                  {field.label} {field.operator} {(field.operator === 'in range' || field.operator === 'out of range') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]}
                </Typography>
              ))}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" sx={{
                backgroundColor: "#33c0cb",
                display: "flex",
                marginRight: "10px",
                justifyContent: "flex-end",
                "&:hover": {
                  backgroundColor: "#186a70",
                }
              }} onClick={handleToggleAction}>
                Back To Rules
              </Button>
              <Button variant="contained" onClick={handleModalClose} color="primary" sx={{
                backgroundColor: "#33c0cb",
                display: "flex",
                justifyContent: "flex-end",
                "&:hover": {
                  backgroundColor: "#186a70",
                }
              }}>
                Export Query
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </DndProvider>
  );
};

const DroppedGroup = ({ group, groupIndex, updateField, removeField, handleDrop }) => {
  const handleFieldDrop = (item) => {
    handleDrop(item, groupIndex);
  };

  const handleUpdateField = (index, updatedField) => {
    updateField(index, updatedField, groupIndex);
  };

  const handleRemoveField = (index) => {
    removeField(index, groupIndex);
  };

  return (
    <Box sx={{ marginBottom: '16px', border: '1px solid #33c0cb', borderRadius: '4px', padding: '8px' }}>
      <Typography variant="h6" color="white" gutterBottom>
        Group (AND/OR)
      </Typography>
      <DropZone onDrop={handleFieldDrop} droppedFields={group.fields} updateField={handleUpdateField} removeField={handleRemoveField} />
      {group.fields.map((field, index) => (
        <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
          {field.label} {field.operator} {(field.operator === 'in range' || field.operator === 'out of range') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]} {(field.label === 'Ambiente RGB') && `${field.values[0]}, ${field.values[1]} and ${field.values[2]}`}
        </Typography>
      ))}
      <Button variant="contained" color="secondary" onClick={() => removeField(groupIndex)} sx={{
        backgroundColor: "#33c0cb",
        display: "flex",
        justifyContent: "flex-end",
        "&:hover": {
          backgroundColor: "#186a70",
        }
      }}>
        Remove Group
      </Button>
    </Box>
  );
};

const DropZone = ({ onDrop, droppedFields, updateField, removeField }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'field',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Box ref={drop} sx={{ backgroundColor: isOver ? '#333' : '#222', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
      {droppedFields.map((field, index) => (
        // Render individual fields or groups here based on the type
        field.type === 'group' ? (
          <DroppedGroup
            key={index}
            group={field}
            groupIndex={index}
            updateField={updateField}
            removeField={removeField}
            handleDrop={onDrop}
          />
        ) : (
          <Typography key={index} sx={{ backgroundColor: '#292929', color: 'white', borderRadius: '4px', padding: '8px', margin: '4px 0' }}>
            {field.label} {field.operator} {(field.operator === 'in range' || field.operator === 'out of range') ? `${field.values[0]} and ${field.values[1]}` : field.values[0]} {(field.label === 'Ambiente RGB') && `${field.values[0]}, ${field.values[1]} and ${field.values[2]}`}
          </Typography>
        )
      ))}
    </Box>
  );
};

export default DragAndDropEditor;