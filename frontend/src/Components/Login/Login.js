import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, loading, error } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({ email, password }, navigate);
  };

  return (
    <LoginStyled>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Login to Expense Manager</h2>
          {error && <div className="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
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
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <p className="redirect">
            Don't have an account? <Link to="/register" className="link">Register here</Link>
          </p>
        </div>
      </div>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e0e0, #f5f5f5);

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

      .alert {
        color: #e53935;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-radius: 5px;
        background-color: #ffebee;
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

export default Login;
