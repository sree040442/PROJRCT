const Validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please Enter Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid Email";
    }
  
    if (!values.password) {
      errors.password = "Please Enter password";
    }
  
    return errors;
  };
  
  export default Validate;
  