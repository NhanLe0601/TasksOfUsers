
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListTask from '../ListTask';
import './style.scss';

const ListUser = () => {
  const [getUser, setGetUser] = useState([]);
  const [listTask, setListTask] = useState([]);
  const [userId, setUserId] = useState('');

  const handleChange = (event) => {
    setUserId(event.target.value);
    (async () => {
      const response = await axios.get(`${'https://jsonplaceholder.typicode.com/users/'}${event.target.value}${'/todos'}`);
      setListTask(response.data);
    })();
  };

  const getDataUser = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setGetUser(response.data);
  };

  useEffect(() => {
    getDataUser();
  }, []);


  return (
    <Container maxWidth="xxl">
      <h1>User's Task List</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                label="Age"
                onChange={handleChange}
              >
                {getUser.length > 0 &&
                  getUser.map((user) => {
                    return (
                      <MenuItem value={user.id}>{user.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <p><b> Tasks </b></p>
          <ListTask listTask={listTask} />
        </Grid>

      </Grid>
    </Container>
  );
}

export default ListUser;