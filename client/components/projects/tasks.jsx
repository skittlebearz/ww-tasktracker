import { Task } from './task';

export const Tasks = ({ tasks, completeTask }) => {
  return (
    <div className="flex-1">
      {tasks.map((task) => (
        <div className="border-2 rounded p-4">
          {task.title}
          {task.completionStatus}
          {task.timeEstimate}
          {task.user}
          <div>
            <Button onClick={() => completeTask(task)}>Mark Task Complete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
