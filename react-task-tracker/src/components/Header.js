import PropTypes from 'prop-types'
import { Button } from './Button'


export const Header = (props) => {

  return (
    <header className='header'>
        <h1> {props.title}</h1>
        <Button color={props.showAddTask ? "Red":"Green"} text={props.showAddTask ? "Close":"Add"} onclick={props.toogleShowAddTask}/>
    </header>
  )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes  = {
    title: PropTypes.string.isRequired
}

//const headingColors = {color:"red", backgroundColor:"black"}