import * as yup from "yup";

export const StepOneValidation = yup.object({
  category: yup.string().required("Category Needed is required!"),
  desc: yup.string().required("Description is required!"),
  title: yup.string().required("Title is required!"),
  personNeeded: yup.string().required("Person Needed is required!"),
});

export const StepTwoValidation = yup.object({
  landmark: yup.string().required("Landmark is required!"),
  houseNo: yup
    .string()
    .required("Flat, House no, Building, Company, Apartment is required!"),
  area: yup.string().required("Area is required!"),
  city: yup.string().required("City is required!"),
  state: yup.string().required("State is required!"),
})

