import PropTypes from 'prop-types'

export const Button = ({color, text, onclick}) => {
  return <button onClick={onclick} className='btn' style={{backgroundColor:color}}>{text}</button>
}

Button.defaultProps = {
    color: "steelBlue"
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onclick: PropTypes.func
}
