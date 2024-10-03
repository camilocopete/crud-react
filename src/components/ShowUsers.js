import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UserForm from './UserForm';
import UserTable from './UserTable';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuBar from './menuBar';

const ShowUsers = () => {
    const urlUsers = 'http://localhost:3000/api/users';
    const [users, setUsers] = useState([]);
    const [formValues, setFormValues] = useState({ id: '', name: '', description: '', price: '' });
    const [formValuesUser, setFormValuesUser] = useState({ id: '', nombre: '', email: '', createdAt: '', password: '' });

    const [operation, setOperation] = useState(1);
    const [operationUser, setOperationUser] = useState(1);
    const [titleUser, setTitleUser] = useState('Registrar Usuario');
    const [modalOpenUser, setModalOpenUser] = useState(false); 


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const responseUser = await axios.get(urlUsers);
            const usersArray = responseUser.data.users;
            setUsers(usersArray);
        
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    };

    const openModalUser = (opUser, id = '', nombre = '', email = '', createdAt = '', password="") => {
        console.log(opUser , id , nombre , email , createdAt, password);
        setFormValuesUser({ id, nombre, email, createdAt, password });
        setOperationUser(opUser);
        setTitleUser(opUser === 1 ? 'Registrar Usuario' : 'Editar Usuario');
        setModalOpenUser(true);
    };

    const validarUser = () => {
        const {id, nombre, email, createdAt, password } = formValuesUser;
        if (nombre.trim() === '') {
            show_alerta('Escribe el nombre usuario', 'warning');
        } else if (email.trim() === '') {
            show_alerta('Escribe el email', 'warning');
        }
        else {
            const parametros = { nombre: nombre.trim(), email: email.trim(), createdAt, password: ''};
            if (operationUser === 1) {
                enviarSolicitudUser('POST', parametros);
            } else {
                console.log(formValuesUser);
                console.log(parametros);

                enviarSolicitudUser('PUT', parametros, formValuesUser.id);
            }
        }
    };

    const enviarSolicitudUser = async (metodo, parametros, userId = null) => {
        const requestUrl = userId ? `${urlUsers}/${userId}` : urlUsers;
        try {
            const response = await axios({ method: metodo, url: requestUrl, data: parametros });
            const { status, statusText } = response
            show_alerta(statusText || 'Operación exitosa', 'success');
            if (status == 200) {
                getUsers();
                cerrarModalUser();  
            }
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.error(error);
        }
    };

    const deleteuser = (id, name) => {
        Swal.fire({
            title: `¿Seguro de eliminar el usuario ${name}?`,
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitudUser('DELETE', {}, id);
            } else {
                show_alerta('El usuario NO fue eliminado', 'info');
            }
        });
    };

    const cerrarModalUser = () => {
        setModalOpenUser(false); 
        setFormValuesUser({ id: '', nombre: '', email: '', createdAt: '' });
    };

    const show_alerta = (mensaje, icon) => {
        Swal.fire({
            title: mensaje,
            icon: icon,
            confirmButtonText: 'OK'
        });
    };

    return (
        <>            
            <MenuBar></MenuBar>
            <AppBar position="static">

                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Ventana de Usuarios
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => openModalUser(1)}>
                        Añadir Usuario
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <UserTable 
                    titleUser={titleUser}
                    users={users} 
                    deleteuser={deleteuser}
                    openModalUser={openModalUser}
                />
            </Container>
            <UserForm
                titleUser={titleUser}
                formValuesUser={formValuesUser}
                setFormValuesUser={setFormValuesUser}
                validarUser={validarUser}
                modalOpenUser={modalOpenUser}
                cerrarModalUser={cerrarModalUser}
            />
        
        </>
    );
};

export default ShowUsers;
