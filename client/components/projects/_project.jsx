import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskName, setTaskName] = useState('');
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    //Get the projects
    const { project } = await api.get('/project/id');
    const { tasks } = await api.get('/project/tasks');
    console.log(tasks); // This puts all the projects in the dev console just as proof it works
    setTasks(tasks);

    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const createTask = async () => {
    setErrorMessage('');

    if (taskName === '') {
      setErrorMessage('Tasks must have a name');
      return;
    }
    const taskTitle = {
      contents: taskName,
    };
    const { task } = await api.post('/tasks', projectTask);

    //Add to displayed list
    setProjects([...projects, project]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>Project {project.projectName}</h1>

      <div className="flex-1">
        {this.state.project.map((task) => (
          <div key={task.id} className="border-2 rounded p-4">
            {task.title}
            <div>
              <Button onClick={() => navigate('/project/:id')}>Complete</Button>
            </div>
          </div>
        ))}
      </div>

      <h2>Create Project:</h2>
      <textarea
        className="p-2 border-2 rounded flex"
        value={projectName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button onClick={createTask}>Create</Button>

      <div className="text-red-600">{errorMessage}</div>
    </div>
  );
};
