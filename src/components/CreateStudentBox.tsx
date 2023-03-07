import { useState } from "react";
import PrimaryButton from "./buttons/PrimaryButton";

import StringInput from "./inputs/StringInput";

import { api } from "~/utils/api";

const CreateStudentBox = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const utils = api.useContext();

  const createStudent = api.student.createStudent.useMutation({
    onSettled: () => {
      utils.student.getAllStudents.invalidate();
    },
  });

  const handleCreateStudent = () => {
    createStudent.mutate({ name, city });
  };

  return (
    <div className="space-y-5 rounded border border-gray-300 p-5">
      <div className="space-y-2">
        <p className="text-lg font-medium">Name</p>
        <StringInput placeholder="name" onChange={setName} value={name} />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">City</p>
        <StringInput placeholder="city" onChange={setCity} value={city} />
      </div>
      <PrimaryButton
        placeholder="Create Student"
        onClick={handleCreateStudent}
        disabled={createStudent.isLoading}
        bg="bg-green-500"
      />
    </div>
  );
};

export default CreateStudentBox;
