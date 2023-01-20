import * as yup from "yup";

const validation = yup.object({
  landmark: yup.string().required("Landmark is required!"),
  // city: yup.string().required("City is required!"),
});

export default validation;