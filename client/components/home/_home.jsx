import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [projectName, setProjectName] = useState('');
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);

    //Get the projects
    const { projects } = await api.get('/projects');
    console.log(projects); // This puts all the projects in the dev console just as proof it works
    setProjects(projects);

    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  const createProject = async () => {
    setErrorMessage('');

    if (projectName === '') {
      setErrorMessage('Projects must have a name');
      return;
    }
    //Create an object with the name to pass to the project controller
    const projectTitle = {
      contents: projectName,
    };
    //Pass to the controller
    const { project } = await api.post('/projects', projectTitle);

    //Add to displayed list
    setProjects([...projects, project]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>

      <h1>Your Projects:</h1>
      <div className="flex-1">
        {projects.map((project) => (
          <div key={project.id} className="border-2 rounded p-4">
            {project.title}
            <div>
              <Button onClick={(() => navigate('/project/${project.id}'), { proj: project })}>Details</Button>
            </div>
          </div>
        ))}
      </div>

      <h2>Create Project:</h2>
      <textarea
        className="p-2 border-2 rounded flex"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Button onClick={createProject}>Create</Button>

      <div className="text-red-600">{errorMessage}</div>

      <Button type="button" onClick={logout}>
        Logout
      </Button>
      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
    </div>
  );
};
