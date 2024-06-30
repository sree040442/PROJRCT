const Validate = (values) => {
  const errors = {};
  if (!values.card_Name) {
    errors.card_Name = "Please Enter Name on Card";
  }
  
  if (!values.card_No) {
    errors.card_No = "Please Enter Card Number";
  } else if (values.card_No.length !== 16) {
    errors.card_No = "Invalid Card Number";
  }

  if (!values.expiry_date) {
    errors.expiry_date = "Please Enter Expiry Date";
  }
  if (!values.cvv) {
    errors.cvv = "Please Enter CVV";
  } else if (values.cvv.length !== 3) {
    errors.cvv = "Invalid CVV";
  }
  return errors;
};

export default Validate;
