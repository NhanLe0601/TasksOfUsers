import DoneIcon from '@mui/icons-material/Done';
import './style.scss'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const ItemTask = (props) => {
  const { dataTask, handleClick } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [dataTask]);

  return (
    <li>
      <ListItem >
        {dataTask.completed ? <CheckCircleOutlineIcon className='circlecheck' /> : <IndeterminateCheckBoxIcon className='roundcheck' />} &nbsp;&nbsp;<ListItemText className='item-task' primary={dataTask.title} />
        {
          !dataTask.completed ?
            (
              <button
                onClick={() => {
                  setIsLoading(true);
                  handleClick(!dataTask.completed, dataTask.id);
                }}
              >
                {!isLoading ? 'Mark Done' : (
                  <Box className='loading' sx={{ display: 'flex' }}>
                    <CircularProgress size={15} />
                    Mart done
                  </Box>
                )}
              </button>
            )
            :
            <DoneIcon />
        }
      </ListItem>
    </li>
  );
}

export default ItemTask;