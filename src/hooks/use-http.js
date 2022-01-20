import { useCallback, useState } from "react";
import { SET_TIMEOUT } from "../helpers/Helpers";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Promise.race([
        fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : `GET`,
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }),
        SET_TIMEOUT(5),
      ]);

      if (!response.ok) {
        throw new Error(`${response.status} Request failed!`);
      }

      const data = await response.json();

      console.log(data);

      applyData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest,
  };
};
export default useHttp;

// --------------- HOW TO USE FOR GET REQUEST (DIFFERENT COMPONENT) ----------------

/*
const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: "https://react-tester-9d1b5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    };

    const taskGrabber = (data) => {
      const loadedTasks = Object.keys(data).map((taskKey) => {
        return { id: taskKey, text: data[taskKey].text };
      });

      console.log(loadedTasks);
      setTasks(loadedTasks);
    };

    fetchTasks(requestConfig, taskGrabber);
  }, [fetchTasks]);

*/

// --------------- HOW TO USE FOR POST REQUEST (DIFFERENT COMPONENT) ----------------

/*
const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-tester-9d1b5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask.bind(null, taskText)
    );
  };

*/
