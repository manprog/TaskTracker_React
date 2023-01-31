import {Task} from './Task'

export const Tasks = ({tasks, ondelete, togglereminder}) => {

  return (
    <>
        {tasks.map((task) => (
            <Task key={task.id} task={task} ondelete={ondelete} togglereminder={togglereminder}/>
        ))
        }
    </>
  )
}
