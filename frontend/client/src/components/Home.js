import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from '../Axios'
import { useHistory } from 'react-router';
import Question from './Question'


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  barItem: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'white',
    color: 'black',
    flexGrow: 1,
    // display: 'flex',
    // justifyContent: 'space-between'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    // height: '100%',
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  let history = useHistory();

  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [textfield, setTextfield] = useState('')
  const [questions, setquestions] = useState([])
  const [selected, setselected] = useState(0)

  useEffect(() => {
    const intervalID = setInterval(() => {
      getQuestions()
    }, 2000)
    let username = sessionStorage.getItem('username')
    if (!(username === undefined || username === null)) {
      setisLoggedIn(true)
    }
    return () => clearInterval(intervalID)
  }, []);

  const getQuestions = async () => {
    try {
      const res = await axios({
        method: "get",
        withCredentials: true,
        url: "/api/questions",
      });
      console.log(res.data);
      setquestions(res.data)
    } catch (error) {
      alert("Error fetching questions")
    }
  }

  const logout = async (e) => {
    try {
      const res = await axios({
        method: "post",
        withCredentials: true,
        url: "/account/logout",
      });
      console.log(res.data);
      if (!res.data.success) {
        alert('logout unsuccessful')
      } else {
        sessionStorage.clear()
        setisLoggedIn(false)
      }
    } catch (error) {
      alert("Error Logging out")
    }
  }

  const newQuestion = (e) => {
    if (!isLoggedIn){
      history.push("/login")
      return
    } else {
      setOpen(true)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setTextfield('')
  };

  const handleAdd = async () => {
    setOpen(false)
    const questionText = textfield
    setTextfield('')
    try {
      const res = await axios({
        method: "post",
        data : {
          question : questionText, 
        }, 
        withCredentials: true,
        url: "/api/questions/add",
      });
      console.log(res.data);
      if (!res.data.success) {
        alert('error posting question')
      } else {
        sessionStorage.clear()
        setisLoggedIn(false)
      }
    } catch (error) {
      alert("Error Posting Question")
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            <b>CampusWire Lite</b>
          </Typography>
          <div className={classes.barItem} />
          {isLoggedIn && <Button color="inherit" onClick={logout}>Logout</Button>}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <Toolbar />
        <Button
          variant="contained"
          color="primary"
          onClick={newQuestion}
          style={{ width: drawerWidth - 20, margin: '10px 10px 0px 10px', padding: '5px' }}>
          <Box fontWeight="fontWeightBold" m={1}>
            {isLoggedIn ? 'Add new Question +' : 'Log In to submit a question'}
          </Box>
        </Button>

        <div className={classes.drawerContainer}>

          <List>
            <Divider/>
            {questions.map((text, index) => (
              <div key={index} onClick={() => setselected(index)}>
              <ListItem button key={text.questionText} selected={index===selected}>
                <ListItemText primary={text.questionText} />
              </ListItem>
              <Divider/>
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      <div className={classes.content}>
        <Toolbar/>
        <Question question={questions[selected]} isLoggedIn={isLoggedIn}/>
      </div>

      <Dialog maxWidth='md' open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <div style={{width: 600}}>
        <DialogTitle id="form-dialog-title">Add a New Question</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={textfield} 
			      onChange={(e) => setTextfield(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
        </div>
      </Dialog>

    </div>
  );
}