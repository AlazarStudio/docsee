import React from "react";
import classes from './Header.module.css';
import { Link } from "react-router-dom";

function Header({ children, active, ...props }) {
    return (
        <>
            <div className={classes.header}>
                <Link to={'/'} className={classes.header_logo}>
                    <img src="/logo.png" alt="" />
                </Link>
                <div className={classes.header_items}>
                    <Link to={'/ip'} className={`${classes.header_items_link} ${active == 'ИП' && classes.header_items_link_active}`}>ИП</Link>
                    <Link to={'/contractors'} className={`${classes.header_items_link} ${active == 'Контрагенты' && classes.header_items_link_active}`}>Контрагенты</Link>
                    <Link to={'/documents'} className={`${classes.header_items_link} ${active == 'Документы' && classes.header_items_link_active}`}>Документы</Link>
                </div>
            </div>
        </>
    );
}

export default Header;