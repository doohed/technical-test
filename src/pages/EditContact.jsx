import React from 'react'
import { useParams } from "react-router-dom";

const EditContact = () => {
  const params = useParams();

  console.log(params.id);

    
  

  return (
    <div>
      {params.id}

    </div>
  )
}

export default EditContact
