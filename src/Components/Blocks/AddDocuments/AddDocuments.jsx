import React, { useEffect, useState } from "react";
import classes from './AddDocuments.module.css';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Documents_Page({ children, ...props }) {
    const [ipList, setIpList] = useState([]);
    const [contragentList, setContragentList] = useState([]);
    const [receivedServicesList, setReceivedServicesList] = useState([]);
    const [selectedIP, setSelectedIP] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedContragent, setSelectedContragent] = useState(null);
    const [selectedReceivedService, setSelectedReceivedService] = useState(null);

    const [dogovorType, setDogovorType] = useState('');
    const [dogovorTemplate, setDogovorTemplate] = useState('');
    const [Nomer_dogovora, setNomer_dogovora] = useState('');
    const [date_dogovora_propis, setDate_dogovora_propis] = useState('');
    const [date_dogovor, setDate_dogovor] = useState('');
    const [predmet_dogovora_im, setPredmet_dogovora_im] = useState('');
    const [predmet_dogovora_rod, setPredmet_dogovora_rod] = useState('');
    const [stoimost_dogovor, setStoimost_dogovor] = useState('');
    const [stoimost_dogovor_propis, setStoimost_dogovor_propis] = useState('');
    const [stoimost_dogovor_propis_akt, setStoimost_dogovor_propis_akt] = useState('');
    const [Data_dogovora, setData_dogovora] = useState('');
    const [IGK_dogovor, setIGK_dogovor] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addReceivedServiceModalIsOpen, setAddReceivedServiceModalIsOpen] = useState(false);
    const [addContragentModalIsOpen, setAddContragentModalIsOpen] = useState(false); // Новое состояние для модального окна добавления контрагента
    const [step, setStep] = useState(1);

    const [documents, setDocuments] = useState([]);

    const [newReceivedService, setNewReceivedService] = useState({
        PolnoeNazvanie_contr_2: '',
        SocrNazvanie_contr_2: '',
        Osnovanie_contr_2: 'Устава',
        Pechat_contr_2: 'false',
        Dolzhnost_contr_2: '',
        fioContr: '',
        Dolzhnost_FIO_contr_2: '',
        IO_F_contr_2: '',
        passport_seria_contr_2: '',
        passport_nomer_contr_2: '',
        Adress_contr_2: '',
        INN_contr_2: '',
        KPP_contr_2: '',
        OKTMO_contr_2: '',
        OKATO_contr_2: '',
        OKPO_contr_2: '',
        OKOPF_contr_2: '',
        OGRN_contr_2: '',
        OGRNIP_contr_2: '',
        L_SCH_contr_2: '',
        R_SCH_contr_2: '',
        K_SCH_contr_2: '',
        Bank_contr_2: '',
        BIK_banka_contr_2: '',
        OKOGU_contr_2: '',
        email_contr_2: '',
        tel_contr_2: '',
        genderContr: 'Мужской'
    });

    const [newContragent, setNewContragent] = useState({
        PolnoeNazvanie_contr_1: '',
        Dolzhnost_FIO_contr_1: '',
        Osnovanie_contr_1: 'Устава',
        SocrNazvanie_contr_1: '',
        OGRNIP_contr_1: '',
        Adress_contr_1: '',
        INN_contr_1: '',
        KPP_contr_1: '',
        OKTMO_contr_1: '',
        OKATO_contr_1: '',
        Pechat_contr_1: false,
        Dolzhnost_contr_1: '',
        IO_F_contr_1: '',
        OKPO_contr_1: '',
        OKOPF_contr_1: '',
        OGRN_contr_1: '',
        L_SCH_contr_1: '',
        R_SCH_contr_1: '',
        K_SCH_contr_1: '',
        Bank_contr_1: '',
        BIK_banka_contr_1: '',
        OKOGU_contr_1: '',
        email_contr_1: '',
        tel_contr_1: '',
        genderContr: 'Мужской',
        passport_nomer_contr_1: '',
        passport_seria_contr_1: '',
        fioContr: ''
    });

    useEffect(() => {
        const loadIpData = async () => {
            const response = await axios.get('http://localhost:3000/db/ipName.json');
            setIpList(response.data);
        };

        const loadContragentData = async () => {
            const response = await axios.get('http://localhost:3000/db/contragents.json');
            setContragentList(response.data);
        };

        const loadDocumentsData = async () => {
            const response = await axios.get('http://localhost:3000/db/documents.json');
            setDocuments(response.data);
        };

        const loadReceivedServicesData = async () => {
            const response = await axios.get('http://localhost:3000/db/receivedServices.json');
            setReceivedServicesList(response.data);
        };

        loadIpData();
        loadContragentData();
        loadDocumentsData();
        loadReceivedServicesData();
    }, []);

    const handleGenerateDocument = async () => {
        if (!selectedIP || !selectedContragent || !selectedBank || (dogovorType === '3' && !selectedReceivedService)) {
            alert("Пожалуйста, заполните все необходимые поля.");
            return;
        }

        const data = {
            dogovorType,
            dogovorTemplate,
            Nomer_dogovora,
            date_dogovora_propis,
            date_dogovor,
            predmet_dogovora_im,
            predmet_dogovora_rod,
            stoimost_dogovor,
            stoimost_dogovor_propis,
            stoimost_dogovor_propis_akt,
            Data_dogovora,
            IGK_dogovor,
            ...selectedIP,
            ...selectedContragent,
            ...selectedBank,
            ...(dogovorType === '3' && { ...selectedReceivedService })
        };

        try {
            const response = await axios.post('http://localhost:3000/generate', { data });
            const filename = response.data;

            setDocuments(prevDocuments => [...prevDocuments, { filename, ...data }]);
            alert(`Документ сгенерирован: ${filename}`);
            setModalIsOpen(false);

            resetModalFields();
        } catch (error) {
            console.error("Ошибка при генерации документа", error);
            alert("Ошибка при генерации документа");
        }
    };

    const handleAddReceivedService = async () => {
        try {
            const response = await axios.post('http://localhost:3000/add-receivedServices', { data: newReceivedService });
            setReceivedServicesList(prevList => [...prevList, newReceivedService]);
            setNewReceivedService({
                PolnoeNazvanie_contr_2: '',
                SocrNazvanie_contr_2: '',
                Osnovanie_contr_2: 'Устава',
                Pechat_contr_2: 'false',
                Dolzhnost_contr_2: '',
                fioContr: '',
                Dolzhnost_FIO_contr_2: '',
                IO_F_contr_2: '',
                passport_seria_contr_2: '',
                passport_nomer_contr_2: '',
                Adress_contr_2: '',
                INN_contr_2: '',
                KPP_contr_2: '',
                OKTMO_contr_2: '',
                OKATO_contr_2: '',
                OKPO_contr_2: '',
                OKOPF_contr_2: '',
                OGRN_contr_2: '',
                OGRNIP_contr_2: '',
                L_SCH_contr_2: '',
                R_SCH_contr_2: '',
                K_SCH_contr_2: '',
                Bank_contr_2: '',
                BIK_banka_contr_2: '',
                OKOGU_contr_2: '',
                email_contr_2: '',
                tel_contr_2: '',
                genderContr: 'Мужской'
            });
            setAddReceivedServiceModalIsOpen(false);
        } catch (error) {
            console.error('Error adding received service:', error);
        }
    };

    const handleAddContragent = async () => {
        try {
            const response = await axios.post('http://localhost:3000/add-contragent', { data: newContragent });
            setContragentList(prevList => [...prevList, newContragent]);
            setNewContragent({
                PolnoeNazvanie_contr_1: '',
                Dolzhnost_FIO_contr_1: '',
                Osnovanie_contr_1: 'Устава',
                SocrNazvanie_contr_1: '',
                OGRNIP_contr_1: '',
                Adress_contr_1: '',
                INN_contr_1: '',
                KPP_contr_1: '',
                OKTMO_contr_1: '',
                OKATO_contr_1: '',
                Pechat_contr_1: false,
                Dolzhnost_contr_1: '',
                IO_F_contr_1: '',
                OKPO_contr_1: '',
                OKOPF_contr_1: '',
                OGRN_contr_1: '',
                L_SCH_contr_1: '',
                R_SCH_contr_1: '',
                K_SCH_contr_1: '',
                Bank_contr_1: '',
                BIK_banka_contr_1: '',
                OKOGU_contr_1: '',
                email_contr_1: '',
                tel_contr_1: '',
                genderContr: 'Мужской',
                passport_nomer_contr_1: '',
                passport_seria_contr_1: '',
                fioContr: ''
            });
            setAddContragentModalIsOpen(false);
        } catch (error) {
            console.error('Error adding contragent:', error);
        }
    };

    const resetModalFields = () => {
        setSelectedIP(null);
        setSelectedBank(null);
        setSelectedContragent(null);
        setSelectedReceivedService(null);
        setDogovorType('');
        setDogovorTemplate('');
        setNomer_dogovora('');
        setDate_dogovora_propis('');
        setDate_dogovor('');
        setPredmet_dogovora_im('');
        setPredmet_dogovora_rod('');
        setStoimost_dogovor('');
        setStoimost_dogovor_propis('');
        setStoimost_dogovor_propis_akt('');
        setData_dogovora('');
        setIGK_dogovor('');
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        resetModalFields();
        setModalIsOpen(false);
        setStep(1);
    };

    const nextStep = () => {
        if (step === 5 && dogovorType !== '3') {
            setStep(7); // Пропуск шага с получателями услуг для двухстороннего договора
        } else {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step === 7 && dogovorType !== '3') {
            setStep(5); // Возврат к шагу с контрагентом для двухстороннего договора
        } else {
            setStep(step - 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className={classes.formGroup}>
                        <label>Тип договора:</label>
                        <select onChange={(e) => setDogovorType(e.target.value)} value={dogovorType}>
                            <option value="">Выберите тип договора</option>
                            <option value="2">Двухсторонний</option>
                            <option value="3">Трехсторонний</option>
                        </select>
                        <div className={classes.navigationButtons}>
                            <button className={classes.button} onClick={nextStep}>Далее</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={classes.formGroup}>
                        <label>Шаблон договора:</label>
                        <select onChange={(e) => setDogovorTemplate(e.target.value)} value={dogovorTemplate}>
                            <option value="">Выберите шаблон договора</option>
                            <option value="complex">Шаблон комплексные</option>
                        </select>
                        <div className={classes.navigationButtons}>
                            <button className={classes.button} onClick={prevStep}>Назад</button>
                            <button className={classes.button} onClick={nextStep}>Далее</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={classes.formGroup}>
                        <label>Выберите ИП:</label>
                        <select onChange={(e) => {
                            const selectedIp = ipList.find(ip => ip.Polnoe_nazvanie_akk === e.target.value);
                            setSelectedIP(selectedIp);
                            setSelectedBank(null);
                        }}>
                            <option value="">Выберите ИП</option>
                            {ipList.map(ip => (
                                <option key={ip.Polnoe_nazvanie_akk} value={ip.Polnoe_nazvanie_akk}>
                                    {ip.Polnoe_nazvanie_akk}
                                </option>
                            ))}
                        </select>
                        <div className={classes.navigationButtons}>
                            <button className={classes.button} onClick={prevStep}>Назад</button>
                            <button className={classes.button} onClick={nextStep}>Далее</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className={classes.formGroup}>
                        {selectedIP && (
                            <>
                                <label>Выберите банк:</label>
                                <select onChange={(e) => setSelectedBank(selectedIP.banks[e.target.value])}>
                                    <option value="">Выберите банк</option>
                                    {Object.keys(selectedIP.banks).map(bankKey => (
                                        <option key={bankKey} value={bankKey}>
                                            {bankKey}
                                        </option>
                                    ))}
                                </select>
                                <div className={classes.navigationButtons}>
                                    <button className={classes.button} onClick={prevStep}>Назад</button>
                                    <button className={classes.button} onClick={nextStep}>Далее</button>
                                </div>
                            </>
                        )}
                    </div>
                );
            case 5:
                return (
                    <div className={classes.formGroup}>
                        <label>Выберите контрагента:</label>
                        <select onChange={(e) => setSelectedContragent(contragentList.find(contr => contr.PolnoeNazvanie_contr_1 === e.target.value))}>
                            <option value="">Выберите контрагента</option>
                            {contragentList.map(contr => (
                                <option key={contr.PolnoeNazvanie_contr_1} value={contr.PolnoeNazvanie_contr_1}>
                                    {contr.PolnoeNazvanie_contr_1}
                                </option>
                            ))}
                        </select>
                        <button className={classes.button} onClick={() => setAddContragentModalIsOpen(true)}>Добавить контрагента</button>
                        <div className={classes.navigationButtons}>
                            <button className={classes.button} onClick={prevStep}>Назад</button>
                            <button className={classes.button} onClick={nextStep}>Далее</button>
                        </div>
                    </div>
                );
            case 6:
                if (dogovorType === '3') {
                    return (
                        <div className={classes.formGroup}>
                            <label>Выберите получателя услуг:</label>
                            <select onChange={(e) => setSelectedReceivedService(receivedServicesList.find(service => service.PolnoeNazvanie_contr_2 === e.target.value))}>
                                <option value="">Выберите получателя услуг</option>
                                {receivedServicesList.map(service => (
                                    <option key={service.PolnoeNazvanie_contr_2} value={service.PolnoeNazvanie_contr_2}>
                                        {service.PolnoeNazvanie_contr_2}
                                    </option>
                                ))}
                            </select>
                            <button className={classes.button} onClick={() => setAddReceivedServiceModalIsOpen(true)}>Добавить получателя услуг</button>
                            <div className={classes.navigationButtons}>
                                <button className={classes.button} onClick={prevStep}>Назад</button>
                                <button className={classes.button} onClick={nextStep}>Далее</button>
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            case 7:
                return (
                    <div className={classes.formGroup}>
                        <label>Номер договора:</label>
                        <input type="text" value={Nomer_dogovora} onChange={(e) => setNomer_dogovora(e.target.value)} />
                        <label>Дата договора (прописью):</label>
                        <input type="text" value={date_dogovora_propis} onChange={(e) => setDate_dogovora_propis(e.target.value)} />
                        <label>Дата договора:</label>
                        <input type="text" value={date_dogovor} onChange={(e) => setDate_dogovor(e.target.value)} />
                        <label>Предмет договора (им.):</label>
                        <input type="text" value={predmet_dogovora_im} onChange={(e) => setPredmet_dogovora_im(e.target.value)} />
                        <label>Предмет договора (род.):</label>
                        <input type="text" value={predmet_dogovora_rod} onChange={(e) => setPredmet_dogovora_rod(e.target.value)} />
                        <label>Стоимость договора:</label>
                        <input type="text" value={stoimost_dogovor} onChange={(e) => setStoimost_dogovor(e.target.value)} />
                        <label>Стоимость договора (прописью):</label>
                        <input type="text" value={stoimost_dogovor_propis} onChange={(e) => setStoimost_dogovor_propis(e.target.value)} />
                        <label>Стоимость договора (акт):</label>
                        <input type="text" value={stoimost_dogovor_propis_akt} onChange={(e) => setStoimost_dogovor_propis_akt(e.target.value)} />
                        <label>Дата договора:</label>
                        <input type="text" value={Data_dogovora} onChange={(e) => setData_dogovora(e.target.value)} />
                        <label>ИГК договора:</label>
                        <input type="text" value={IGK_dogovor} onChange={(e) => setIGK_dogovor(e.target.value)} />
                        <div className={classes.navigationButtons}>
                            <button className={classes.button} onClick={prevStep}>Назад</button>
                            <button className={classes.button} onClick={handleGenerateDocument}>Сгенерировать документ</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.main_name}>
                <h2>Документы</h2>
                <button className={classes.button} onClick={openModal}>Создать документ</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={classes.modal}
                contentLabel="Создание документа"
            >
                <div className={classes.modalTitle}>Создание документа</div>
                {renderStep()}
                <button className={classes.closeButton} onClick={closeModal}>Х</button>
            </Modal>

            <Modal
                isOpen={addReceivedServiceModalIsOpen}
                onRequestClose={() => setAddReceivedServiceModalIsOpen(false)}
                className={classes.modal_add_info}
                contentLabel="Добавить получателя услуг"
            >
                <div className={classes.modalTitle}>Добавить получателя услуг</div>
                <div className={classes.formGroup}>
                    <input
                        type="text"
                        placeholder="Полное наименование"
                        value={newReceivedService.PolnoeNazvanie_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, PolnoeNazvanie_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Сокращенное наименование"
                        value={newReceivedService.SocrNazvanie_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, SocrNazvanie_contr_2: e.target.value })}
                    />
                    <label>
                        Основание
                        <select
                            value={newReceivedService.Osnovanie_contr_2}
                            onChange={(e) => setNewReceivedService({ ...newReceivedService, Osnovanie_contr_2: e.target.value })}
                        >
                            <option value="Устава">Устава</option>
                            <option value="ИП">ИП</option>
                            <option value="Самозанятый">Самозанятый</option>
                        </select>
                    </label>

                    <label>
                        Печать
                        <select
                            value={newReceivedService.Pechat_contr_2}
                            onChange={(e) => setNewReceivedService({ ...newReceivedService, Pechat_contr_2: e.target.value })}
                        >
                            <option value="false">Нет</option>
                            <option value="М.П.">Да</option>
                        </select>
                    </label>

                    <input
                        type="text"
                        placeholder="Должность"
                        value={newReceivedService.Dolzhnost_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, Dolzhnost_contr_2: e.target.value })}
                    />
                    <label>
                        Пол
                        <select
                            value={newReceivedService.genderContr}
                            onChange={(e) => setNewReceivedService({ ...newReceivedService, genderContr: e.target.value })}
                        >
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
                        </select>
                    </label>
                    <input
                        type="text"
                        placeholder="ФИО"
                        value={newReceivedService.fioContr}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, fioContr: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Должность и ФИО (в род. падеже)"
                        value={newReceivedService.Dolzhnost_FIO_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, Dolzhnost_FIO_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="И.О. Фамилия"
                        value={newReceivedService.IO_F_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, IO_F_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Паспорт Серия"
                        value={newReceivedService.passport_seria_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, passport_seria_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Паспорт номер"
                        value={newReceivedService.passport_nomer_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, passport_nomer_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Адрес"
                        value={newReceivedService.Adress_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, Adress_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ИНН"
                        value={newReceivedService.INN_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, INN_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="КПП"
                        value={newReceivedService.KPP_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, KPP_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКТМО"
                        value={newReceivedService.OKTMO_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OKTMO_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКАТО"
                        value={newReceivedService.OKATO_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OKATO_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКПО"
                        value={newReceivedService.OKPO_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OKPO_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКОПФ"
                        value={newReceivedService.OKOPF_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OKOPF_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОГРН"
                        value={newReceivedService.OGRN_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OGRN_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОГРНИП"
                        value={newReceivedService.OGRNIP_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OGRNIP_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Л/СЧ"
                        value={newReceivedService.L_SCH_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, L_SCH_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Р/СЧ"
                        value={newReceivedService.R_SCH_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, R_SCH_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="К/СЧ"
                        value={newReceivedService.K_SCH_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, K_SCH_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Наименование банка"
                        value={newReceivedService.Bank_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, Bank_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="БИК банка"
                        value={newReceivedService.BIK_banka_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, BIK_banka_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКОГУ"
                        value={newReceivedService.OKOGU_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, OKOGU_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={newReceivedService.email_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, email_contr_2: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Телефон"
                        value={newReceivedService.tel_contr_2}
                        onChange={(e) => setNewReceivedService({ ...newReceivedService, tel_contr_2: e.target.value })}
                    />
                    <button className={classes.button} onClick={handleAddReceivedService}>Добавить</button>
                    <button className={classes.button} onClick={() => setAddReceivedServiceModalIsOpen(false)}>Отмена</button>
                </div>
            </Modal>

            <Modal
                isOpen={addContragentModalIsOpen}
                onRequestClose={() => setAddContragentModalIsOpen(false)}
                className={classes.modal_add_info}
                contentLabel="Добавить контрагента"
            >
                <div className={classes.modalTitle}>Добавить контрагента</div>
                <div className={classes.formGroup}>
                    <input
                        type="text"
                        placeholder="Полное наименование"
                        value={newContragent.PolnoeNazvanie_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, PolnoeNazvanie_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Сокращенное наименование"
                        value={newContragent.SocrNazvanie_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, SocrNazvanie_contr_1: e.target.value })}
                    />
                    <label>
                        Основание
                        <select
                            value={newContragent.Osnovanie_contr_1}
                            onChange={(e) => setNewContragent({ ...newContragent, Osnovanie_contr_1: e.target.value })}
                        >
                            <option value="Устав">Устав</option>
                            <option value="ИП">ИП</option>
                            <option value="Самозанятый">Самозанятый</option>
                        </select>
                    </label>

                    <label>
                        Печать
                        <select
                            value={newContragent.Pechat_contr_1}
                            onChange={(e) => setNewContragent({ ...newContragent, Pechat_contr_1: e.target.value })}
                        >
                            <option value="false">Нет</option>
                            <option value="М.П.">Да</option>
                        </select>
                    </label>

                    <input
                        type="text"
                        placeholder="Должность"
                        value={newContragent.Dolzhnost_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, Dolzhnost_contr_1: e.target.value })}
                    />
                    <label>
                        Пол
                        <select
                            value={newContragent.genderContr}
                            onChange={(e) => setNewContragent({ ...newContragent, genderContr: e.target.value })}
                        >
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
                        </select>
                    </label>
                    <input
                        type="text"
                        placeholder="ФИО"
                        value={newContragent.fioContr}
                        onChange={(e) => setNewContragent({ ...newContragent, fioContr: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Должность и ФИО (в род. падеже)"
                        value={newContragent.Dolzhnost_FIO_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, Dolzhnost_FIO_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="И.О. Фамилия"
                        value={newContragent.IO_F_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, IO_F_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Паспорт Серия"
                        value={newContragent.passport_seria_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, passport_seria_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Паспорт номер"
                        value={newContragent.passport_nomer_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, passport_nomer_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Адрес"
                        value={newContragent.Adress_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, Adress_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ИНН"
                        value={newContragent.INN_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, INN_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="КПП"
                        value={newContragent.KPP_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, KPP_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКТМО"
                        value={newContragent.OKTMO_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OKTMO_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКАТО"
                        value={newContragent.OKATO_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OKATO_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКПО"
                        value={newContragent.OKPO_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OKPO_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКОПФ"
                        value={newContragent.OKOPF_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OKOPF_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОГРН"
                        value={newContragent.OGRN_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OGRN_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОГРНИП"
                        value={newContragent.OGRNIP_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OGRNIP_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Л/СЧ"
                        value={newContragent.L_SCH_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, L_SCH_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Р/СЧ"
                        value={newContragent.R_SCH_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, R_SCH_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="К/СЧ"
                        value={newContragent.K_SCH_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, K_SCH_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Наименование банка"
                        value={newContragent.Bank_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, Bank_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="БИК банка"
                        value={newContragent.BIK_banka_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, BIK_banka_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="ОКОГУ"
                        value={newContragent.OKOGU_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, OKOGU_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={newContragent.email_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, email_contr_1: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Телефон"
                        value={newContragent.tel_contr_1}
                        onChange={(e) => setNewContragent({ ...newContragent, tel_contr_1: e.target.value })}
                    />
                    <button className={classes.button} onClick={handleAddContragent}>Добавить</button>
                    <button className={classes.button} onClick={() => setAddContragentModalIsOpen(false)}>Отмена</button>
                </div>
            </Modal>

            <div className={classes.documentsList}>
                <ul>
                    {documents.map((doc, index) => (
                        <li key={index}>
                            <span>{doc.filename}</span>
                            <a href={`http://localhost:3000/docs/${doc.filename}`} download>
                                <button className={classes.downloadButton}>Скачать</button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Documents_Page;
