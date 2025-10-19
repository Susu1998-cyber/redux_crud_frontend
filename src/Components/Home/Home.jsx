import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/login/loginReducer";
import { getAllEmployees } from "../../Redux/employee/EmployeReducer";
import AddModal from "./AddUser";
import EditModal from "./EditUser";
import DeleteModal from "./DeleteUser";
import Navbar from "../Header/Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employees } = useSelector((state) => state.employe);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditOpen(true);
  };
  const handleCloseEdit = () => setEditOpen(false);

  const handleOpenDelete = (employee) => {
    setSelectedEmployeeId(employee._id);
    setDeleteOpen(true);
  };
  const handleCloseDelete = () => setDeleteOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="p-6 mt-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User Table</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
          >
            Logout
          </button>
        </div>

        {/* Add User */}
        <button
          onClick={handleOpenAdd}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          Add User
        </button>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">S.No</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((row, index) => (
                  <tr
                    key={row.email}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{row.name}</td>
                    <td className="p-3 border">{row.email}</td>
                    <td className="p-3 border">{row.phone}</td>
                    <td className="p-3 border">{row.address}</td>
                    <td className="p-3 border">{row.position}</td>
                    <td className="p-3 border text-right">
                      <button
                        onClick={() => handleOpenEdit(row)}
                        className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDelete(row)}
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-4 text-gray-500 border"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddModal open={openAdd} handleClose={handleCloseAdd} />
      <EditModal
        open={openEdit}
        handleClose={handleCloseEdit}
        selectedEmployee={selectedEmployee}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        selectedEmployeeId={selectedEmployeeId}
      />
    </>
  );
};

export default Home;
