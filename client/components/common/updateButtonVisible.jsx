export const UpdateButtonVisible = ({ task, userId, children, ...other }) => {
  var visible = !task.completionStatus;

    if (visible && userId == task.userId) {
      return ( <button className="bg-gray-600 pt-2 pb-2 pr-4 pl-4 rounded-lg font-bold text-white"{...other}>
        {children}
      </button>);
    }
    else if (visible) {
      return ( <div>Relax, someone else will take care of this!</div> )
    }
    else if (userId == task.userId) {
      return ( <div>You completed this! Nice job!</div> );
    }
    else {
      return ( <div>Someone else completed this!</div> );
    };
};


