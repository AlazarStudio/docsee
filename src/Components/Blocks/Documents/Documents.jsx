import React, { useEffect, useState } from "react";
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Button } from '@mui/material';
import { GET_DATA, CREATE_DATA } from '../../../../requests.js';
import FormComponent from '../FormComponent/FormComponent.jsx';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function Documents({ children, ...props }) {
    const [ipList, setIpList] = useState([]);
    const [contragentList, setContragentList] = useState([]);
    const [receivedServicesList, setReceivedServicesList] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [contractType, setContractType] = useState("3");
    const [template, setTemplate] = useState("complex");
    const [selectedIp, setSelectedIp] = useState(null);
    const [selectedContragent, setSelectedContragent] = useState(null);
    const [selectedReceivedServices, setSelectedReceivedServices] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentEndpoint, setCurrentEndpoint] = useState("");
    const [formTitle, setFormTitle] = useState("");

    useEffect(() => {
        GET_DATA('ipName.json', setIpList);
        GET_DATA('contragents.json', setContragentList);
        GET_DATA('receivedServices.json', setReceivedServicesList);
        GET_DATA('documents.json', setDocuments);
    }, []);

    const handleAddClick = (endpoint, title) => {
        setCurrentEndpoint(endpoint);
        setFormTitle(title);
        setShowForm(true);
    };

    const handleFormSuccess = (data) => {
        setShowForm(false);
        if (currentEndpoint.includes("ip")) {
            setIpList(prevList => [...prevList, data]);
        } else if (currentEndpoint.includes("contragent")) {
            setContragentList(prevList => [...prevList, data]);
        } else if (currentEndpoint.includes("receivedServices")) {
            setReceivedServicesList(prevList => [...prevList, data]);
        }
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const handleSubmit = async () => {
        const data = {
            type: contractType,
            template: template,
            ip: selectedIp,
            contragent: selectedContragent,
            received: selectedReceivedServices
        };

        try {
            await axios.post('http://localhost:3000/generate', { data });
            alert('Данные успешно отправлены');
        } catch (error) {
            console.error("Ошибка запроса", error);
            alert('Ошибка при отправке данных');
        }
    };

    const handleSelect = (type, value) => {
        if (type === 'ip') {
            setSelectedIp(ipList.find(ip => ip.titleOrg === value));
        } else if (type === 'contragent') {
            setSelectedContragent(contragentList.find(contragent => contragent.titleOrg === value));
        } else if (type === 'receivedServices') {
            setSelectedReceivedServices(receivedServicesList.find(contragent => contragent.titleOrg === value));
        }
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Создание документа
                </Typography>
                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel>Тип договора</InputLabel>
                    <Select value={contractType} onChange={(e) => setContractType(e.target.value)}
                        label="Тип договора">
                        <MenuItem value="2">Двухсторонний</MenuItem>
                        <MenuItem value="3">Трехсторонний</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel>Шаблон</InputLabel>
                    <Select value={template} onChange={(e) => setTemplate(e.target.value)}
                        label="Шаблон">
                        <MenuItem value="complex">Комплексные</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={11}>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel>Выберите Исполнителя</InputLabel>
                            <Select value={selectedIp ? selectedIp.titleOrg : ""} onChange={(e) => handleSelect('ip', e.target.value)}
                                label="Выберите Исполнителя">
                                <MenuItem value="">Выбрать...</MenuItem>
                                {ipList.map((ip, index) => (
                                    <MenuItem key={index} value={ip.titleOrg}>{ip.titleOrg}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            onClick={() => handleAddClick("add-ip", "Исполнителя")}
                            sx={{
                                height: '56px',
                                width: '100%',
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'secondary.dark',
                                },
                                borderRadius: 1
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={11}>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel>Выберите Заказчика</InputLabel>
                            <Select value={selectedContragent ? selectedContragent.titleOrg : ""} onChange={(e) => handleSelect('contragent', e.target.value)}
                                label="Выберите Заказчика">
                                <MenuItem value="">Выбрать...</MenuItem>
                                {contragentList.map((contragent, index) => (
                                    <MenuItem key={index} value={contragent.titleOrg}>{contragent.titleOrg}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            onClick={() => handleAddClick("add-contragent", "Заказчика")}
                            sx={{
                                height: '56px',
                                width: '100%',
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'secondary.dark',
                                },
                                borderRadius: 1
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                {contractType === "3" && (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={11}>
                            <FormControl fullWidth sx={{ my: 2 }}>
                                <InputLabel>Выберите Получателя услуг</InputLabel>
                                <Select value={selectedReceivedServices ? selectedReceivedServices.titleOrg : ""} onChange={(e) => handleSelect('receivedServices', e.target.value)}
                                    label="Выберите Получателя услуг">
                                    <MenuItem value="">Выбрать...</MenuItem>
                                    {receivedServicesList.map((contragent, index) => (
                                        <MenuItem key={index} value={contragent.titleOrg}>{contragent.titleOrg}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                color="primary"
                                onClick={() => handleAddClick("add-receivedServices", "Получателя услуг")}
                                sx={{
                                    height: '56px',
                                    width: '100%',
                                    backgroundColor: 'secondary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'secondary.dark',
                                    },
                                    borderRadius: 1
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                )}

                {showForm && (
                    <FormComponent
                        endpoint={currentEndpoint}
                        onSuccess={handleFormSuccess}
                        open={showForm}
                        onClose={handleClose}
                        title={formTitle}
                    />
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                        mt: 3,
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'secondary.dark',
                        },
                    }}
                >
                    Создать
                </Button>
            </Box>
        </Container>
    );
}

export default Documents;
