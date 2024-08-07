import React, { useEffect, useState } from "react";
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid, IconButton } from '@mui/material';
import { GET_DATA, CREATE_DATA } from '../../../../requests.js';
import FormComponent from '../FormComponent/FormComponent.jsx';
import AddIcon from '@mui/icons-material/Add';

function Documents({ children, ...props }) {
    const [ipList, setIpList] = useState([]);
    const [contragentList, setContragentList] = useState([]);
    const [receivedServicesList, setReceivedServicesList] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [contractType, setContractType] = useState("two");
    const [selectedIp, setSelectedIp] = useState("");
    const [selectedContragent, setSelectedContragent] = useState("");
    const [selectedReceivedServices, setSelectedReceivedServices] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [currentEndpoint, setCurrentEndpoint] = useState("");

    useEffect(() => {
        GET_DATA('ipName.json', setIpList);
        GET_DATA('contragents.json', setContragentList);
        GET_DATA('receivedServices.json', setReceivedServicesList);
        GET_DATA('documents.json', setDocuments);
    }, []);

    const handleAddClick = (endpoint) => {
        setCurrentEndpoint(endpoint);
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
                        <MenuItem value="two">Двухсторонний</MenuItem>
                        <MenuItem value="three">Трехсторонний</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={11}>
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel>Выберите Исполнителя</InputLabel>
                            <Select value={selectedIp} onChange={(e) => setSelectedIp(e.target.value)}
                                label="Выберите Исполнителя">
                                <MenuItem value="">Выбрать...</MenuItem>
                                {ipList.map((ip, index) => (
                                    <MenuItem key={index} value={ip.name}>{ip.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            onClick={() => handleAddClick("add-ip")}
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
                            <Select value={selectedContragent} onChange={(e) => setSelectedContragent(e.target.value)}
                                label="Выберите Заказчика">
                                <MenuItem value="">Выбрать...</MenuItem>
                                {contragentList.map((contragent, index) => (
                                    <MenuItem key={index} value={contragent.name}>{contragent.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            onClick={() => handleAddClick("add-contragent")}
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

                {contractType === "three" && (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={11}>
                            <FormControl fullWidth sx={{ my: 2 }}>
                                <InputLabel>Выберите Получателя услуг</InputLabel>
                                <Select value={selectedReceivedServices} onChange={(e) => setSelectedReceivedServices(e.target.value)}
                                    label="Выберите Получателя услуг">
                                    <MenuItem value="">Выбрать...</MenuItem>
                                    {receivedServicesList.map((service, index) => (
                                        <MenuItem key={index} value={service.name}>{service.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                color="primary"
                                onClick={() => handleAddClick("add-receivedServices")}
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
                    />
                )}
            </Box>
        </Container>
    );
}

export default Documents;
