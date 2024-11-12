import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async (credentials, navigate) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}login`, credentials);
            setUser(response.data.user); 
            setIsAuthenticated(true);
            setError(null); 
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const currentUser = () => {
        console.log(user.username)
        return user ? user.username : null;
    };

    const registerUser = async (newUser, navigate) => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}register`, newUser);
            setUser(response.data.user); 
            setIsAuthenticated(true);
            setError(null); 
            navigate('/login'); 
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = (navigate) => {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login'); 
    };

    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
            setError(err.response?.data?.message);
        });
        getIncomes();
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response.data);
        console.log(response.data);
    };

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    const addExpense = async (expense) => {
        await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
            setError(err.response?.data?.message);
        });
        getExpenses();
    };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        setExpenses(response.data);
        console.log(response.data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    };

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
                user,
                isAuthenticated,
                loading,
                loginUser,
                registerUser,
                logoutUser,
                currentUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
