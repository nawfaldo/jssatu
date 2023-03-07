import { useState } from "react";
import PrimaryButton from "./buttons/PrimaryButton";

import StringInput from "./inputs/StringInput";

import { api } from "~/utils/api";
import { useRouter } from "next/router";

const EditStudentBox = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const { data } = api.student.getStudent.useQuery(
    {
      id: router.query.edit?.toString(),
    },
    {
      onSuccess: (student) => {
        setName(student?.name ? student?.name : "");
        setCity(student?.city ? student?.city : "");
      },
    }
  );

  const utils = api.useContext();

  const updateStudent = api.student.updateStudent.useMutation({
    onSettled: () => {
      utils.student.getAllStudents.invalidate();
      router.replace("/");
    },
  });

  const handleUpdateStudent = () => {
    updateStudent.mutate({
      id: router.query.edit ? router.query.edit.toString() : "",
      name: name,
      city: city,
    });
  };

  return (
    <div className="space-y-5 rounded border border-gray-300 p-5">
      <p>Show ID #{data?.id}</p>
      <div className="space-y-2">
        <p className="text-lg font-medium">Name</p>
        <StringInput
          placeholder="name"
          onChange={setName}
          value={name ? name : ""}
        />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">City</p>
        <StringInput
          placeholder="city"
          onChange={setCity}
          value={city ? city : ""}
        />
      </div>
      <PrimaryButton
        placeholder="Update Student"
        onClick={handleUpdateStudent}
        disabled={updateStudent.isLoading}
        bg="bg-blue-500"
      />
    </div>
  );
};

export default EditStudentBox;
