import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  createEmployee,
  getAllEmployees,
} from "../../Redux/employee/EmployeReducer";
import { toast } from "react-toastify";

const AddUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  position: Yup.string().required("Role is required"),
});

const AddModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      position: values.position,
    };

    try {
      await dispatch(createEmployee(data)).unwrap();
      toast.success("Employee Added Successfully");

      await dispatch(getAllEmployees());

      resetForm();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null; // don't render modal if closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center   ">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add User</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
            position: "",
          }}
          validationSchema={AddUserSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <Field
                  name="name"
                  placeholder="Name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Field
                  name="phone"
                  placeholder="Phone"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.phone && touched.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <Field
                  name="address"
                  placeholder="Address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.address && touched.address
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.address && touched.address && (
                  <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <Field
                  name="position"
                  placeholder="Role"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.position && touched.position
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.position && touched.position && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.position}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddModal;
