import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.jpg';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

function Navigation({ active, setActive }) {
    const { logoutUser, currentUser } = useGlobalContext();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logoutUser(navigate); // Call logoutUser with navigate to redirect after logout
    };

    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="User avatar" />
                <div className="text">
                    <h2>{currentUser?.username || 'Akshit'}</h2> {/* Display username from context */}
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            navigate(item.link); // Navigate to the link when clicked
                        }}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">
                <button onClick={handleSignOut} className="sign-out-btn">
                    {signout} Sign Out
                </button>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    
    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: 0.2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2 {
            color: rgba(34, 34, 96, 1);
        }
        p {
            color: rgba(34, 34, 96, 0.6);
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            color: rgba(34, 34, 96, 0.6);
            padding-left: 1rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all 0.4s ease-in-out;
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        i {
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        display: flex;
        justify-content: center;
        .sign-out-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: none;
            border: none;
            color: rgba(34, 34, 96, 0.6);
            font-weight: 500;
            cursor: pointer;
            font-size: 1rem;
            transition: color 0.3s ease;
            
            &:hover {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
`;

export default Navigation;
