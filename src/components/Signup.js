import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { register } from "./Validations";
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
const Signup = () => {
    let path_image = process.env.REACT_APP_ASSETS_PATH;
    const navigate = useNavigate();
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [alreadyExist, setShowAlreadyExist] = useState(false);

   const [update, setUpdate] = useState(0)

  const [error,setError] = useState();  
  const [eyeIconClickedd,setEyeIconClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
        setAgreeChecked(true)
    }else{
        setAgreeChecked(false);
    }
 }
   
 const signUpClicked = (e) => {
    e.preventDefault();

    if(agreeChecked == false){
        toast.warning("Please click on i agree to terms and conditions to proceed!");
        return;
    }

    const user = {
        user_firstname: fullName,
        user_email: email,
        user_password:password,
        user_phone:phoneNumber
    }

    const err = register(user)
    console.log(err)

    if (Object.keys(err)?.length) {
        setError(err);
        return;
      }
      else{
        setError({})
      }
   loader("show")
    axios.post('https://snapkaro.com/eazyrooms_staging/api/user_registeration', {
        user_firstname: fullName,
        user_email: email,
        user_password:password,
        user_phone:phoneNumber,
        user_lastname:"Bhardwaj",
        user_city:"Sonepat",
        user_zipcode:"131023"
      })
      .then(function (response) {
        console.log(response);
        if(response.data.msg == "Registered Successfully"){
            setShowSuccessPopup(true)
            loader("hide")
        }
        else if(response.data.msg == "Already Exists"){
            setShowAlreadyExist(true);
            loader("hide")
        }
       
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
					<h2 class="heading-section">Signup</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<h3 class="mb-4 text-center">Have an account? <span className="login-btn" onClick={()=>navigate("/login")}>Login</span></h3>
                
		      	<form action="#" class="signin-form">
		      		<div class="form-group">
		      			<input type="text" class="form-control" placeholder="Full name*"  onChange={(e)=>fullNameChanged(e)}/>
                          {error?.name ? (
                      <div className="login-validation" style={{color:"#f39c12"}}>{error?.name}</div>
                    ) : null}
		      		</div>
                      
	            <div class="form-group">
	              <input id="password-field" type="text" class="form-control" placeholder="Email address*" onChange={(e)=>{emailChanged(e)}} />
                  {error?.email ? (
                      <div className="login-validation" style={{color:"#f39c12"}}>{error?.email}</div>
                    ) : null}
	              {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> */}
	            </div>
            
                <div class="form-group">
	              <input id="password-field" type={eyeIconClickedd == true?"text":"password"} class="form-control" placeholder="Password*"  onChange={(e)=>{passwordChanged(e)}} />
	            {eyeIconClickedd == true?<span toggle="#password-field" class="fa fa-fw fa-eye-slash field-icon toggle-password" onClick = {eyeIconClicked}></span>:<span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick = {eyeIconClicked}></span>}  
                {error?.password ? (
                      <div className="login-validation" style={{color:"#f39c12"}}>{error?.password}</div>
                    ) : null}
	            </div>
                
              
                <div class="form-group">
	              <input id="password-field" type="number" class="form-control" placeholder="Phone number*" onChange={(e)=>{phoneNumberChanged(e)}}/>
	              {/* <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> */}
                  {error?.phone ? (
                      <div className="login-validation" style={{color:"#f39c12"}}>{error?.phone}</div>
                    ) : null}

	            </div>

	            <div class="form-group">
	            	<button  type="submit" class="form-control btn btn-primary submit px-3" onClick={signUpClicked}>Sign Up</button>
	            </div>
	            <div class="form-group d-md-flex">
	            	<div class="w-50">
		            	<label class="checkbox-wrap checkbox-primary">I agree to the Terms of Service and Privacy Policy.
									  <input type="checkbox" onChange = {(e)=>iAgreeClicked(e)}/>
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
                  <h6>Signup unsuccessfull!</h6>
                  <p>
                    
                    
                    Oops! this user id already exists.
                    
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
export default Signup;