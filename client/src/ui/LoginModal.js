import React from 'react';
import Modal from 'react-modal';
import icongoogle from '../assets/imgs/icons/icon-google.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import '../assets/vendor/animate/animate.css';
import '../assets/vendor/css-hamburgers/hamburgers.min.css';
import '../assets/vendor/animsition/css/animsition.min.css';
import '../assets/vendor/select2/select2.min.css';
import '../assets/vendor/daterangepicker/daterangepicker.css';
import '../assets/css/LoginModal.css';
import UserService from '../services/UserService';
import UserInfo from '../models/UserInfo';


 
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
    this.props = props;
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.state.isLogin === true) {
        this.toSignUp();
    }
    else {
        this.toLogin();
    }
  }

  toLogin = () => {
      this.setState({isLogin: true, 
        title: 'Sign In With', 
        buttonTitle: 'Sign In', 
        suggest: 'Sign up now',
      additionalField: null});
  }

  onInputChanged = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  toSignUp = () => {
    this.setState({isLogin: false, 
      title: 'Sign Up With', 
      buttonTitle: 'Sign Up', 
      suggest: 'Login',
    additionalField: [this.createField("email", "Email", "Email is required", false)
    , this.createField("name", "Name", "Name is required")]});
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

  onSignUpClicked = (e) => {
      e.preventDefault();

  }

  onSuggestClicked = (e) => {
      e.preventDefault();
        if (this.state.isLogin === true) {
            this.toSignUp();
        }
        else {
            this.toLogin();
        }
  }

  onSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();
    console.log("Submit");
    if (this.state.isLogin === true) {

      UserService.handleLogin(this.state.username, this.state.pass, (e) => {
        UserInfo.setJWT(e);
        console.log(e);
        UserInfo.setUserName(this.state.username);
        console.log(UserInfo.getUserName());
        this.props.loginCallback(this.state.username);
      });
    }
    else {
      UserService.handleSignup(this.state.name, this.state.email, this.state.username, this.state.pass, (e) => {
        console.log(e);
      });
    }
    

  }

  createField = (name, suggest, validate, isPassword) => {
    return (
      <div className="container-login100-form-btn m-t-8"> 
        <div className="p-t-5 p-b-9">
						<span className="txt1">
							{suggest}
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = { validate}>
						<input className="input100" type={isPassword ? "password" : "text"} name={name} onChange={this.onInputChanged}/>
						<span className="focus-input100"></span>
					</div>
      </div>
    )
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
				<form className="login100-form validate-form flex-sb flex-w" onSubmit={this.onSubmit}>
					<span className="login100-form-title p-b-53">
						{this.state.title}
					</span>

					<a href className="btn-face m-b-20">
						<i className="fa fa-facebook-official"></i>
						Facebook
					</a>

					<a href className="btn-google m-b-20">
						<img src={icongoogle} alt="GOOGLE"/>
						Google
					</a>

          {this.state.additionalField}
					
          {this.createField("username", "Username", "Username is required", false)}
          {this.createField("pass", "Password", "Password is required", true)}
					

					<div className="container-login100-form-btn m-t-8">
						<button className="login100-form-btn">
							{this.state.buttonTitle}
						</button>
					</div>

                    <div className="w-full text-center p-t-30">
						<a href onClick={this.onSuggestClicked} className="txt2 bo1">
							{this.state.suggest}
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