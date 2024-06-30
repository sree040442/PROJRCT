const Validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Please Enter Ship Name";
  }

  if (!values.description) {
    errors.description = "Please Enter Description";
  }

  if (!values.condition) {
    errors.condition = "Please Enter Condition";
  }

  if (!values.date) {
    errors.date = "Please Enter Arrival Date";
  }

  if (!values.current_location) {
    errors.current_location = "Please Enter Current Location";
  }

  if (!values.from_location) {
    errors.from_location = "Please Enter From Location";
  }

  if (!values.to_location) {
    errors.to_location = "Please Enter To Location";
  }

  if (!values.estimated_date) {
    errors.estimated_date = "Please Enter Estimated Date";
  }

  if(!values.delivery_boy_assigned){
    errors.delivery_boy_assigned = "Please Enter Delivery Boy"
  }
  if (!values.payment_amount) {
    errors.payment_amount = "Please Enter Payment Amount";
  }

  return errors;
};

export default Validate;
