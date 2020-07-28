import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../App.css'
import axios from 'axios'

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

function SignUp() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
      username: "",
      password: "",
      confirmPassword: "",
      email: ""
  })
  const [emptyField, setEmptyField] = useState(true)

  const handleOpen = () => {
    setOpen(true);
    setData({
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = e => {
      const {name, value} = e.target
      setData({
          ...data,
          [name]: value
      })

      if (data.username !== "" && data.password !== "" && data.confirmPassword !== "" && data.email !== "") {
        setEmptyField(false)
    }
  }

  const handleSubmit = e => {
      e.preventDefault() 
      setOpen(false)
      axios({
          method: 'POST',
          url: 'https://insta.nextacademy.com/api/v1/users/',
          data: {
              username: data.username,
              email: data.email,
              password: data.password
          }
      })
      .then(response => {
          console.log(response)
      })
      .catch(error => {
          console.log(error.response)
      })
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            justifyContent: 'center',
            margin: 'auto'
        }}
        onSubmit={handleSubmit}>
            <input onChange={handleInput} className="signup-style" name= "username" type="text" placeholder="Username" value={data.username}/>
            <input onChange={handleInput} className="signup-style" name= "password" type="password" placeholder="Password" value={data.password}/>
            <input onChange={handleInput} className="signup-style" name= "confirmPassword" type="password" placeholder="Confirm Password" value={data.confirmPassword}/>
            <input onChange={handleInput} className="signup-style" name= "email" type="text" placeholder="Email" value={data.email}/>
            {emptyField ? <input className="submit-style" disabled="disabled" type="submit"/> : <input className="submit-style" type="submit"/>}
        </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Sign Up
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


export default SignUp


