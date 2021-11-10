import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register(props) {
    const navigate = useNavigate();
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

  // handle button click of login form
    const handleRegister = () => {
        setError(null);
        setLoading(true);

    }

    return (
        <div>
            Login<br /><br />
        <div>
            Username<br />
        <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
            Password<br />
            <input type="password" {...password} autoComplete="new-password" />
        </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
        </div>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Register;