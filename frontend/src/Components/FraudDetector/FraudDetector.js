import React, { useState } from 'react';
import styled from 'styled-components';

export default function FraudDetector() {
    const [formData, setFormData] = useState({
        step: '',
        type: '',
        amount: '',
        oldBalanceOrg: '',
        newBalanceOrg: '',
        oldBalanceDest: '',
        newBalanceDest: '',
    });
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/fraud-detection", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.ok) {
            const json = await res.json();
            setResult(json);
        }
    };

    return (
        <DetectorStyled>
            <div className="content-container">
                <div className="form-container">
                    <h1 className="header">Fraud Detector Form</h1>
                    <form onSubmit={handleSubmit} className="form">
                        {Object.keys(formData).map((field) => (
                            <div key={field} className="field-container">
                                <label htmlFor={field} className="label">
                                    {field.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <input
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                    {result && (
                        <div className="result-container">
                            <h3 className="result-header">Result:</h3>
                            {result.status === "Fraud" ? (
                                <p style={{ color: "red", fontWeight: "bold" }}>🚨 Fraud Detected!</p>
                            ) : (
                                <p style={{ color: "green", fontWeight: "bold" }}>✔️ Not Fraud</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="info-container">
                    <h2 className="info-header">Definitions for Payment Parameters</h2>
                    <ul className="info-list">
                        <li><strong>Step:</strong> Represents a unit of time where 1 step equals 1 hour</li>
                        <li><strong>Type:</strong> Type of online transaction</li>
                        <li><strong>Amount:</strong> The amount of the transaction</li>
                        <li><strong>NameOrig:</strong> Customer starting the transaction</li>
                        <li><strong>OldbalanceOrg:</strong> Balance before the transaction</li>
                        <li><strong>NewbalanceOrig:</strong> Balance after the transaction</li>
                        <li><strong>NameDest:</strong> Recipient of the transaction</li>
                        <li><strong>OldbalanceDest:</strong> Initial balance of recipient before the transaction</li>
                        <li><strong>NewbalanceDest:</strong> The new balance of recipient after the transaction</li>
                        <li><strong>IsFraud:</strong> Fraud transaction</li>
                    </ul>
                </div>
            </div>
        </DetectorStyled>
    );
}

const DetectorStyled = styled.div`
    min-height: 80vh;
    background-color: rgba(252, 246, 249, 0.78);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;

    .content-container {
        display: flex;
        width: 100%;
        max-width: 1200px;
        gap: 2rem;
    }

    .form-container {
        flex: 1;
        background: white;
        border-radius: 16px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
    }

    .header {
        background-color: red;
        color: white;
        padding: 1rem;
        margin: -2rem -2rem 1.5rem -2rem;
        border-radius: 16px 16px 0 0;
        font-size: 1rem;
        text-align: center;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .field-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .label {
        color: #222260;
        font-size: 0.9rem;
        font-weight: bold;
        text-transform: capitalize;
    }

    .input {
        padding: 0.8rem;
        border-radius: 8px;
        border: 1px solid rgba(34, 34, 96, 0.6);
        font-size: 1rem;
        transition: border-color 0.3s;
        &:focus {
            border-color: #222260;
        }
    }

    .submit-btn {
        background-color: red;
        color: white;
        padding: 0.8rem 1rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #1a1a50;
        }
    }

    .result-container {
        margin-top: 1.5rem;
        background-color: rgba(252, 246, 249, 0.78);
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .result-header {
        color: #222260;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }

    .result-text {
        color: #222260;
        font-size: 0.9rem;
        white-space: pre-wrap;
    }

    .info-container {
        flex: 1;
        background: white;
        border-radius: 16px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .info-header {
        font-size: 1.4rem;
        font-weight: bold;
        color: #222260;
        margin-bottom: 0.5rem;
    }

    .info-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        color: #444;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        li {
            line-height: 1.5;
        }

        strong {
            color: #222260;
        }
    }
`;
