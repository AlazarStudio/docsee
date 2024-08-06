import React, { useEffect, useState } from "react";
import classes from './AddDocuments.module.css';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Documents_Page({ children, ...props }) {
    const [ipList, setIpList] = useState([]);
    const [contragentList, setContragentList] = useState([]);
    const [selectedIP, setSelectedIP] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedContragent, setSelectedContragent] = useState(null);

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
    const [step, setStep] = useState(1);

    useEffect(() => {
        const loadIpData = async () => {
            const response = await axios.get('../../../../ipName.json');
            setIpList(response.data);
        };

        const loadContragentData = async () => {
            const response = await axios.get('../../../../contragents.json');
            setContragentList(response.data);
        };

        loadIpData();
        loadContragentData();
    }, []);

    const handleGenerateDocument = async () => {
        if (!selectedIP || !selectedContragent || !selectedBank) {
            alert("Пожалуйста, выберите ИП, банк и контрагента.");
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
            ...selectedBank
        };

        try {
            const response = await axios.post('http://localhost:3000/generate', { data });
            const filename = response.data;
            alert(`Документ сгенерирован: ${filename}`);
        } catch (error) {
            console.error("Ошибка при генерации документа", error);
            alert("Ошибка при генерации документа");
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setStep(1);
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
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
                            <option value="шаблон1">Шаблон 1</option>
                            <option value="шаблон2">Шаблон 2</option>
                            <option value="шаблон3">Шаблон 3</option>
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
                        <div className={classes.navigationButtons}>
                            <button className={classes.button} onClick={prevStep}>Назад</button>
                            <button className={classes.button} onClick={nextStep}>Далее</button>
                        </div>
                    </div>
                );
            case 6:
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
                <button className={classes.closeButton} onClick={closeModal}>Закрыть</button>
            </Modal>
        </div>
    );
}

export default Documents_Page;
