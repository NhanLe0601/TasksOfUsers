import React, { useEffect, useState } from "react";
import ItemTask from '../ItemTask';
import axios from 'axios';

const ListTask = (props) => {
  const { listTask } = props;
  const [listTaskCustom, setListTaskCustom] = useState([]);

  useEffect(() => {
    setListTaskCustom(listTask);
  }, [listTask]);

  const handleClickUpdateComplete = async (taskCompleted, idTask) => {
    const response = await axios.patch(`${'https://jsonplaceholder.typicode.com/todos/'}${idTask}`, { completed: taskCompleted });

    if (response.status === 200) {
      const index = listTaskCustom.findIndex(item => item.id === idTask);
      listTaskCustom[index].completed = taskCompleted;

      setListTaskCustom([
        ...listTaskCustom
      ]);
    }

  };


  return (
    <>
      <ul>
        {
          listTaskCustom.length > 0 ?
            (
              listTaskCustom.sort((a, b) =>
                a.completed - b.completed
              ).map((task) => {
                return (
                  <ItemTask
                    key={task.id}
                    dataTask={task}
                    handleClick={handleClickUpdateComplete}
                  />
                )
              })

            )
            :
            <p>No Data</p>
        }
      </ul >
      <p> <b>{`Done: ${listTaskCustom.filter(item => item.completed).length}/${listTaskCustom.length} tasks`}</b></p>
    </>
  );
}

export default ListTask;