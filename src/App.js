import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./customHooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, isError, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTaskes = (taskObj) => {
      const loadedTasks = [];
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-http-using-fetch-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTaskes
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={isError}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
