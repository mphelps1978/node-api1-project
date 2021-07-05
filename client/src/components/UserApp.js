import React, {useState, useEffect} from "react";
import "../App.css";
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditUser from './EditUser'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});




const UserApp = (props) => {
  console.log(props);

  const [id, setId] = useState('')
  const [user, setUser] = useState([])
  const [editing, setEditing] = useState(false)
  const classes = useStyles()

  const [editUser, setEditUser] = useState({
    name: '',
    bio: ''
  })


const deleteUser = (user) => {
  console.log(user);
  setId(user)
  axios.delete(`http://localhost:5000/api/users/${user}`)
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

const handleEditClick = () =>{
  setEditing(true)
}

const editUserData = (user) =>  {
  axios.put(`http://localhost:5000/api/users/${user}`, editUser)
  .then(res => console.log(res))
  .catch(err => console.log(err)
  )
}


  useEffect(() => {
    axios
    .get('http://localhost:5000/api/users')
    .then(res =>{
      setUser(res.data)
    })
    .catch(err => console.log(err))

  }, [id])
  console.log(user);


  return (
    <>
    {user.map(user => {
      return(
        <div key={user.id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
              className={classes.title}
              color = "textSecondary" gutterBottom>
              {user.name}
              </Typography>

              <Typography
              className={classes.pos}
              color="textSecondary">
                {user.bio}
              </Typography>
              <Button color="secondary"
              onClick={()=>deleteUser(user.id)}>Delete</Button>
              <Button>Edit</Button>
            </CardContent>
          </Card>
        </div>
      )
    })}

    <div>
     {editing &&
     <EditUser
     user={user}
     editUserData={editUserData}
     editUser={editUser} />
     }

    </div>


    </>

  );
}

export default UserApp