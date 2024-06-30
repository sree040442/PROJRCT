const Validate = (values) => {
    const errors = {};
  
    if (!values.name) {
      errors.name = "Please Enter Product Name";
    }

    if (!values.price) {
        errors.price = "Please Enter price";
      }

      if (!values.description) {
        errors.description = "Please Enter description";
      }

    return errors;
  };
  
  export default Validate;
  