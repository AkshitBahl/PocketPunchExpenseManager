import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser, error, loading } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    await registerUser(newUser, navigate);
  };

  return (
    <RegisterStyled>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Register for Expense Manager</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          {error && <p className="error-text">{error}</p>}
          <p className="redirect">
            Already have an account? <Link to="/login" className="link">Log in here</Link>
          </p>
        </div>
      </div>
    </RegisterStyled>
  );
}

const RegisterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f0f0, #fafafa);

  .card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    padding: 2rem;

    .card-body {
      text-align: center;

      .card-title {
        font-size: 1.8rem;
        color: #e91e63;
        margin-bottom: 1.5rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5rem;

        label {
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-align: left;
        }

        input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
      }

      .btn {
        background-color: #e91e63;
        color: #fff;
        font-weight: bold;
        padding: 0.75rem;
        font-size: 1.1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        margin-top: 1rem;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #d81b60;
        }

        &:disabled {
          background-color: #f8bbd0;
          cursor: not-allowed;
        }
      }

      .error-text {
        color: #e53935;
        font-size: 0.9rem;
        margin-top: 1rem;
        background-color: #ffebee;
        padding: 0.5rem;
        border-radius: 5px;
      }

      .redirect {
        margin-top: 1.5rem;
        font-size: 0.9rem;

        .link {
          color: #e91e63;
          text-decoration: none;
          font-weight: bold;
        }
      }
    }
  }
`;

export default Register;
