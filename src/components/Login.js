import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from "react";
import { login, register } from "./Validations";
import {
    Button,
    Col,
    Dropdown,
    Form,
    Modal,
    Row,
    DropdownButton,
  } from "react-bootstrap";
import { loader } from "../loader";
const Login = () => {
    let path_image = process.env.REACT_APP_ASSETS_PATH;
    const navigate = useNavigate();
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [alreadyExist, setShowAlreadyExist] = useState(false);
    const [rememberMe,setRememberMe] = useState(false);

   const [update, setUpdate] = useState(0)

  const [error,setError] = useState();  
  const [eyeIconClickedd,setEyeIconClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      setRememberMe(true);
   

      setEmail(localStorage.getItem("email"))
      setPassword(localStorage.getItem("password"))
      // setEmail(localStorage.getItem("email"));
      // setPassword(localStorage.getItem("password"));
    }
  }, []);

  const fullNameChanged = (e) => {

      setFullName(e.target.value);
  }

  const emailChanged = (e) => {
     setEmail(e.target.value)
  }
  const passwordChanged = (e) => {
    setPassword(e.target.value)
 }

 const phoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value)
 }

 const eyeIconClicked = () => {

    setEyeIconClicked(!eyeIconClickedd);
 }

 const iAgreeClicked = (e) => {
   console.log(e.target.checked)
    if(e.target.checked == true) {
        setRememberMe(true)
    }else{
        setRememberMe(false);
    }
 }
   
 const signUpClicked = (e) => {
    e.preventDefault();

    if (rememberMe == true) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

    const user = {
      
        user_email: email,
        user_password:password,
      
    }

    const err = login(user)
    console.log(err)

    if (Object.keys(err)?.length) {
        setError(err);
        return;
      }
      else{
        setError({})
      }
   loader("show")
    axios.post('https://snapkaro.com/eazyrooms_staging/api/userlogin', {
        
        user_email: email,
        user_password:password,
     
      })
      .then(function (response) {
        console.log(response);
        if(response.data.msg == "Invalid credentials"){
            setShowAlreadyExist(true)
            loader("hide")
            return;
        }
         localStorage.setItem("user_info",JSON.stringify(response.data.user_data[0]))
         navigate("/dashboard")
         loader("hide")
         
       
      })
      .catch(function (error) {
        console.log(error);
        toast.error("something went wrong!")
        loader("hide");
      });


      
      

 }
      return (<>
      <html lang="en">
  <head>
  	<title>Signup</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet"/>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
	
	<link rel="stylesheet" href="css/style.css"/>

	</head>
	<body class="img js-fullheight" style={{backgroundImage:"url(images/bg.jpg)"}}>
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">LOGIN</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<h3 class="mb-4 text-center">Don't have an account? <span className="login-btn" onClick={()=>navigate("/signup")}>Signup</span></h3>
                
		      	<form action="#" class="signin-form">
		      
                      
	            <div class="form-group">
	              <input id="password-field" type="text" class="form-control" placeholder="Email address*" value={email} onChange={(e)=>{emailChanged(e)}} />
                  {error?.email ? (
                      <div className="login-validation" style={{color:"#f39c12"}}>{error?.email}</div>
                    ) : null}
	              {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> */}
	            </div>
            
                <div class="form-group">
	              <input id="password-field" type={eyeIconClickedd == true?"text":"password"} class="form-control" value={password} placeholder="Password*"  onChange={(e)=>{passwordChanged(e)}} />
	            {eyeIconClickedd == true?<span toggle="#password-field" class="fa fa-fw fa-eye-slash field-icon toggle-password" onClick = {eyeIconClicked}></span>:<span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick = {eyeIconClicked}></span>}  
                {error?.password ? (
                      <div className="login-validation" style={{color:"#f39c12"}}>{error?.password}</div>
                    ) : null}
	            </div>
                                          
	            <div class="form-group">
	            	<button  type="submit" class="form-control btn btn-primary submit px-3" onClick={signUpClicked}>Log in</button>
	            </div>
	            <div class="form-group d-md-flex">
	            	<div class="w-50">
		            	<label class="checkbox-wrap checkbox-primary">Remember me.
									  <input type="checkbox"checked={rememberMe} onChange = {(e)=>iAgreeClicked(e)}/>
									  <span class="checkmark"></span>
									</label>
								</div>			
	            </div>
	          </form>
	         
		      </div>
				</div>
			</div>
		</div>
	</section>

    <Modal
              show={showSuccessPopup}
              onHide={()=>setShowSuccessPopup(false)}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              id="thanks_register"
            >
              <div className="thanks_register_inner">
                <Modal.Body>
                  <div className="thanks_register_img">
                    <img src={path_image + "thanks-img.svg"} alt="" />
                  </div>
                  <h6>Signup successfull</h6>
                  <p>
                    
                    
                     You have been successfully registered.
                     Please click on login to enter our world!
                    
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>navigate("/login")} >
                    login
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>

            <Modal
              show={alreadyExist}
              onHide={()=>setShowAlreadyExist(false)}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              id="thanks_register"
            >
              <div className="thanks_register_inner">
                <Modal.Body>
                  <div className="thanks_register_img">
                    <img src={path_image + "alert.svg"} alt="" />
                  </div>
                  <h6>Login unsuccessfull!</h6>
                  <p>
                    
                    
                    Oops! Invalid credentials, Please try again.
                    
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>setShowAlreadyExist(false)} >
                    Close
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>
            
            <ToastContainer />

	<script src="js/jquery.min.js"></script>
  <script src="js/popper.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/main.js"></script>

	</body>
</html>




      </>)
  
}
export default Login;