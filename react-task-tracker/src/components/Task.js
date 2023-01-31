import { FaTimes } from 'react-icons/fa'

export const Task = ({task, ondelete, togglereminder}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={()=> togglereminder(task.id)}>
        <h3>{task.text} <FaTimes onClick={ ()=> ondelete(task.id)} style={{color:'red', cursor:'pointer'}}/></h3>
        <p>{task.day}</p>
    </div>
  )
}
