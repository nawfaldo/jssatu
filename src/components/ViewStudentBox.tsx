import { useRouter } from "next/router";
import { api } from "~/utils/api";
import PrimaryButton from "./buttons/PrimaryButton";

const ViewStudentBox = () => {
  const router = useRouter();
  const { data } = api.student.getStudent.useQuery({
    id: router.query.view?.toString(),
  });

  return (
    <div className="space-y-5 rounded border border-gray-300 p-5">
      <p>Show ID #{data?.id}</p>
      <div className="space-y-2">
        <p className="text-lg font-medium">Name</p>
        <p className="text-lg font-light text-gray-800">{data?.name}</p>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">City</p>
        <p className="text-lg font-light text-gray-800">{data?.city}</p>
      </div>
      <PrimaryButton
        placeholder="Reset"
        onClick={() => router.replace("/")}
        disabled={null}
        bg="bg-black"
      />
    </div>
  );
};

export default ViewStudentBox;
