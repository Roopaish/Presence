"use client"
import StudentRecord from "@/components/StudentRecord";
import { studentList } from "@/providers/student";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { deleteRecord } from "@/providers/student";
import { useQueryClient } from "react-query";

export default function StudentsData() {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    await queryClient.fetchQuery("student", () => studentList());
  };

  const data = useQuery({
    queryKey: "student",
    queryFn: studentList,
    onSuccess: (data: any) => {},
  });

  const handleDelete = async (id: number) => {
    await deleteRecord(id);
    fetchData();
  };

  if (data.isLoading || data.isFetching) {
    return <Loading />;
  }

  return (
    <section>
      {data && data.data.length > 0 ? (
        <>
          <h1>student record</h1>
          <StudentRecord data={data.data} handleClick={handleDelete} />
        </>
      ) : (
        <h1>No data found</h1>
      )}
    </section>
  );
}
