export const login = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.user_email) {
    error.email = "Email is required";
  } else if (!regemail.test(data.user_email)) {
    error.email = "Invalid email";
  }
  if (!data?.user_password) {
    error.password = "Password is required";
  }

  return error;
};

export const register = (data) => {
  let error = {};
  const regemail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data?.user_firstname) {
    error.name = "Name is required.";
  }
  if (!data?.user_email) {
    error.email = "Email is required.";
  } else if (!regemail.test(data.user_email)) {
    error.email = "Invalid email";
  }

  if (!data?.user_password) {
    error.password = "Password is required";
  } else if(data?.user_password.length<5){
        error.password = "Password must be of 5 characters length."
  }

  if (!data?.user_phone) {
    error.phone = "Phone number is required";
  } else if(data?.user_phone.length!==10){
        error.phone = "Phone number must be of 10 digits."
  }
  
  return error;
};



