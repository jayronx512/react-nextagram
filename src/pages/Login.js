import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../App.css'

import { toast } from 'react-toastify';

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: 'flex',
    flexDirection: 'column'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Login() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [loginData, setLoginData] = useState({
      username: '',
      password: ''
  })
  const [emptyField, setEmptyField] = useState(true)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = e => {
    const {name, value} = e.target
    setLoginData({
        ...loginData,
        [name]: value
    })

    if (loginData.username !== "" && loginData.password !== "") {
        setEmptyField(false)
    }
}

const handleSubmit = e => {
    e.preventDefault()
    toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    console.log(loginData.username)
    console.log(loginData.password)
    setOpen(false)
}


  const body = (
    <div style={modalStyle} className={classes.paper}>
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            justifyContent: 'center',
            margin: 'auto'
        }}>
            <form onSubmit={handleSubmit}> 
                <input onChange={handleInput} className="login-style" name="username" type="text" placeholder="Username"/>
                <input onChange={handleInput} className="login-style" name="password" type="password" placeholder="Password" />
                {emptyField ? <input className="submit-style" disabled="disabled" type="submit"/> : <input className="submit-style" type="submit"/>}
                
            </form>
        </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Login
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}


export default Login



