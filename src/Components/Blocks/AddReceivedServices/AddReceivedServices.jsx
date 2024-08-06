import React, { useEffect, useState } from 'react';
import classes from './AddReceivedServices.module.css';
import axios from 'axios';

const AddReceivedServices = () => {
    const [selectedContr, setSelectedContr] = useState(null);
    const [contrData, setContrData] = useState([]);

    const [PolnoeNazvanie_contr_2, setPolnoeNazvanie_contr_2] = useState('');
    const [Dolzhnost_FIO_contr_2, setDolzhnost_FIO_contr_2] = useState('');
    const [Osnovanie_contr_2, setOsnovanie_contr_2] = useState('Устава');
    const [SocrNazvanie_contr_2, setSocrNazvanie_contr_2] = useState('');
    const [OGRNIP_contr_2, setOGRNIP_contr_2] = useState('');
    const [Adress_contr_2, setAdress_contr_2] = useState('');
    const [INN_contr_2, setINN_contr_2] = useState('');
    const [KPP_contr_2, setKPP_contr_2] = useState('');
    const [OKTMO_contr_2, setOKTMO_contr_2] = useState('');
    const [OKATO_contr_2, setOKATO_contr_2] = useState('');
    const [Pechat_contr_2, setPechat_contr_2] = useState(false);
    const [Dolzhnost_contr_2, setDolzhnost_contr_2] = useState('');
    const [IO_F_contr_2, setIO_F_contr_2] = useState('');
    const [OKPO_contr_2, setOKPO_contr_2] = useState('');
    const [OKOPF_contr_2, setOKOPF_contr_2] = useState('');
    const [OGRN_contr_2, setOGRN_contr_2] = useState('');
    const [L_SCH_contr_2, setL_SCH_contr_2] = useState('');
    const [R_SCH_contr_2, setR_SCH_contr_2] = useState('');
    const [K_SCH_contr_2, setK_SCH_contr_2] = useState('');
    const [Bank_contr_2, setBank_contr_2] = useState('');
    const [BIK_banka_contr_2, setBIK_banka_contr_2] = useState('');
    const [OKOGU_contr_2, setOKOGU_contr_2] = useState('');
    const [email_contr_2, setEmail_contr_2] = useState('');
    const [tel_contr_2, setTel_contr_2] = useState('');
    const [genderContr, setGenderContr] = useState('Мужской');
    const [passport_nomer_contr_2, setpassport_nomer_contr_2] = useState('');
    const [passport_seria_contr_2, setpassport_seria_contr_2] = useState('');
    const [fioContr, setFioContr] = useState('');

    const [isAddContrModalOpen, setIsAddContrModalOpen] = useState(false);

    const handleContrClick = (contr) => {
        setSelectedContr(contr === selectedContr ? null : contr);
    };

    const handleAddContr = () => {
        if (PolnoeNazvanie_contr_2) {
            let osnovanieText = Osnovanie_contr_2;
            if (Osnovanie_contr_2 === 'ИП') {
                osnovanieText = 'ОГРИНИП';
            } else if (Osnovanie_contr_2 === 'Самозанятый') {
                osnovanieText = genderContr === 'Мужской'
                    ? 'зарегистрирован в ФНС в качестве налогоплательщика налога на профессиональный доход в соответствии с ФЗ от 27.11.2018 №422-ФЗ'
                    : 'зарегистрирована в ФНС в качестве налогоплательщика налога на профессиональный доход в соответствии с ФЗ от 27.11.2018 №422-ФЗ';
            } else if (Osnovanie_contr_2 === 'Устав') {
                osnovanieText = 'Устава';
            }

            const newContr = {
                PolnoeNazvanie_contr_2,
                ...(SocrNazvanie_contr_2 && { SocrNazvanie_contr_2 }),
                ...(osnovanieText && { Osnovanie_contr_2: osnovanieText }),
                ...(Pechat_contr_2 && { Pechat_contr_2: "М.П." }),
                ...(Dolzhnost_contr_2 && { Dolzhnost_contr_2 }),
                ...(fioContr && { fioContr }),
                ...(Dolzhnost_FIO_contr_2 && { Dolzhnost_FIO_contr_2 }),
                ...(IO_F_contr_2 && { IO_F_contr_2 }),
                ...(passport_seria_contr_2 && { passport_seria_contr_2 }),
                ...(passport_nomer_contr_2 && { passport_nomer_contr_2 }),
                ...(Adress_contr_2 && { Adress_contr_2 }),
                ...(INN_contr_2 && { INN_contr_2 }),
                ...(KPP_contr_2 && { KPP_contr_2 }),
                ...(OKTMO_contr_2 && { OKTMO_contr_2 }),
                ...(OKATO_contr_2 && { OKATO_contr_2 }),
                ...(OKPO_contr_2 && { OKPO_contr_2 }),
                ...(OKOPF_contr_2 && { OKOPF_contr_2 }),
                ...(OGRN_contr_2 && { OGRN_contr_2 }),
                ...(OGRNIP_contr_2 && { OGRNIP_contr_2 }),
                ...(L_SCH_contr_2 && { L_SCH_contr_2 }),
                ...(R_SCH_contr_2 && { R_SCH_contr_2 }),
                ...(K_SCH_contr_2 && { K_SCH_contr_2 }),
                ...(Bank_contr_2 && { Bank_contr_2 }),
                ...(BIK_banka_contr_2 && { BIK_banka_contr_2 }),
                ...(OKOGU_contr_2 && { OKOGU_contr_2 }),
                ...(email_contr_2 && { email_contr_2 }),
                ...(tel_contr_2 && { tel_contr_2 }),
                ...(genderContr && { genderContr }),
            };
            axios.post('http://localhost:3000/add-receivedServices', { data: newContr })
                .then(() => {
                    setContrData([...contrData, newContr]);
                    setPolnoeNazvanie_contr_2('');
                    setDolzhnost_FIO_contr_2('');
                    setSocrNazvanie_contr_2('');
                    setOsnovanie_contr_2('');
                    setPechat_contr_2(false);
                    setDolzhnost_contr_2('');
                    setFioContr('');
                    setDolzhnost_FIO_contr_2('');
                    setIO_F_contr_2('');
                    setpassport_seria_contr_2('');
                    setpassport_nomer_contr_2('');
                    setAdress_contr_2('');
                    setINN_contr_2('');
                    setKPP_contr_2('');
                    setOKTMO_contr_2('');
                    setOKATO_contr_2('');
                    setOKPO_contr_2('');
                    setOKOPF_contr_2('');
                    setOGRN_contr_2('');
                    setOGRNIP_contr_2('');
                    setL_SCH_contr_2('');
                    setR_SCH_contr_2('');
                    setK_SCH_contr_2('');
                    setBank_contr_2('');
                    setBIK_banka_contr_2('');
                    setOKOGU_contr_2('');
                    setEmail_contr_2('');
                    setTel_contr_2('');
                    setGenderContr('');
                    setIsAddContrModalOpen(false);
                })
                .catch(error => console.error('Error adding contragent:', error));
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3000/db/receivedServices.json')
            .then(response => setContrData(response.data))
            .catch(error => console.error('Error fetching IP data:', error));
    }, []);

    return (
        <div className={classes.main}>
            <div className={classes.main_name}>
                <h2>Список получателей услуг</h2>
                <button className={classes.buttonAddContr} onClick={() => setIsAddContrModalOpen(true)}>Добавить нового получателя услуг</button>
            </div>

            <div className={classes.list}>
                <div className={classes.list_left}>
                    {contrData.map(contr => (
                        <div key={contr.PolnoeNazvanie_contr_2} className={classes.contr_container}>
                            <div
                                className={`${classes.list_left_contr} ${selectedContr === contr.PolnoeNazvanie_contr_2 ? classes.selected : ''}`}
                                onClick={() => handleContrClick(contr.PolnoeNazvanie_contr_2)}
                            >
                                {contr.PolnoeNazvanie_contr_2} ({contr.Bank_contr_2})
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${classes.list_right} ${selectedContr ? classes.visible : ''}`}>
                    {selectedContr && contrData.filter(contr => contr.PolnoeNazvanie_contr_2 === selectedContr).map(contr => (
                        <div key={contr.PolnoeNazvanie_contr_2}>
                            <h3>{contr.PolnoeNazvanie_contr_2}</h3>
                            <div className={classes.bank_details}>
                                {contr.PolnoeNazvanie_contr_2 && <p><strong>Полное наименование:</strong> {contr.PolnoeNazvanie_contr_2}</p>}
                                {contr.SocrNazvanie_contr_2 && <p><strong>Сокращенное наименование:</strong> {contr.SocrNazvanie_contr_2}</p>}
                                {contr.Osnovanie_contr_2 && <p><strong>Действует на основании:</strong> {contr.Osnovanie_contr_2}</p>}
                                {contr.Pechat_contr_2 && <p><strong>Печать:</strong> {contr.Pechat_contr_2}</p>}
                                {contr.Dolzhnost_contr_2 && <p><strong>Должность:</strong> {contr.Dolzhnost_contr_2}</p>}
                                {contr.fioContr && <p><strong>ФИО:</strong> {contr.fioContr}</p>}
                                {contr.Dolzhnost_FIO_contr_2 && <p><strong>Должность и ФИО (в род. падеже):</strong> {contr.Dolzhnost_FIO_contr_2}</p>}
                                {contr.IO_F_contr_2 && <p><strong>И.О. Фамилия:</strong> {contr.IO_F_contr_2}</p>}
                                {contr.passport_seria_contr_2 && <p><strong>Паспорт Серия:</strong> {contr.passport_seria_contr_2}</p>}
                                {contr.passport_nomer_contr_2 && <p><strong>Паспорт Номер:</strong> {contr.passport_nomer_contr_2}</p>}
                                {contr.Adress_contr_2 && <p><strong>Адрес:</strong> {contr.Adress_contr_2}</p>}
                                {contr.INN_contr_2 && <p><strong>ИНН:</strong> {contr.INN_contr_2}</p>}
                                {contr.KPP_contr_2 && <p><strong>КПП:</strong> {contr.KPP_contr_2}</p>}
                                {contr.OKTMO_contr_2 && <p><strong>ОКТМО:</strong> {contr.OKTMO_contr_2}</p>}
                                {contr.OKATO_contr_2 && <p><strong>ОКАТО:</strong> {contr.OKATO_contr_2}</p>}
                                {contr.OKPO_contr_2 && <p><strong>ОКПО:</strong> {contr.OKPO_contr_2}</p>}
                                {contr.OKOPF_contr_2 && <p><strong>ОКОПФ:</strong> {contr.OKOPF_contr_2}</p>}
                                {contr.OGRN_contr_2 && <p><strong>ОГРН:</strong> {contr.OGRN_contr_2}</p>}
                                {contr.OGRNIP_contr_2 && <p><strong>ОГРНИП:</strong> {contr.OGRNIP_contr_2}</p>}
                                {contr.L_SCH_contr_2 && <p><strong>Л/СЧ:</strong> {contr.L_SCH_contr_2}</p>}
                                {contr.R_SCH_contr_2 && <p><strong>Р/СЧ:</strong> {contr.R_SCH_contr_2}</p>}
                                {contr.K_SCH_contr_2 && <p><strong>К/СЧ:</strong> {contr.K_SCH_contr_2}</p>}
                                {contr.Bank_contr_2 && <p><strong>Банк:</strong> {contr.Bank_contr_2}</p>}
                                {contr.BIK_banka_contr_2 && <p><strong>БИК банка:</strong> {contr.BIK_banka_contr_2}</p>}
                                {contr.OKOGU_contr_2 && <p><strong>ОКОГУ:</strong> {contr.OKOGU_contr_2}</p>}
                                {contr.email_contr_2 && <p><strong>E-mail:</strong> {contr.email_contr_2}</p>}
                                {contr.tel_contr_2 && <p><strong>Телефон:</strong> {contr.tel_contr_2}</p>}
                                {contr.genderContr && <p><strong>Пол:</strong> {contr.genderContr}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isAddContrModalOpen && (
                <div className={classes.modal}>
                    <div className={classes.modal_content}>
                        <h3>Добавить нового контрагента</h3>
                        <div className={classes.listItems}>
                            <input
                                type="text"
                                placeholder="Полное наименование компании"
                                value={PolnoeNazvanie_contr_2}
                                onChange={(e) => setPolnoeNazvanie_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Сокращенное наименование"
                                value={SocrNazvanie_contr_2}
                                onChange={(e) => setSocrNazvanie_contr_2(e.target.value)}
                            />

                            <label>
                                Основание
                                <select
                                    value={Osnovanie_contr_2}
                                    onChange={(e) => setOsnovanie_contr_2(e.target.value)}
                                >
                                    <option value="Устав">Устав</option>
                                    <option value="ИП">ИП</option>
                                    <option value="Самозанятый">Самозанятый</option>
                                </select>
                            </label>

                            <label>
                                Печать
                                <select
                                    value={Pechat_contr_2}
                                    onChange={(e) => setPechat_contr_2(e.target.value === "true")}
                                >
                                    <option value="false">Нет</option>
                                    <option value="true">Да</option>
                                </select>
                            </label>
                            <input
                                type="text"
                                placeholder="Должность"
                                value={Dolzhnost_contr_2}
                                onChange={(e) => setDolzhnost_contr_2(e.target.value)}
                            />
                            <label>
                                Пол
                                <select
                                    value={genderContr}
                                    onChange={(e) => setGenderContr(e.target.value)}
                                >
                                    <option value="Мужской">Мужской</option>
                                    <option value="Женский">Женский</option>
                                </select>
                            </label>
                            <input
                                type="text"
                                placeholder="ФИО"
                                value={fioContr}
                                onChange={(e) => setFioContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Должность и ФИО (в род. падеже)"
                                value={Dolzhnost_FIO_contr_2}
                                onChange={(e) => setDolzhnost_FIO_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="И.О. Фамилия"
                                value={IO_F_contr_2}
                                onChange={(e) => setIO_F_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Паспорт Серия (для самозанятых)"
                                value={passport_seria_contr_2}
                                onChange={(e) => setpassport_seria_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Паспорт номер (для самозанятых)"
                                value={passport_nomer_contr_2}
                                onChange={(e) => setpassport_nomer_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Адрес"
                                value={Adress_contr_2}
                                onChange={(e) => setAdress_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ИНН"
                                value={INN_contr_2}
                                onChange={(e) => setINN_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="КПП"
                                value={KPP_contr_2}
                                onChange={(e) => setKPP_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКТМО (для гос.)"
                                value={OKTMO_contr_2}
                                onChange={(e) => setOKTMO_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКАТО (для гос.)"
                                value={OKATO_contr_2}
                                onChange={(e) => setOKATO_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКПО (для гос.)"
                                value={OKPO_contr_2}
                                onChange={(e) => setOKPO_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКОПФ (для гос.)"
                                value={OKOPF_contr_2}
                                onChange={(e) => setOKOPF_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОГРН"
                                value={OGRN_contr_2}
                                onChange={(e) => setOGRN_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОГРНИП (для ИП)"
                                value={OGRNIP_contr_2}
                                onChange={(e) => setOGRNIP_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Л/СЧ (для гос.)"
                                value={L_SCH_contr_2}
                                onChange={(e) => setL_SCH_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Р/СЧ"
                                value={R_SCH_contr_2}
                                onChange={(e) => setR_SCH_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="К/СЧ"
                                value={K_SCH_contr_2}
                                onChange={(e) => setK_SCH_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Наименование банка"
                                value={Bank_contr_2}
                                onChange={(e) => setBank_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="БИК банка"
                                value={BIK_banka_contr_2}
                                onChange={(e) => setBIK_banka_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКОГУ"
                                value={OKOGU_contr_2}
                                onChange={(e) => setOKOGU_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={email_contr_2}
                                onChange={(e) => setEmail_contr_2(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Телефон"
                                value={tel_contr_2}
                                onChange={(e) => setTel_contr_2(e.target.value)}
                            />
                        </div>
                        <div className={classes.main_name}>
                            <button onClick={handleAddContr}>Добавить</button>
                            <button onClick={() => setIsAddContrModalOpen(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddReceivedServices;
