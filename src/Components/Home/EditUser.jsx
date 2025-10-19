import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  editEmployee,
  getAllEmployees,
} from "../../Redux/employee/EmployeReducer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const EditUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  position: Yup.string().required("Role is required"),
});

const EditModal = ({ open, handleClose, selectedEmployee }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(editEmployee({ id: selectedEmployee._id, ...values }))
      .then(() => {
        toast.success("User Updated Successfully!");
        dispatch(getAllEmployees());
        handleClose();
      })
      .catch(() => {
        toast.error("Failed to update user");
      });
  };

  if (!open) return null; // Tailwind modal shows only when open=true

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50   bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <Formik
          initialValues={{
            name: selectedEmployee?.name || "",
            email: selectedEmployee?.email || "",
            phone: selectedEmployee?.phone || "",
            address: selectedEmployee?.address || "",
            position: selectedEmployee?.position || "",
          }}
          validationSchema={EditUserSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Field
                  name="name"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Field
                  name="phone"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.address && touched.address
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Field
                  name="position"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.position && touched.position
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.position && touched.position && (
                  <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditModal;
