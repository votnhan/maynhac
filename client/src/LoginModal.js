import React from 'react';
import Modal from 'react-modal';
import icongoogle from './assets/imgs/icons/icon-google.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './assets/vendor/animate/animate.css';
import './assets/vendor/css-hamburgers/hamburgers.min.css';
import './assets/vendor/animsition/css/animsition.min.css';
import './assets/vendor/select2/select2.min.css';
import './assets/vendor/daterangepicker/daterangepicker.css';
import './assets/css/LoginModal.css';


 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#content')
 
class LoginModal extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    
    this.setState({
        modalIsOpen: nextProps.isOpen
    })
  
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
			<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
				<form className="login100-form validate-form flex-sb flex-w">
					<span className="login100-form-title p-b-53">
						Sign In With
					</span>

					<a href="#" className="btn-face m-b-20">
						<i className="fa fa-facebook-official"></i>
						Facebook
					</a>

					<a href="#" className="btn-google m-b-20">
						<img src={icongoogle} alt="GOOGLE"/>
						Google
					</a>
					
					<div className="p-t-31 p-b-9">
						<span className="txt1">
							Username
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Username is required">
						<input className="input100" type="text" name="username" />
						<span className="focus-input100"></span>
					</div>
					
					<div className="p-t-13 p-b-9">
						<span className="txt1">
							Password
						</span>

						<a href="#" className="txt2 bo1 m-l-5">
							Forgot?
						</a>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="pass" />
						<span className="focus-input100"></span>
					</div>

					<div className="container-login100-form-btn m-t-17">
						<button className="login100-form-btn">
							Sign In
						</button>
					</div>

					<div className="w-full text-center p-t-55">
						<span className="txt2">
							Not a member?
						</span>

						<a href="#" className="txt2 bo1">
							Sign up now
						</a>
					</div>
				</form>
			</div>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;