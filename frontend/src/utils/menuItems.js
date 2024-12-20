import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Team",
        icon: dashboard,
        link: "/team",
    },
    {
        id: 6,
        title: "contact",
        icon: transactions,
        link: "/contact",
    },
    {
        id: 7,
        title: "Fraud Detector",
        icon: trend,
        link: "/frauddetector",
    }
]