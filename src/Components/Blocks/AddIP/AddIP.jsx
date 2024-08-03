import React, { useEffect, useState } from 'react';
import classes from './AddIP.module.css';

const AddIP = () => {
    const [selectedIP, setSelectedIP] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [ipData, setIpData] = useState([]);

    const [Polnoe_nazvanie_akk, setPolnoe_nazvanie_akk] = useState('');
    const [socr_name_akk, setSocr_name_akk] = useState('');
    const [socr_name_fio_akk, setSocr_name_fio_akk] = useState('');
    const [FIO_akk, setFIO_akk] = useState('');
    const [Dolzhnost_akk, setDolzhnost_akk] = useState('');
    const [IO_F_akk, setIO_F_akk] = useState('');
    const [email_akk, setEmail_akk] = useState('');
    const [tel_akk, setTel_akk] = useState('');

    const [newBankName, setNewBankName] = useState('');
    const [INN_akk, setINN_akk] = useState('');
    const [Adress_akk, setAdress_akk] = useState('');
    const [OGRNIP_akk, setOGRNIP_akk] = useState('');
    const [R_SCH_akk, setR_SCH_akk] = useState('');
    const [BANK_akk, setBANK_akk] = useState('');
    const [BIK_akk, setBIK_akk] = useState('');
    const [BANK_inn, setBANK_inn] = useState('');
    const [K_SCH_akk, setK_SCH_akk] = useState('');

    const [isAddIpModalOpen, setIsAddIpModalOpen] = useState(false);
    const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);

    useEffect(() => {
        fetch('../../../../ipName.json')
            .then(response => response.json())
            .then(data => setIpData(data))
            .catch(error => console.error('Error fetching IP data:', error));
    }, []);

    const handleIPClick = (ip) => {
        setSelectedIP(ip === selectedIP ? null : ip);
        setSelectedBank(null);
    };

    const handleBankClick = (bank) => {
        setSelectedBank(bank);
    };

    const getBanksList = (ipName) => {
        const ip = ipData.find(item => item.Polnoe_nazvanie_akk === ipName);
        return ip ? Object.keys(ip.banks) : [];
    };

    const getBankDetails = (ipName, bankName) => {
        const ip = ipData.find(item => item.Polnoe_nazvanie_akk === ipName);
        return ip ? ip.banks[bankName] : {};
    };

    const handleAddIp = () => {
        if (Polnoe_nazvanie_akk) {
            const newIp = {
                Polnoe_nazvanie_akk: Polnoe_nazvanie_akk,
                socr_name_akk: socr_name_akk,
                socr_name_fio_akk: socr_name_fio_akk,
                FIO_akk: FIO_akk,
                Dolzhnost_akk: Dolzhnost_akk,
                IO_F_akk: IO_F_akk,
                email_akk: email_akk,
                tel_akk: tel_akk,
                banks: {}
            };
            setIpData([...ipData, newIp]);
            setPolnoe_nazvanie_akk('');
            setSocr_name_akk('');
            setSocr_name_fio_akk('');
            setFIO_akk('');
            setDolzhnost_akk('');
            setIO_F_akk('');
            setEmail_akk('');
            setTel_akk('');
            setIsAddIpModalOpen(false);
        }
    };

    const handleAddBank = () => {
        if (selectedIP && BANK_akk && INN_akk) {
            const bankNameWithPrefix = `Реквизиты ${BANK_akk}`;
            const updatedIpData = ipData.map(ip => {
                if (ip.Polnoe_nazvanie_akk === selectedIP) {
                    return {
                        ...ip,
                        banks: {
                            ...ip.banks,
                            [bankNameWithPrefix]: {
                                Adress_akk: Adress_akk,
                                INN_akk: INN_akk,
                                OGRNIP_akk: OGRNIP_akk,
                                R_SCH_akk: R_SCH_akk,
                                BANK_akk: BANK_akk,
                                BIK_akk: BIK_akk,
                                BANK_inn: BANK_inn,
                                K_SCH_akk: K_SCH_akk,
                            }
                        }
                    };
                }
                return ip;
            });
            setIpData(updatedIpData);
            setNewBankName('');
            setINN_akk('');
            setAdress_akk('');
            setOGRNIP_akk('');
            setR_SCH_akk('');
            setBANK_akk('');
            setBIK_akk('');
            setBANK_inn('');
            setK_SCH_akk('');
            setIsAddBankModalOpen(false);
        }
    };

    return (
        <div className={classes.main}>
            <div className={classes.main_name}>
                <h2>Список ИП</h2>
                <button className={classes.buttonAddIP} onClick={() => setIsAddIpModalOpen(true)}>Добавить новую организацию</button>
            </div>

            <div className={classes.list}>
                <div className={classes.list_left}>
                    {ipData.map(ip => (
                        <div key={ip.Polnoe_nazvanie_akk} className={classes.ip_container}>
                            <div
                                className={`${classes.list_left_ip} ${selectedIP === ip.Polnoe_nazvanie_akk ? classes.selected : ''}`}
                                onClick={() => handleIPClick(ip.Polnoe_nazvanie_akk)}
                            >
                                {ip.Polnoe_nazvanie_akk}
                            </div>
                            {selectedIP === ip.Polnoe_nazvanie_akk && (
                                <div className={classes.banks_list}>
                                    {getBanksList(ip.Polnoe_nazvanie_akk).map(bank => (
                                        <div
                                            key={bank}
                                            className={`${classes.banks_list_item} ${selectedBank === bank ? classes.selected : ''}`}
                                            onClick={() => handleBankClick(bank)}
                                        >
                                            {bank}
                                        </div>
                                    ))}
                                    <button className={classes.buttonAdd} onClick={() => setIsAddBankModalOpen(true)}>Добавить реквизиты</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={`${classes.list_right} ${selectedBank ? classes.visible : ''}`}>
                    {selectedIP && selectedBank && (
                        <div>
                            <h3>{selectedIP}</h3>
                            <div className={classes.bank_details}>
                                <h4>{selectedBank}</h4>
                                <p><strong>Юридический адрес:</strong> {getBankDetails(selectedIP, selectedBank).Adress_akk}</p>
                                <p><strong>ИНН:</strong> {getBankDetails(selectedIP, selectedBank).INN_akk}</p>
                                <p><strong>ОГРНИП:</strong> {getBankDetails(selectedIP, selectedBank).OGRNIP_akk}</p>
                                <p><strong>Расчётный счёт:</strong> {getBankDetails(selectedIP, selectedBank).R_SCH_akk}</p>
                                <p><strong>Наименование банка:</strong> {getBankDetails(selectedIP, selectedBank).BANK_akk}</p>
                                <p><strong>БИК банка:</strong> {getBankDetails(selectedIP, selectedBank).BIK_akk}</p>
                                <p><strong>ИНН банка:</strong> {getBankDetails(selectedIP, selectedBank).BANK_inn}</p>
                                <p><strong>Корреспондентский счёт:</strong> {getBankDetails(selectedIP, selectedBank).K_SCH_akk}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isAddIpModalOpen && (
                <div className={classes.modal}>
                    <div className={classes.modal_content}>
                        <h3>Добавить новую организацию</h3>
                        <input
                            type="text"
                            placeholder="Полное наименование организации"
                            value={Polnoe_nazvanie_akk}
                            onChange={(e) => setPolnoe_nazvanie_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Сокращенное название: ИП Фамилия Имя Отчество"
                            value={socr_name_akk}
                            onChange={(e) => setSocr_name_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Сокращенное название: ИП Фамилия И.О."
                            value={socr_name_fio_akk}
                            onChange={(e) => setSocr_name_fio_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Полное ФИО"
                            value={FIO_akk}
                            onChange={(e) => setFIO_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Должность: Индивидуальный предприниматель"
                            value={Dolzhnost_akk}
                            onChange={(e) => setDolzhnost_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Сокращенное ФИО: И.О. Фамилия"
                            value={IO_F_akk}
                            onChange={(e) => setIO_F_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email_akk}
                            onChange={(e) => setEmail_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Телефон"
                            value={tel_akk}
                            onChange={(e) => setTel_akk(e.target.value)}
                        />

                        <div className={classes.main_name}>
                            <button onClick={handleAddIp}>Добавить</button>
                            <button onClick={() => setIsAddIpModalOpen(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            {isAddBankModalOpen && (
                <div className={classes.modal}>
                    <div className={classes.modal_content}>
                        <h3>Добавить реквизиты</h3>
                        <input
                            type="text"
                            placeholder="Юридический адрес"
                            value={Adress_akk}
                            onChange={(e) => setAdress_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="ИНН"
                            value={INN_akk}
                            onChange={(e) => setINN_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="ОГРНИП"
                            value={OGRNIP_akk}
                            onChange={(e) => setOGRNIP_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Расчётный счёт"
                            value={R_SCH_akk}
                            onChange={(e) => setR_SCH_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Наименование банка"
                            value={BANK_akk}
                            onChange={(e) => {
                                setBANK_akk(e.target.value);
                                setNewBankName(`Реквизиты ${e.target.value}`);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="БИК банка"
                            value={BIK_akk}
                            onChange={(e) => setBIK_akk(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="ИНН банка"
                            value={BANK_inn}
                            onChange={(e) => setBANK_inn(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Корреспондентский счёт"
                            value={K_SCH_akk}
                            onChange={(e) => setK_SCH_akk(e.target.value)}
                        />
                        <div className={classes.main_name}>
                            <button onClick={handleAddBank}>Добавить реквизиты</button>
                            <button onClick={() => setIsAddBankModalOpen(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddIP;
