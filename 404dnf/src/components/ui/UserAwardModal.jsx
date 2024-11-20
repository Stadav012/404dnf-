// UserAwardModal.js
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

const UserAwardModal = ({ user, onAwardChange }) => {
  const [newAwards, setNewAwards] = useState(user ? user.awards : 0);

  const handleSave = () => {
    onAwardChange(newAwards);
  };

  return (
    <DialogContent>
      <DialogTitle>Award User</DialogTitle>
      <p>Increase the awards for {user?.username}</p>
      <Input
        type="number"
        min="0"
        value={newAwards}
        onChange={(e) => setNewAwards(parseInt(e.target.value, 10))}
      />
      <div className="flex justify-end mt-4">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </DialogContent>
  );
};

export default UserAwardModal;
