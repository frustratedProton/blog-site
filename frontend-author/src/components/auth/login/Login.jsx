import axios from 'axios';
import { useState } from 'react';
import { redirect } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChanges = (e) => {
        setEmail(e.target.value); 
    };

    const handlePwdChanges = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and Password are required!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:3001/api/auth/login',
                {
                    email,
                    password,
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                return redirect('/'); // todo: not working correctly
            } else {
                setError('Invalid login credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-container">
                <header>
                    <h1 className="login-title">Login</h1>
                </header>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} aria-labelledby="login-form">
                    <fieldset className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" // Use type="email" for email input
                            id="email"
                            value={email}
                            onChange={handleEmailChanges}
                            placeholder="Enter your email"
                            required
                        />
                    </fieldset>

                    <fieldset className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePwdChanges}
                            placeholder="Enter your password"
                            required
                        />
                    </fieldset>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;
