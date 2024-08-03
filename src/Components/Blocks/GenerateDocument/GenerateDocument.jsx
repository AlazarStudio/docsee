import React, { useState } from 'react';
import axios from 'axios';
import classes from './GenerateDocument.module.css';
import { Link } from 'react-router-dom';

const GenerateDocument = () => {
    return (
        <div className={classes.main}>
            <h2>Список ИП</h2>
            <div className={classes.list}>
                <div className={classes.list_left}>
                    <div className={classes.list_left_ip}>ИП Джатдоев Алим Сеит-Алиевич</div>
                    <div className={classes.list_left_ip}>ИП Уртенов Азамат Заурович</div>
                </div>
                <div className={classes.list_right}>
                    
                </div>
            </div>
        </div>
    );
};

export default GenerateDocument;
