import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const fields = {
    fullName: { label: "Полное наименование организации", placeholder: "Автономная некоммерческая организация «Центр «Мой бизнес» Карачаево-Черкесской Республики»" },
    shortName: { label: "Сокращенное наименование организации", placeholder: "АНО «Центр «Мой бизнес» Карачаево-Черкесской Республики»" },
    position: { label: "Должность", placeholder: "Директор" },
    shortFIO: { label: "Сокращенное ФИО", placeholder: "Д.К. Хубиева" },
    positionAndFIO: { label: "Должность и ФИО (в род. падеже)", placeholder: "Директора Хубиевой Дианы Казимовны" },
    basis: { label: "Основание", options: ["Гос", "ИП", "Самозанятый"], placeholder: "Выберите основание" },
    gender: { label: "Пол", options: ["Мужской", "Женский"], placeholder: "Выберите пол" },
    bank: { label: "Банк", placeholder: "ОТДЕЛЕНИЕ-НБ ПО КАРАЧАЕВО-ЧЕРКЕССКОЙ РЕСПУБЛИКЕ ЮЖНОГО ГЛАВНОГО УПРАВЛЕНИЯ ЦЕНТРАЛЬНОГО БАНКА РОССИЙСКОЙ ФЕДЕРАЦИИ" },
    bik: { label: "БИК", placeholder: "019133001" },
    email: { label: "E-mail", placeholder: "reception@moibiz09.ru" },
    phone: { label: "тел", placeholder: "8 (8782) 25-02-27" },
    address: { label: "Адрес местонахождения", placeholder: "369000, КЧР, г. Черкесск, ул. Ленина, дом 53." },
    inn: { label: "ИНН", placeholder: "0900001180" },
    kpp: { label: "КПП", placeholder: "090001001" },
    bankInn: { label: "ИНН банка", placeholder: "7707083893" },
    rSchet: { label: "Р/с", placeholder: "40802810360310007883" },
    kSchet: { label: "К/с", placeholder: "30101810907020000615" },
    ogrn: { label: "ОГРН", placeholder: "1210900002950" },
    treasuryAccountNumber: { label: "Номер казначейского счета", placeholder: "03226643910000007900" },
    singleTreasuryAccount: { label: "Единый казначейский счет", placeholder: "40102810245370000078" },
    stamp: { label: "Печать", options: ["Да", "Нет"], placeholder: "Выберите печать" },
    passportSeries: { label: "Паспорт Серия (для самозанятых)", placeholder: "2132" },
    passportNumber: { label: "Паспорт номер (для самозанятых)", placeholder: "2133321" },
    ogrnip: { label: "ОГРНИП (для ИП)", placeholder: "1210900002950" },
    oktmo: { label: "ОКТМО (для гос)", placeholder: "91701000001" },
    okato: { label: "ОКАТО (для гос)", placeholder: "91401000000" },
    okpo: { label: "ОКПО (для гос)", placeholder: "54056422" },
    okopf: { label: "ОКОПФ (для гос)", placeholder: "71400" },
    okogu: { label: "ОКОГУ (для гос)", placeholder: "4210014" },
    ls: { label: "л/сч (для гос)", placeholder: "41796052510" }
};

function FormComponent({ endpoint, onSuccess, open, onClose, title }) {
    const [formData, setFormData] = useState(Object.keys(fields).reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {}));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                titleOrg: `${formData.fullName} (${formData.bank})`
            };

            await axios.post(`http://localhost:3000/${endpoint}`, { data: dataToSend });
            onSuccess(dataToSend);
            onClose(); // Закрыть модальное окно после успешного добавления
        } catch (error) {
            console.error("Ошибка запроса", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Добавить данные для {title}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        {Object.keys(fields).map((key) => (
                            <Grid item xs={12} key={key}>
                                {fields[key].options ? (
                                    <FormControl fullWidth>
                                        <InputLabel shrink>{fields[key].label}</InputLabel>
                                        <Select
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}
                                            label={fields[key].label}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>{fields[key].placeholder}</MenuItem>
                                            {fields[key].options.map((option, index) => (
                                                <MenuItem key={index} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={fields[key].label}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        variant="outlined"
                                        placeholder={fields[key].placeholder}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" sx={{
                        color: 'secondary.main',
                        '&:hover': {
                            color: 'secondary.dark',
                        },
                    }}>Отмена</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'secondary.dark',
                        },
                    }}
                >
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormComponent;
