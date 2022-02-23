import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';
import { useParams } from 'react-router-dom';
import { UpdateButtonVisible } from '../common/updateButtonVisible';
import { CompletedTasks } from '../common/completedTasks';
import { IncompleteTasks } from '../common/incompleteTasks';
import { Tasks } from './tasks';

export const Project = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskName, setTaskName] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [description, setDescription] = useState('');
  const [emailField, setEmailField] = useState('');
  const api = useContext(ApiContext);

  const { id: contextId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    //Get the project
    const id = (await api.get(`/projectid/${contextId}`)).id;
    const proj = await api.get(`/projects/${id}`);

    setProject(proj);

    //Get the tasks
    const { tasks } = await api.get(`/projects/${id}/tasks`);
    const { users } = await api.get(`/projects/${id}/users`);
    console.log('Users:');
    console.log(users);
    console.log(tasks);
    setTasks(tasks);
    setUsers(users);

    setLoading(false);
  }, []);

  const createTask = async () => {
    const id = (await api.get(`/projectid/${contextId}`)).id;
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
      userId: assignedUser,
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

  const addContributor = async () => {
    const id = (await api.get(`/projectid/${contextId}`)).id;
    setErrorMessage('');

    if (emailField === '') {
      setErrorMessage('You must enter an email!');
      return;
    }
    const inviteBody = {
      email: emailField,
      projectId: id,
    };

    console.log('User id:');
    console.log(id);

    console.log('Users[0]:');
    console.log(users[0]);

    const test = await api.get(`/projects/${id}/users`);
    console.log('Test:');
    console.log(test);
    var newUser = await api.post(`/projects/${id}/adduser`, inviteBody);
    console.log('User:');
    console.log(newUser);

    //Add to displayed list
    setUsers([...users, newUser]);
    window.location.reload(false);
  };

  const updateTaskStatus = async (task) => {
    setCurrentTask(task);
    console.log(task);
    await api.post(`/tasks/${task.id}`);
    window.location.reload(false);
  };

  function userName(assignedUserId) {
    return users[assignedUserId];
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // {(await api.get(`/users/${id}`)).name;} // This gets the user's name if given the user's id.

  return (
    <div className="p-4">
      <h1>Project {project.title}</h1>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2>Create New Task:</h2>
          <h2>Task Name</h2>
          <textarea
            className="p-2 border-2 rounded flex"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <h2>Estimated Time to Complete (In Hours)</h2>
          <textarea
            className="p-2 border-2 rounded flex"
            value={timeEstimate}
            onChange={(e) => setTimeEstimate(e.target.value)}
          />
          <h2>Assigned User</h2>

          {users.map((currentUser) => (
            <Button className="bg-gray-600 pt-2 pb-2 pr-4 pl-4 rounded-lg font-bold text-white" key={currentUser.id}>
              <div key={currentUser.id} className="border-2 rounded p-4">
                <div onClick={(e) => setAssignedUser(currentUser.id)}>
                  {' '}
                  {currentUser.firstName} {currentUser.lastName}
                </div>
              </div>
            </Button>
          ))}

          <h2>Task Description</h2>
          <textarea
            className="p-2 border-2 rounded flex"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={createTask}>Create</Button>

          <div className="text-red-600">{errorMessage}</div>

          <h1>Incomplete Tasks:</h1>
          <div className="flex-1">
            {tasks.map((task) => (
              <IncompleteTasks task={task}>
                <div key={task.id} className="border-2 rounded p-4">
                  {task.title}
                  <div>{task.description}</div>
                  <div>This should take about {task.timeEstimate} hours.</div>
                  <UpdateButtonVisible task={task} userId={user.id} onClick={() => updateTaskStatus(task)}>
                    Mark Complete
                  </UpdateButtonVisible>
                </div>
              </IncompleteTasks>
            ))}
          </div>
        </div>

        <div>
          <h1>Completed Tasks:</h1>
          <div className="flex-1">
            {tasks.map((task) => (
              <CompletedTasks task={task}>
                <div key={task.id} className="border-2 rounded p-4">
                  {task.title}
                  <div>{task.description}</div>
                  <div>This should take about {task.timeEstimate} hours.</div>
                  <UpdateButtonVisible task={task} userId={user.id} onClick={() => updateTaskStatus(task)}>
                    Mark Complete
                  </UpdateButtonVisible>
                </div>
              </CompletedTasks>
            ))}
          </div>
        </div>

        <div>
          <h2>Add a contributor:</h2>
          <h2>Email address of contributor</h2>
          <textarea
            className="p-2 border-2 rounded flex"
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
          />
          <Button onClick={addContributor}>Invite to Project</Button>

          <div className="text-red-600">{errorMessage}</div>

          <h1>Contributors:</h1>
          <div className="flex-1">
            {users.map((currentUser) => (
              <div key={currentUser.id} className="border-2 rounded p-4">
                <div>
                  {currentUser.firstName} {currentUser.lastName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
