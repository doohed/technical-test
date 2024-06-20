import { useState } from 'react';

const LoginToken = () => {
  const [token, setToken] = useState('');

  const handleToken = () => {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("isLoggedIn",true);
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <br/>
      <button onClick={handleToken}>token</button>
    </div>
  )
}

export default LoginToken
