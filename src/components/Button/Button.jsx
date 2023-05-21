import PropTypes from 'prop-types';
import { Btn } from './Button.styled';
function Button({ isDisabled, onClick }) {
  return (
    <Btn type="button" disabled={isDisabled} onClick={onClick}>
      Load more
    </Btn>
  );
}

Button.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
