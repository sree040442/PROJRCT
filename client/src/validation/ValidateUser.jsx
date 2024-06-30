const Validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please Enter Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid Email";
    }
  
    if (!values.password) {
      errors.password = "Please Enter Password";
    }

    if (!values.first_name) {
        errors.first_name = "Please Enter Name";
      }

      if (!values.username) {
        errors.username = "Please Enter Username";
      }

      if (!values.groups) {
        errors.groups = "Please Enter Role";
      }
  
    return errors;
  };
  
  export default Validate;
  