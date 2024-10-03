import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
    return (
        <nav style={{background:"#323232"}}>
            <ul className='nav' style={{display: "flex", columnGap: "10px", padding: "10px", justifyContent: "space-between"}}>
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