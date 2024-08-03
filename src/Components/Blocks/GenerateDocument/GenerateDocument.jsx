import React, { useState } from 'react';
import axios from 'axios';
import classes from './GenerateDocument.module.css';

const GenerateDocument = () => {
    const [data, setData] = useState({
        Nomer_dogovora: '1123',
        date_dogovora_propis: '1123',
        PolnoeNazvanie_contr_1: '1123',
        Dolzhnost_FIO_contr_1: '1123',
        Osnovanie_contr_1: '1123',
        OGRNIP_contr_1: '1123',
        Polnoe_nazvanie_akk: '1123',
        OGRNIP_akk: '1123',
        predmet_dogovora_rod: '1123',
        stoimost_dogovor: '1123',
        stoimost_dogovor_propis: '1123',
        Data_dogovora: '1123',
        SocrNazvanie_contr_1: '1123',
        Adress_contr_1: '1123',
        INN_contr_1: '1123',
        KPP_contr_1: '1123',
        OKTMO_contr_1: '1123',
        OKATO_contr_1: '1123',
        OKPO_contr_1: '1123',
        OKOPF_contr_1: '1123',
        OGRN_contr_1: '1123',
        R_SCH_contr_1: '1123',
        R_SCH_contr_1: '1123',
        Bank_contr_1: '1123',
        BIK_banka_contr_1: '1123',
        K_SCH_contr_1: '1123',
        OKOGU_contr_1: '1123',
        email_contr_1: '1123',
        tel_contr_1: '1123',
        Polnoe_nazvanie_akk: '1123',
        Adress_akk: '1123',
        INN_akk: '1123',
        OGRNIP_akk: '1123',
        R_SCH_akk: '1123',
        BANK_akk: '1123',
        BIK_akk: '1123',
        K_SCH_akk: '1123',
        email_akk: '1123',
        tel_akk: '1123',
        Dolzhnost_contr_1: '1123',
        IO_F_contr_1: '1123',
        Pechat_contr_1: '1123',
        Dolzhnost_akk: '1123',
        IO_F_akk: '1123',

    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/generate', { data }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResponseMessage(response.data);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setResponseMessage('Ошибка при отправке запроса');
        }
    };

    return (
        <div className={classes.main}>
            <h1>Генерация документа</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.formData}>
                    {Object.keys(data).map((key) => (
                        <div key={key} className={classes.formData_elem}>
                            <label>{key}:</label>
                            <input type="text" name={key} value={data[key]} onChange={handleChange} />
                        </div>
                    ))}
                </div>
                <button type="submit">Сгенерировать документ</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default GenerateDocument;
