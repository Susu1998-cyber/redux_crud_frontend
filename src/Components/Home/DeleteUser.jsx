import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../Redux/employee/EmployeReducer";
import { toast } from "react-toastify";

const DeleteModal = ({ open, handleClose, selectedEmployeeId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteEmployee({ id: selectedEmployeeId })).unwrap();
      dispatch(getAllEmployees());
      toast.success("Employee Deleted Successfully");
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete employee");
    }
  };

  if (!open) return null; // Show modal only when open = true

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
        <p className="text-gray-600">
          Are you sure you want to delete this employee?
        </p>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
