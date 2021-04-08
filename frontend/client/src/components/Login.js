import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import { Button, Snackbar, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../Axios'
import { useHistory, Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
      background: '#f44336'
    }
}));

export default function Login() {
    const classes = useStyles();

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [open, setopen] = useState(false)
    const [message, setmessage] = useState("error logging in")

    let history = useHistory();

    const reqSignup = async (e) => {
        e.preventDefault(); 
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        try {
            const res = await axios({
                method: "post", 
                data : {
                    username : username, 
                    password : password, 
                }, 
                withCredentials : true, 
                url: "/account/login", 
            }); 
            console.log(res.data); 
            if (!res.data.success){
              setopen(true)
              setmessage(res.data.message)
            } else {
              sessionStorage.setItem("username", username); 
              history.push('/')
            }
        } catch (error) {
            alert("Error Logging in")
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h4" style={{ marginTop: "80px" }}>
                Log In
      </Typography>
            <form onSubmit={reqSignup}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setusername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setpassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    <b> Log In </b>
        </Button>
            </form>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1800}
        message={message}
        onClose={() => setopen(false)}
        ContentProps={{
          classes: {
            root: classes.root
          }
        }}
      />
      <Typography component="p" >
            Don't have an account? &nbsp;
            <Link to="/signup">Sign up!</Link>
      </Typography>
      

        </Container>
    )
}

