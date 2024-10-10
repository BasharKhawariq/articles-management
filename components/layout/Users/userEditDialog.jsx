// components/UserEditDialog.js

"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Adjust the import based on your dialog component location
import useLayoutStore from "@/stores/useLayoutStore"; // Access global layout states
import useUsers from "@/stores/useUsers"; // Import your users store

const UserEditDialog = ({ open, onOpenChange, selectedUser }) => {
  const { setLoading, setNotification } = useLayoutStore(); // For global notifications
  const editUser = useUsers((state) => state.editUser); // Access the editUser function from the store

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      id: selectedUser.id,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      email: e.target.email.value,
    };

    try {
      setLoading(true); // Start loading
      await editUser(selectedUser.id, updatedData); // Call editUser from the store
      setNotification({
        type: "success",
        message: "User updated successfully",
      });
      onOpenChange(false); // Close the dialog
    } catch (error) {
      setNotification({ type: "error", message: "Failed to update user" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update the user details below.
            {selectedUser}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              name="first_name"
              defaultValue={selectedUser?.first_name} // Use the selectedUser object
              placeholder="First Name"
              required
              className="border p-2 rounded"
            />
            <input
              name="last_name"
              defaultValue={selectedUser?.last_name} // Use the selectedUser object
              placeholder="Last Name"
              required
              className="border p-2 rounded"
            />
            <input
              name="username"
              defaultValue={selectedUser?.username} // Use the selectedUser object
              placeholder="Username"
              required
              className="border p-2 rounded"
            />
            <input
              name="email"
              type="email"
              defaultValue={selectedUser?.email} // Use the selectedUser object
              placeholder="Email"
              required
              className="border p-2 rounded"
            />
          </div>
          <DialogFooter>
            <DialogClose>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="text-white bg-blue-600 px-4 py-2 rounded"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
