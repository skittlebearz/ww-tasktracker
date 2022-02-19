import { Button } from '../common/button';

export const Task = ({ task, completeTask }) => {
  return (
    <div className="border-2 rounded p-4">
      {task.title}
      {task.completionStatus}
      {task.timeEstimate}
      {task.user}
      <div>
        <Button onClick={() => completeTask(task)}>Mark Task Complete</Button>
      </div>
    </div>
  );
};
