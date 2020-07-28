import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../App.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap'


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
        setData({
            username: "",
            password: "",
            confirmPassword: "",
            email: ""
        })
        toast.success("Signed up successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          console.log(response)
      })
      .catch(error => {
          console.log(error.response)
      })
  }

    const [delay, setDelay] = useState(null)
    const [usernameValid, setUsernameValid] = useState(true)
    const [username, setUsername] = useState("")

    const checkUsername = newUsername => {
        axios.get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response=> {
            console.log(response.data)
            if (response.data.valid) {
                setUsernameValid(true);
            } else {
                setUsernameValid(false);
            }
        })
    }

    const handleUsernameInput = e => {
        clearTimeout(delay);
        const newUsername = e.target.value;
        setUsername(newUsername)
        const newDelay = setTimeout(() => {
            checkUsername(newUsername);
        }, 500);

        setDelay(newDelay)
    }

    const getInputProp = () => {
        if (!username.length) {
          return null;
        }
    
        if (username.length <= 6) {
          return { invalid: true };
        }
    
        if (usernameValid) {
          return { valid: true };
        } else {
          return { invalid: true };
        }
      };
    
      const getFormFeedback = () => {
        if (!username.length) {
          return null;
        }
    
        if (username.length <= 6) {
          return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }
    
        if (usernameValid) {
          return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        } else {
          return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
      };

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

        <FormGroup>
            <Label for="username">Username</Label>
            <Input
                type="text"
                value={username}
                onChange={handleUsernameInput}
                {...getInputProp()}
            />
            {getFormFeedback()}
            <FormText>Enter a username between 6 and 20 characters</FormText>
        </FormGroup>
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


