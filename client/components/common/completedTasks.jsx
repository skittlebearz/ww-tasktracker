export const CompletedTasks = ({ task, children, ...other }) => {
    var completed = task.completionStatus;
  
      if (completed) {
        return ( <div {...other}>
          {children}
        </div>);
      }
      else {
        return ( <div></div> );
      };
  };
  
  
  