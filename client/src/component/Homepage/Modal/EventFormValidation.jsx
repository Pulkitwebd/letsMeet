import * as yup from "yup";

const validation = yup.object({
  landmark: yup.string().required("Landmark is required!"),
  houseNo : yup.string().required("Flat, House no, Building, Company, Apartment is required!"),
  area : yup.string().required("Area is required!"),
  city : yup.string().required("City is required!"),
  state : yup.string().required("State is required!"),
  personNeeded : yup.string().required("Person Needed is required!")
});

export default validation;