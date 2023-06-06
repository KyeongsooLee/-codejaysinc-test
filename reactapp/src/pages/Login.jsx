import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';

const Login = ({ handleLogin }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const [error, setError] = useState('');

      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: form.name,
              password: form.password,
            }),
          });
    
          if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.token);
            alert('Login Successful!');
            handleLogin(); // Perform login
            navigate('/');
          } else if (response.status === 400) {
                setError('UserName or Password does not exist.');
          } else {
            setError('Something went wrong');
          }
        } catch (err) {
          alert(err);
          console.error(err);
        }
      };

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="font-extrabold text-[#222328] text-[32px]">Log in</h1>
            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <FormField 
                    labelName="User Name"
                    type="text"
                    name="name"
                    placeholder="John"
                    value={form.name}
                    handleChange={handleChange}
                />
                <div className="mt-4" />
                <FormField 
                    labelName="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    handleChange={handleChange}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-8" />
                <div className="mt-5 flex gap-5">
                    <button
                        type="submit"
                        className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#185f2e] transition-colors duration-300 ease-in-out"
                    >Login
                    </button>
                </div>
            </form>
        </section>
        )
}

export default Login