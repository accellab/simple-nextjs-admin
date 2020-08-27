import React from 'react';
import ReactDOM from 'react-dom';

export const ModalContent = ({ children, onCloseModal }) => {
  return (
    <div className='modal__container'>
      <div className='modal__container--content'>
        {/* <div className='close'>
          <a
            className='btn'
            onClick={(e) => {
              e.preventDefault();
              onCloseModal();
            }}
          >
            Close
          </a>
        </div> */}
        {children}
      </div>
    </div>
  );
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('modal-root');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
