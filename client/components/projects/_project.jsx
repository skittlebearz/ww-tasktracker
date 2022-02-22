import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';
import { useParams } from 'react-router-dom';
import { Tasks } from './tasks';

export const Project = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskName, setTaskName] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [description, setDescription] = useState('');
  const api = useContext(ApiContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    //Get the project
    const proj = await api.get(`/projects/${id}`);
    setProject(proj);
    console.log(id);

    //Get the tasks
    const { tasks } = await api.get(`/project/${id}/tasks`);
    console.log(tasks); // This puts all the tasks in the dev console just as proof it works
    setTasks(tasks);

    setLoading(false);
  }, []);

  const createTask = async () => {
    setErrorMessage('');

    if (taskName === '') {
      setErrorMessage('Tasks must have a name');
      return;
    }
    if (timeEstimate === '') {
      setErrorMessage('Tasks must have an estimated time');
      return;
    }
    if (assignedUser === '') {
      setErrorMessage('Tasks must have an assigned user');
      return;
    }
    const taskBody = {
      userId: taskName,
      parentProject: id,
      completionStatus: false,
      title: taskName,
      description: description,
      timeEstimate: timeEstimate,
    };

    const { task } = await api.post(`projects/${id}/task`, taskBody);

    //Add to displayed list
    setTasks([...tasks, task]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>Project {project.title}</h1>

      <h2>Create New Task:</h2>
      <h2>Task Name</h2>
      <textarea className="p-2 border-2 rounded flex" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <h2>Estimated Time to Complete</h2>
      <textarea
        className="p-2 border-2 rounded flex"
        value={timeEstimate}
        onChange={(e) => setTimeEstimate(e.target.value)}
      />
      <h2>User Assigned to</h2>
      <textarea
        className="p-2 border-2 rounded flex"
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      />
      <h2>Task Description</h2>
      <textarea
        className="p-2 border-2 rounded flex"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={createTask}>Create</Button>

      <div className="text-red-600">{errorMessage}</div>

      {/* <Tasks tasks={tasks} /> */}
    </div>
  );
};
