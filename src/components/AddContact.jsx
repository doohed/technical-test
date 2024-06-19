import React from 'react'
import { Button, Stack, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


const AddContact = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact/create');
  }
  return (
    <div className="text-right mt-5">
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default AddContact
