import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../Axios'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup() {
    const classes = useStyles();

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

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
                url: "/account/signup", 
            }); 
            console.log(res.data); 
            if (!res.data.success){
                alert(res.data.message)
            } else {
                sessionStorage.setItem("username", username); 
                history.push('/')
            }
        } catch (error) {
            alert("Error Signing Up")
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h4" style={{ marginTop: "80px" }}>
                Sign Up
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
                   <b> Sign Up </b>
        </Button>
            </form>

        </Container>
    )
}

