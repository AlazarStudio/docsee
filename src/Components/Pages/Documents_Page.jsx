import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../Blocks/Header/Header";

function Documents_Page({ children, ...props }) {
    const [ipList, setIpList] = useState([]);
    const [contragentList, setContragentList] = useState([]);
    const [selectedIP, setSelectedIP] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedContragent, setSelectedContragent] = useState(null);

    // Новые состояния для ввода данных
    const [dogovorType, setDogovorType] = useState();
    const [Nomer_dogovora, setNomer_dogovora] = useState();
    const [date_dogovora_propis, setDate_dogovora_propis] = useState();
    const [date_dogovor, setDate_dogovor] = useState();
    const [predmet_dogovora_im, setPredmet_dogovora_im] = useState();
    const [predmet_dogovora_rod, setPredmet_dogovora_rod] = useState();
    const [stoimost_dogovor, setStoimost_dogovor] = useState();
    const [stoimost_dogovor_propis, setStoimost_dogovor_propis] = useState();
    const [stoimost_dogovor_propis_akt, setStoimost_dogovor_propis_akt] = useState();
    const [Data_dogovora, setData_dogovora] = useState();
    const [IGK_dogovor, setIGK_dogovor] = useState();

    useEffect(() => {
        // Загрузка данных ИП и контрагентов
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

    return (
        <>
            <Header active={'Документы'} />
            <div>
                <h1>Генерация документа</h1>
                <div>
                    <label>Выберите ИП:</label>
                    <select onChange={(e) => {
                        const selectedIp = ipList.find(ip => ip.Polnoe_nazvanie_akk === e.target.value);
                        setSelectedIP(selectedIp);
                        setSelectedBank(null); // Сбросить выбранный банк при смене ИП
                    }}>
                        <option value="">Выберите ИП</option>
                        {ipList.map(ip => (
                            <option key={ip.Polnoe_nazvanie_akk} value={ip.Polnoe_nazvanie_akk}>
                                {ip.Polnoe_nazvanie_akk}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedIP && (
                    <div>
                        <label>Выберите банк:</label>
                        <select onChange={(e) => setSelectedBank(selectedIP.banks[e.target.value])}>
                            <option value="">Выберите банк</option>
                            {Object.keys(selectedIP.banks).map(bankKey => (
                                <option key={bankKey} value={bankKey}>
                                    {bankKey}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label>Выберите контрагента:</label>
                    <select onChange={(e) => setSelectedContragent(contragentList.find(contr => contr.PolnoeNazvanie_contr_1 === e.target.value))}>
                        <option value="">Выберите контрагента</option>
                        {contragentList.map(contr => (
                            <option key={contr.PolnoeNazvanie_contr_1} value={contr.PolnoeNazvanie_contr_1}>
                                {contr.PolnoeNazvanie_contr_1}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedContragent && (
                    <div>
                        <label>Тип договора:</label>
                        <input type="text" value={dogovorType} onChange={(e) => setDogovorType(e.target.value)} />
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
                    </div>
                )}
                <button onClick={handleGenerateDocument}>Сгенерировать документ</button>
            </div>
        </>
    );
}

export default Documents_Page;
