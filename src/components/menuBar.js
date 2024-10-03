import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <nav>
            <ul className='nav' style={{display: "flex", columnGap: "10px"}}>
                <li>
                    <Link style={{color: "white"}} to="/">Productos</Link>
                </li>
                <li>
                    <Link style={{color: "white"}} to="/users">Usuarios</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MenuBar;