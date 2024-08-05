import React, { useState } from 'react';
import classes from './AddContragent.module.css';

const AddContragent = () => {
    const [selectedContr, setSelectedContr] = useState(null);
    const [contrData, setContrData] = useState([]);

    const [nazvanieContr, setNazvanieContr] = useState('');
    const [polnoeNazvanieContr, setPolnoeNazvanieContr] = useState('');
    const [socrNazvanieContr, setSocrNazvanieContr] = useState('');
    const [osnovanieContr, setOsnovanieContr] = useState('');
    const [pechatContr, setPechatContr] = useState(false);
    const [dolzhnostContr, setDolzhnostContr] = useState('');
    const [fioContr, setFioContr] = useState('');
    const [dolzhnostFioContr, setDolzhnostFioContr] = useState('');
    const [ioFContr, setIOFContr] = useState('');
    const [passportSeriaContr, setPassportSeriaContr] = useState('');
    const [passportNomerContr, setPassportNomerContr] = useState('');
    const [adressContr, setAdressContr] = useState('');
    const [innContr, setInnContr] = useState('');
    const [kppContr, setKppContr] = useState('');
    const [oktmoContr, setOktmoContr] = useState('');
    const [okatoContr, setOkatoContr] = useState('');
    const [okpoContr, setOkpoContr] = useState('');
    const [okopfContr, setOkopfContr] = useState('');
    const [ogrnContr, setOgrnContr] = useState('');
    const [ogrnipContr, setOgrnipContr] = useState('');
    const [lschContr, setLschContr] = useState('');
    const [rschContr, setRschContr] = useState('');
    const [kschContr, setKschContr] = useState('');
    const [bankContr, setBankContr] = useState('');
    const [bikBankaContr, setBikBankaContr] = useState('');
    const [okoguContr, setOkoguContr] = useState('');
    const [emailContr, setEmailContr] = useState('');
    const [telContr, setTelContr] = useState('');

    const [isAddContrModalOpen, setIsAddContrModalOpen] = useState(false);

    const handleContrClick = (contr) => {
        setSelectedContr(contr === selectedContr ? null : contr);
    };

    const handleAddContr = () => {
        if (polnoeNazvanieContr) {
            const newContr = {
                nazvanieContr,
                polnoeNazvanieContr,
                ...(socrNazvanieContr && { socrNazvanieContr }),
                ...(osnovanieContr && { osnovanieContr }),
                ...(pechatContr && { pechatContr: "М.П." }),
                ...(dolzhnostContr && { dolzhnostContr }),
                ...(fioContr && { fioContr }),
                ...(dolzhnostFioContr && { dolzhnostFioContr }),
                ...(ioFContr && { ioFContr }),
                ...(passportSeriaContr && { passportSeriaContr }),
                ...(passportNomerContr && { passportNomerContr }),
                ...(adressContr && { adressContr }),
                ...(innContr && { innContr }),
                ...(kppContr && { kppContr }),
                ...(oktmoContr && { oktmoContr }),
                ...(okatoContr && { okatoContr }),
                ...(okpoContr && { okpoContr }),
                ...(okopfContr && { okopfContr }),
                ...(ogrnContr && { ogrnContr }),
                ...(ogrnipContr && { ogrnipContr }),
                ...(lschContr && { lschContr }),
                ...(rschContr && { rschContr }),
                ...(kschContr && { kschContr }),
                ...(bankContr && { bankContr }),
                ...(bikBankaContr && { bikBankaContr }),
                ...(okoguContr && { okoguContr }),
                ...(emailContr && { emailContr }),
                ...(telContr && { telContr }),
            };
            setContrData([...contrData, newContr]);
            setNazvanieContr('');
            setPolnoeNazvanieContr('');
            setSocrNazvanieContr('');
            setOsnovanieContr('');
            setPechatContr(false);
            setDolzhnostContr('');
            setFioContr('');
            setDolzhnostFioContr('');
            setIOFContr('');
            setPassportSeriaContr('');
            setPassportNomerContr('');
            setAdressContr('');
            setInnContr('');
            setKppContr('');
            setOktmoContr('');
            setOkatoContr('');
            setOkpoContr('');
            setOkopfContr('');
            setOgrnContr('');
            setOgrnipContr('');
            setLschContr('');
            setRschContr('');
            setKschContr('');
            setBankContr('');
            setBikBankaContr('');
            setOkoguContr('');
            setEmailContr('');
            setTelContr('');
            setIsAddContrModalOpen(false);
        }
    };

    return (
        <div className={classes.main}>
            <div className={classes.main_name}>
                <h2>Список Контрагентов</h2>
                <button className={classes.buttonAddContr} onClick={() => setIsAddContrModalOpen(true)}>Добавить нового контрагента</button>
            </div>

            <div className={classes.list}>
                <div className={classes.list_left}>
                    {contrData.map(contr => (
                        <div key={contr.polnoeNazvanieContr} className={classes.contr_container}>
                            <div
                                className={`${classes.list_left_contr} ${selectedContr === contr.polnoeNazvanieContr ? classes.selected : ''}`}
                                onClick={() => handleContrClick(contr.polnoeNazvanieContr)}
                            >
                                {contr.polnoeNazvanieContr} ({contr.bankContr})
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${classes.list_right} ${selectedContr ? classes.visible : ''}`}>
                    {selectedContr && contrData.filter(contr => contr.polnoeNazvanieContr === selectedContr).map(contr => (
                        <div key={contr.polnoeNazvanieContr}>
                            <h3>{contr.polnoeNazvanieContr}</h3>
                            <div className={classes.bank_details}>
                                {contr.nazvanieContr && <p><strong>Название контрагента:</strong> {contr.nazvanieContr}</p>}
                                {contr.polnoeNazvanieContr && <p><strong>Полное наименование:</strong> {contr.polnoeNazvanieContr}</p>}
                                {contr.socrNazvanieContr && <p><strong>Сокращенное наименование:</strong> {contr.socrNazvanieContr}</p>}
                                {contr.osnovanieContr && <p><strong>Действует на основании:</strong> {contr.osnovanieContr}</p>}
                                {contr.pechatContr && <p><strong>Печать:</strong> {contr.pechatContr}</p>}
                                {contr.dolzhnostContr && <p><strong>Должность:</strong> {contr.dolzhnostContr}</p>}
                                {contr.fioContr && <p><strong>ФИО:</strong> {contr.fioContr}</p>}
                                {contr.dolzhnostFioContr && <p><strong>Должность и ФИО (в род. падеже):</strong> {contr.dolzhnostFioContr}</p>}
                                {contr.ioFContr && <p><strong>И.О. Фамилия:</strong> {contr.ioFContr}</p>}
                                {contr.passportSeriaContr && <p><strong>Паспорт Серия:</strong> {contr.passportSeriaContr}</p>}
                                {contr.passportNomerContr && <p><strong>Паспорт Номер:</strong> {contr.passportNomerContr}</p>}
                                {contr.adressContr && <p><strong>Адрес:</strong> {contr.adressContr}</p>}
                                {contr.innContr && <p><strong>ИНН:</strong> {contr.innContr}</p>}
                                {contr.kppContr && <p><strong>КПП:</strong> {contr.kppContr}</p>}
                                {contr.oktmoContr && <p><strong>ОКТМО:</strong> {contr.oktmoContr}</p>}
                                {contr.okatoContr && <p><strong>ОКАТО:</strong> {contr.okatoContr}</p>}
                                {contr.okpoContr && <p><strong>ОКПО:</strong> {contr.okpoContr}</p>}
                                {contr.okopfContr && <p><strong>ОКОПФ:</strong> {contr.okopfContr}</p>}
                                {contr.ogrnContr && <p><strong>ОГРН:</strong> {contr.ogrnContr}</p>}
                                {contr.ogrnipContr && <p><strong>ОГРНИП:</strong> {contr.ogrnipContr}</p>}
                                {contr.lschContr && <p><strong>Л/СЧ:</strong> {contr.lschContr}</p>}
                                {contr.rschContr && <p><strong>Р/СЧ:</strong> {contr.rschContr}</p>}
                                {contr.kschContr && <p><strong>К/СЧ:</strong> {contr.kschContr}</p>}
                                {contr.bankContr && <p><strong>Банк:</strong> {contr.bankContr}</p>}
                                {contr.bikBankaContr && <p><strong>БИК банка:</strong> {contr.bikBankaContr}</p>}
                                {contr.okoguContr && <p><strong>ОКОГУ:</strong> {contr.okoguContr}</p>}
                                {contr.emailContr && <p><strong>E-mail:</strong> {contr.emailContr}</p>}
                                {contr.telContr && <p><strong>Телефон:</strong> {contr.telContr}</p>}
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
                                placeholder="Название контрагента"
                                value={nazvanieContr}
                                onChange={(e) => setNazvanieContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Полное наименование компании"
                                value={polnoeNazvanieContr}
                                onChange={(e) => setPolnoeNazvanieContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Сокращенное наименование"
                                value={socrNazvanieContr}
                                onChange={(e) => setSocrNazvanieContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Действует на основании"
                                value={osnovanieContr}
                                onChange={(e) => setOsnovanieContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Должность"
                                value={dolzhnostContr}
                                onChange={(e) => setDolzhnostContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ФИО"
                                value={fioContr}
                                onChange={(e) => setFioContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Должность и ФИО (в род. падеже)"
                                value={dolzhnostFioContr}
                                onChange={(e) => setDolzhnostFioContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="И.О. Фамилия"
                                value={ioFContr}
                                onChange={(e) => setIOFContr(e.target.value)}
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
                                value={adressContr}
                                onChange={(e) => setAdressContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ИНН"
                                value={innContr}
                                onChange={(e) => setInnContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="КПП"
                                value={kppContr}
                                onChange={(e) => setKppContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКТМО"
                                value={oktmoContr}
                                onChange={(e) => setOktmoContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКАТО"
                                value={okatoContr}
                                onChange={(e) => setOkatoContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКПО"
                                value={okpoContr}
                                onChange={(e) => setOkpoContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКОПФ"
                                value={okopfContr}
                                onChange={(e) => setOkopfContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОГРН"
                                value={ogrnContr}
                                onChange={(e) => setOgrnContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОГРНИП"
                                value={ogrnipContr}
                                onChange={(e) => setOgrnipContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Л/СЧ"
                                value={lschContr}
                                onChange={(e) => setLschContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Р/СЧ"
                                value={rschContr}
                                onChange={(e) => setRschContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="К/СЧ"
                                value={kschContr}
                                onChange={(e) => setKschContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Наименование банка"
                                value={bankContr}
                                onChange={(e) => setBankContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="БИК банка"
                                value={bikBankaContr}
                                onChange={(e) => setBikBankaContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ОКОГУ"
                                value={okoguContr}
                                onChange={(e) => setOkoguContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={emailContr}
                                onChange={(e) => setEmailContr(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Телефон"
                                value={telContr}
                                onChange={(e) => setTelContr(e.target.value)}
                            />
                            <label>
                                Печать
                                <select
                                    value={pechatContr}
                                    onChange={(e) => setPechatContr(e.target.value === "true")}
                                >
                                    <option value="false">Нет</option>
                                    <option value="true">Да</option>
                                </select>
                            </label>
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

export default AddContragent;
