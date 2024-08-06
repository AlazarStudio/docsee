import React, { useEffect, useState } from 'react';
import classes from './AddReceivedServices.module.css';
import axios from 'axios';

const AddReceivedServices = () => {
    const [selectedContr, setSelectedContr] = useState(null);
    const [contrData, setContrData] = useState([]);

    const [PolnoeNazvanie_contr_1, setPolnoeNazvanie_contr_1] = useState('');
    const [Dolzhnost_FIO_contr_1, setDolzhnost_FIO_contr_1] = useState('');
    const [Osnovanie_contr_1, setOsnovanie_contr_1] = useState('Устава');
    const [SocrNazvanie_contr_1, setSocrNazvanie_contr_1] = useState('');
    const [OGRNIP_contr_1, setOGRNIP_contr_1] = useState('');
    const [Adress_contr_1, setAdress_contr_1] = useState('');
    const [INN_contr_1, setINN_contr_1] = useState('');
    const [KPP_contr_1, setKPP_contr_1] = useState('');
    const [OKTMO_contr_1, setOKTMO_contr_1] = useState('');
    const [OKATO_contr_1, setOKATO_contr_1] = useState('');
    const [Pechat_contr_1, setPechat_contr_1] = useState(false);
    const [Dolzhnost_contr_1, setDolzhnost_contr_1] = useState('');
    const [IO_F_contr_1, setIO_F_contr_1] = useState('');
    const [OKPO_contr_1, setOKPO_contr_1] = useState('');
    const [OKOPF_contr_1, setOKOPF_contr_1] = useState('');
    const [OGRN_contr_1, setOGRN_contr_1] = useState('');
    const [L_SCH_contr_1, setL_SCH_contr_1] = useState('');
    const [R_SCH_contr_1, setR_SCH_contr_1] = useState('');
    const [K_SCH_contr_1, setK_SCH_contr_1] = useState('');
    const [Bank_contr_1, setBank_contr_1] = useState('');
    const [BIK_banka_contr_1, setBIK_banka_contr_1] = useState('');
    const [OKOGU_contr_1, setOKOGU_contr_1] = useState('');
    const [email_contr_1, setEmail_contr_1] = useState('');
    const [tel_contr_1, setTel_contr_1] = useState('');
    const [genderContr, setGenderContr] = useState('Мужской');
    const [passportNomerContr, setPassportNomerContr] = useState('');
    const [passportSeriaContr, setPassportSeriaContr] = useState('');
    const [fioContr, setFioContr] = useState('');

    const [isAddContrModalOpen, setIsAddContrModalOpen] = useState(false);

    const handleContrClick = (contr) => {
        setSelectedContr(contr === selectedContr ? null : contr);
    };

    const handleAddContr = () => {
        if (PolnoeNazvanie_contr_1) {
            let osnovanieText = Osnovanie_contr_1;
            if (Osnovanie_contr_1 === 'ИП') {
                osnovanieText = 'ОГРИНИП';
            } else if (Osnovanie_contr_1 === 'Самозанятый') {
                osnovanieText = genderContr === 'Мужской'
                    ? 'зарегистрирован в ФНС в качестве налогоплательщика налога на профессиональный доход в соответствии с ФЗ от 27.11.2018 №422-ФЗ'
                    : 'зарегистрирована в ФНС в качестве налогоплательщика налога на профессиональный доход в соответствии с ФЗ от 27.11.2018 №422-ФЗ';
            } else if (Osnovanie_contr_1 === 'Устав') {
                osnovanieText = 'Устава';
            }

            const newContr = {
                PolnoeNazvanie_contr_1,
                ...(SocrNazvanie_contr_1 && { SocrNazvanie_contr_1 }),
                ...(osnovanieText && { Osnovanie_contr_1: osnovanieText }),
                ...(Pechat_contr_1 && { Pechat_contr_1: "М.П." }),
                ...(Dolzhnost_contr_1 && { Dolzhnost_contr_1 }),
                ...(fioContr && { fioContr }),
                ...(Dolzhnost_FIO_contr_1 && { Dolzhnost_FIO_contr_1 }),
                ...(IO_F_contr_1 && { IO_F_contr_1 }),
                ...(passportSeriaContr && { passportSeriaContr }),
                ...(passportNomerContr && { passportNomerContr }),
                ...(Adress_contr_1 && { Adress_contr_1 }),
                ...(INN_contr_1 && { INN_contr_1 }),
                ...(KPP_contr_1 && { KPP_contr_1 }),
                ...(OKTMO_contr_1 && { OKTMO_contr_1 }),
                ...(OKATO_contr_1 && { OKATO_contr_1 }),
                ...(OKPO_contr_1 && { OKPO_contr_1 }),
                ...(OKOPF_contr_1 && { OKOPF_contr_1 }),
                ...(OGRN_contr_1 && { OGRN_contr_1 }),
                ...(OGRNIP_contr_1 && { OGRNIP_contr_1 }),
                ...(L_SCH_contr_1 && { L_SCH_contr_1 }),
                ...(R_SCH_contr_1 && { R_SCH_contr_1 }),
                ...(K_SCH_contr_1 && { K_SCH_contr_1 }),
                ...(Bank_contr_1 && { Bank_contr_1 }),
                ...(BIK_banka_contr_1 && { BIK_banka_contr_1 }),
                ...(OKOGU_contr_1 && { OKOGU_contr_1 }),
                ...(email_contr_1 && { email_contr_1 }),
                ...(tel_contr_1 && { tel_contr_1 }),
                ...(genderContr && { genderContr }),
            };
            axios.post('http://localhost:3000/add-receivedServices', { data: newContr })
                .then(() => {
                    setContrData([...contrData, newContr]);
                    setPolnoeNazvanie_contr_1('');
                    setDolzhnost_FIO_contr_1('');
                    setSocrNazvanie_contr_1('');
                    setOsnovanie_contr_1('');
                    setPechat_contr_1(false);
                    setDolzhnost_contr_1('');
                    setFioContr('');
                    setDolzhnost_FIO_contr_1('');
                    setIO_F_contr_1('');
                    setPassportSeriaContr('');
                    setPassportNomerContr('');
                    setAdress_contr_1('');
                    setINN_contr_1('');
                    setKPP_contr_1('');
                    setOKTMO_contr_1('');
                    setOKATO_contr_1('');
                    setOKPO_contr_1('');
                    setOKOPF_contr_1('');
                    setOGRN_contr_1('');
                    setOGRNIP_contr_1('');
                    setL_SCH_contr_1('');
                    setR_SCH_contr_1('');
                    setK_SCH_contr_1('');
                    setBank_contr_1('');
                    setBIK_banka_contr_1('');
                    setOKOGU_contr_1('');
                    setEmail_contr_1('');
                    setTel_contr_1('');
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
                        <div key={contr.PolnoeNazvanie_contr_1} className={classes.contr_container}>
                            <div
                                className={`${classes.list_left_contr} ${selectedContr === contr.PolnoeNazvanie_contr_1 ? classes.selected : ''}`}
                                onClick={() => handleContrClick(contr.PolnoeNazvanie_contr_1)}
                            >
                                {contr.PolnoeNazvanie_contr_1} ({contr.Bank_contr_1})
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${classes.list_right} ${selectedContr ? classes.visible : ''}`}>
                    {selectedContr && contrData.filter(contr => contr.PolnoeNazvanie_contr_1 === selectedContr).map(contr => (
                        <div key={contr.PolnoeNazvanie_contr_1}>
                            <h3>{contr.PolnoeNazvanie_contr_1}</h3>
                            <div className={classes.bank_details}>
                                {contr.PolnoeNazvanie_contr_1 && <p><strong>Полное наименование:</strong> {contr.PolnoeNazvanie_contr_1}</p>}
                                {contr.SocrNazvanie_contr_1 && <p><strong>Сокращенное наименование:</strong> {contr.SocrNazvanie_contr_1}</p>}
                                {contr.Osnovanie_contr_1 && <p><strong>Действует на основании:</strong> {contr.Osnovanie_contr_1}</p>}
                                {contr.Pechat_contr_1 && <p><strong>Печать:</strong> {contr.Pechat_contr_1}</p>}
                                {contr.Dolzhnost_contr_1 && <p><strong>Должность:</strong> {contr.Dolzhnost_contr_1}</p>}
                                {contr.fioContr && <p><strong>ФИО:</strong> {contr.fioContr}</p>}
                                {contr.Dolzhnost_FIO_contr_1 && <p><strong>Должность и ФИО (в род. падеже):</strong> {contr.Dolzhnost_FIO_contr_1}</p>}
                                {contr.IO_F_contr_1 && <p><strong>И.О. Фамилия:</strong> {contr.IO_F_contr_1}</p>}
                                {contr.passportSeriaContr && <p><strong>Паспорт Серия:</strong> {contr.passportSeriaContr}</p>}
                                {contr.passportNomerContr && <p><strong>Паспорт Номер:</strong> {contr.passportNomerContr}</p>}
                                {contr.Adress_contr_1 && <p><strong>Адрес:</strong> {contr.Adress_contr_1}</p>}
                                {contr.INN_contr_1 && <p><strong>ИНН:</strong> {contr.INN_contr_1}</p>}
                                {contr.KPP_contr_1 && <p><strong>КПП:</strong> {contr.KPP_contr_1}</p>}
                                {contr.OKTMO_contr_1 && <p><strong>ОКТМО:</strong> {contr.OKTMO_contr_1}</p>}
                                {contr.OKATO_contr_1 && <p><strong>ОКАТО:</strong> {contr.OKATO_contr_1}</p>}
                                {contr.OKPO_contr_1 && <p><strong>ОКПО:</strong> {contr.OKPO_contr_1}</p>}
                                {contr.OKOPF_contr_1 && <p><strong>ОКОПФ:</strong> {contr.OKOPF_contr_1}</p>}
                                {contr.OGRN_contr_1 && <p><strong>ОГРН:</strong> {contr.OGRN_contr_1}</p>}
                                {contr.OGRNIP_contr_1 && <p><strong>ОГРНИП:</strong> {contr.OGRNIP_contr_1}</p>}
                                {contr.L_SCH_contr_1 && <p><strong>Л/СЧ:</strong> {contr.L_SCH_contr_1}</p>}
                                {contr.R_SCH_contr_1 && <p><strong>Р/СЧ:</strong> {contr.R_SCH_contr_1}</p>}
                                {contr.K_SCH_contr_1 && <p><strong>К/СЧ:</strong> {contr.K_SCH_contr_1}</p>}
                                {contr.Bank_contr_1 && <p><strong>Банк:</strong> {contr.Bank_contr_1}</p>}
                                {contr.BIK_banka_contr_1 && <p><strong>БИК банка:</strong> {contr.BIK_banka_contr_1}</p>}
                                {contr.OKOGU_contr_1 && <p><strong>ОКОГУ:</strong> {contr.OKOGU_contr_1}</p>}
                                {contr.email_contr_1 && <p><strong>E-mail:</strong> {contr.email_contr_1}</p>}
                                {contr.tel_contr_1 && <p><strong>Телефон:</strong> {contr.tel_contr_1}</p>}
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
                                value={PolnoeNazvanie_contr_1}
                                onChange={(e) => setPolnoeNazvanie_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Сокращенное наименование"
                                value={SocrNazvanie_contr_1}
                                onChange={(e) => setSocrNazvanie_contr_1(e.target.value)}
                            />

                            <label>
                                Основание
                                <select
                                    value={Osnovanie_contr_1}
                                    onChange={(e) => setOsnovanie_contr_1(e.target.value)}
                                >
                                    <option value="Устав">Устав</option>
                                    <option value="ИП">ИП</option>
                                    <option value="Самозанятый">Самозанятый</option>
                                </select>
                            </label>

                            <label>
                                Печать
                                <select
                                    value={Pechat_contr_1}
                                    onChange={(e) => setPechat_contr_1(e.target.value === "true")}
                                >
                                    <option value="false">Нет</option>
                                    <option value="true">Да</option>
                                </select>
                            </label>
                            <input
                                type="text"
                                placeholder="Должность"
                                value={Dolzhnost_contr_1}
                                onChange={(e) => setDolzhnost_contr_1(e.target.value)}
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
                                value={Dolzhnost_FIO_contr_1}
                                onChange={(e) => setDolzhnost_FIO_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="И.О. Фамилия"
                                value={IO_F_contr_1}
                                onChange={(e) => setIO_F_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Паспорт Серия (для самозанятых)"
                                value={passportSeriaContr}
                                onChange={(e) => setPassportSeriaContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Паспорт номер (для самозанятых)"
                                value={passportNomerContr}
                                onChange={(e) => setPassportNomerContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Адрес"
                                value={Adress_contr_1}
                                onChange={(e) => setAdress_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ИНН"
                                value={INN_contr_1}
                                onChange={(e) => setINN_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="КПП"
                                value={KPP_contr_1}
                                onChange={(e) => setKPP_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКТМО (для гос.)"
                                value={OKTMO_contr_1}
                                onChange={(e) => setOKTMO_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКАТО (для гос.)"
                                value={OKATO_contr_1}
                                onChange={(e) => setOKATO_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКПО (для гос.)"
                                value={OKPO_contr_1}
                                onChange={(e) => setOKPO_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКОПФ (для гос.)"
                                value={OKOPF_contr_1}
                                onChange={(e) => setOKOPF_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОГРН"
                                value={OGRN_contr_1}
                                onChange={(e) => setOGRN_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОГРНИП (для ИП)"
                                value={OGRNIP_contr_1}
                                onChange={(e) => setOGRNIP_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Л/СЧ (для гос.)"
                                value={L_SCH_contr_1}
                                onChange={(e) => setL_SCH_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Р/СЧ"
                                value={R_SCH_contr_1}
                                onChange={(e) => setR_SCH_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="К/СЧ"
                                value={K_SCH_contr_1}
                                onChange={(e) => setK_SCH_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Наименование банка"
                                value={Bank_contr_1}
                                onChange={(e) => setBank_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="БИК банка"
                                value={BIK_banka_contr_1}
                                onChange={(e) => setBIK_banka_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКОГУ"
                                value={OKOGU_contr_1}
                                onChange={(e) => setOKOGU_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={email_contr_1}
                                onChange={(e) => setEmail_contr_1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Телефон"
                                value={tel_contr_1}
                                onChange={(e) => setTel_contr_1(e.target.value)}
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
