import PrimaryButton from "./buttons/PrimaryButton";

import { api } from "~/utils/api";
import { useRouter } from "next/router";

const StudentsTable = () => {
  const router = useRouter();

  const { data } = api.student.getAllStudents.useQuery();

  const utils = api.useContext();

  const deleteStudent = api.student.deleteStudent.useMutation({
    onSettled: () => {
      utils.student.getAllStudents.invalidate();
    },
  });

  const handleDeleteStudent = ({ id }: any) => {
    deleteStudent.mutate({ id: id });
  };

  return (
    <div className="relative overflow-x-auto rounded">
      <table className="w-full text-left text-sm text-black">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              View
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Destroy
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((s: any) => (
            <tr className="border-b bg-white" key={s.id}>
              <td className="px-6 py-4">{s.id}</td>
              <td className="px-6 py-4">{s.name}</td>
              <td className="px-6 py-4">{s.city}</td>
              <td className="px-6 py-4">
                <PrimaryButton
                  disabled={false}
                  placeholder="View"
                  onClick={() => router.replace(`/?view=${s.id}`)}
                  bg="bg-black"
                />
              </td>
              <td className="px-6 py-4">
                <PrimaryButton
                  disabled={false}
                  placeholder="Edit"
                  onClick={() => router.replace(`/?edit=${s.id}`)}
                  bg="bg-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                <PrimaryButton
                  disabled={false}
                  placeholder="Destroy"
                  onClick={() => handleDeleteStudent({ id: s.id })}
                  bg="bg-red-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
