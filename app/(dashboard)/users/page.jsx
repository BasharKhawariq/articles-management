"use client";

import { useEffect, useState } from "react";
import useUsers from "@/stores/useUsers"; // Assuming this handles fetching users
import useLayoutStore from "@/stores/useLayoutStore"; // Access global layout states
import UserEditDialog from "@/components/layout/Users/userEditDialog"; // Adjust the import path based on your file structure
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

export default function Table() {
  const { users, fetchUsers, deleteUser } = useUsers();
  const { setLoading, setNotification } = useLayoutStore(); // For global notifications

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUsers();
      setLoading(false);
    };
    fetchData();
  }, [fetchUsers, setLoading]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setNotification({
        type: "success",
        message: "User deleted successfully",
      });
    } catch {
      setNotification({ type: "error", message: "Failed to delete user" });
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Pass the entire user object
    setOpen(true); // Open the dialog
   };

  return (
    <div className="p-3 h-full w-full bg-gray-100">
      {selectedUser}
      <div className="w-full min-h-20 flex items-center bg-white rounded-t-md pl-2 font-semibold">
        <div className="w-full px-2 flex items-center justify-between">
          <span>Total User : {users.length}</span>
          <div className="flex justify-center items-center gap-4 mr-4">
            <FaSearch />
            <IoFilter />
            <button
              type="button"
              className="text-sm py-2 rounded-md  bg-gradient-to-b from-[#0BA5EC] to-[#3D5ED1] px-4 text-white"
            >
              Sync
            </button>
          </div>
        </div>
      </div>
      <div className="flex shadow-lg h-[36rem] justify-center overflow-auto text-slate-800 bg-white rounded-lg">
        <table className="table-auto border-b-2 w-full min-w-[300px] md:min-w-[500px]">
          <thead className="shadow-md sticky top-0 bg-white outline outline-2 outline-neutral-200 ">
            <tr>
              <th className="px-4 py-2 border-gray-300">NO</th>
              <th className="px-4 py-2 border-gray-300">FULLNAME</th>
              <th className="px-4 py-2 border-gray-300">FIRST NAME</th>
              <th className="px-4 py-2 border-gray-300">LAST NAME</th>
              <th className="px-4 py-2 border-gray-300">USERNAME</th>
              <th className="px-4 py-2 border-gray-300">EMAIL</th>
              <th className="px-4 py-2 border-gray-300">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-center border-b">{index + 1}</td>
                <td className="px-4 py-2 text-center border-b">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {user.first_name}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {user.last_name}
                </td>
                <td className="px-4 py-2 text-center border-b">
                  {user.username}
                </td>
                <td className="px-4 py-2 text-center border-b">{user.email}</td>
                <td className="px-4 py-2 text-center border-b flex gap-4 items-center justify-center">
                  <button
                    type="button"
                    className="text-sm py-2 rounded-md  bg-gradient-to-b from-[#0BA5EC] to-[#3D5ED1] px-4 text-white"
                    onClick={() => handleEdit(user.id, user.first_name, user.last_name, user.username, user.email)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-sm py-2 text-white bg-red-600 px-4 hover:bg-red-700 rounded-md"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Edit Dialog */}
      <UserEditDialog open={open} onOpenChange={setOpen} selectedUser={selectedUser} />
     </div>
  );
}