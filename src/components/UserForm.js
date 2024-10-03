import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserForm = ({ titleUser, formValuesUser, setFormValuesUser, validarUser, modalOpenUser = false, cerrarModalUser }) => {
    const handleInputChangeUser = (e) => {
        console.log(e.target);
        const { name, value } = e.target;

        console.log(name, value);
        setFormValuesUser((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <Dialog open={modalOpenUser} onClose={cerrarModalUser}>
            <DialogTitle>{titleUser}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="nombre"
                    label="Nombre del Usuario"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formValuesUser.name}
                    onChange={handleInputChangeUser}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    label="Contraseña"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={formValuesUser.password}
                    onChange={handleInputChangeUser}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={formValuesUser.email}
                    onChange={handleInputChangeUser}
                />
                <TextField
                    margin="dense"
                    name="createdAt"
                    label="Fecha de creación"
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={formValuesUser.createdAt}
                    onChange={handleInputChangeUser}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={cerrarModalUser} color="secondary">
                    Cerrar
                </Button>
                <Button onClick={validarUser} variant="contained" color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
