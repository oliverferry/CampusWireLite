import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import axios from '../Axios'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: 'left'
  },
  title: {
    fontSize: 14,
  },
  messageInput: {
    marginTop: 20,
    backgroundColor: 'white'
  },
  messageBtn: {
    float: 'left',
    marginTop: 10
  }
});

export default function Question({ question, isLoggedIn }) {
  const classes = useStyles();

  const [messageInput, changeMessageInput] = useState('')
  const [answerText, setanswerText] = useState('')

  useEffect(() => {
    if (question === undefined){
      setanswerText('')
    } else {
      setanswerText(question.answer)
    }
  },[question])

  const canSend = () => {
    return (messageInput.length > 0)
  }

  const messageEntered = async (e) => {
    e.preventDefault()
    const answerMsg = messageInput
    changeMessageInput('')
    try {
      const res = await axios({
        method: "post",
        data : {
          id : question._id, 
          answer: answerMsg
        }, 
        withCredentials: true,
        url: "/api/questions/answer",
      });
      console.log(res.data);
      question.answer = answerMsg
      setanswerText(answerMsg)
    } catch (error) {
      alert("Error Answering Question")
    }
  }

  return (
    <div>
      {question !== undefined &&
        <div>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {question.questionText}
              </Typography>
              <Typography color="textSecondary">
                Author:
        </Typography>
              <Typography gutterBottom>
                <b>{question.author}</b>
              </Typography>
              <Typography color="textSecondary">
                Answer:
        </Typography>
              <Typography variant='body1'>
                {answerText}
              </Typography>
            </CardContent>
          </Card>
          {isLoggedIn &&
            <form className={classes.messageInput} onSubmit={messageEntered}>
              <div className='inputItem'>
                <TextField id="outlined-basic" variant="outlined" placeholder="add an answer"
                  autoComplete='off' fullWidth={true}
                  value={messageInput} onChange={e => changeMessageInput(e.target.value)} />
              </div>
              <div className={classes.messageBtn}>
                <Button variant="contained" color="primary" disabled={!canSend()} onClick={messageEntered}>
                  Add Answer
                </Button>
              </div>
            </form>
          }
        </div>
      }
    </div>
  );
}

