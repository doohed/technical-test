import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../api/contacsApi.js'

const ContactsDetailPage = () => {
  const token = useSelector(state => state.token);
  const contacts = getContacts();
  console.log(token);
  console.log({contacts});

  if (token === ''){
    return(
      <div>
        please log in...
      </div>)
  }
  return (
    <div>
      <h1>Contact Info</h1>
      <div>
        {contacts.name}
      </div>
    </div>
  )
}

export default ContactsDetailPage
