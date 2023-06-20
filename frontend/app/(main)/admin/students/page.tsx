"use client"

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { addStudent, deleteStudent, studentList } from "@/providers/student";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export default function StudentsData() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const {
    data,
    refetch,
  } = useQuery({
    queryKey: "studentList",
    queryFn: studentList,
    onError: () => {
      toast.error("Error while fetching data");
    }
  })

  const {
    mutate: _deleteStudent,
    isLoading: isDeleting,
    variables: deleteStudentVariables
  } = useMutation({
    mutationKey: 'deleteStudent',
    mutationFn: deleteStudent,
    onSuccess: () => {
      refetch()
    },
    onError: () => {
      toast.error("Error while deleting student");
    }
  })

  const {
    mutate: _addStudent,
    isLoading: isAdding,
  } = useMutation({
    mutationKey: 'addStudent',
    mutationFn: addStudent,
    onSuccess: () => {
      refetch()
      toast.success("Student added successfully");
    },
    onError: () => {
      toast.error("Error while adding student");
    }
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;

    _addStudent({
      password,
      first_name,
      last_name,
      email,
    })
  }

  return (
    <section>
      <div>
        <h2 className="text-2xl font-semibold leading-tight">Students Data</h2>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          className="inline-block min-w-full shadow-sm rounded-lg overflow-hidden"
        >
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <TableHeader>

                </TableHeader>
                <TableHeader>
                  Name
                </TableHeader>
                <TableHeader>
                  Email
                </TableHeader>
                <TableHeader>
                  Images
                </TableHeader>
                <TableHeader>
                  Actions
                </TableHeader>
              </tr>
            </thead>
            <tbody>
              {
                data?.data?.map(({ first_name, last_name, email, has_submitted_images, id }) => (
                  <tr key={id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Avatar name={`${first_name} ${last_name}`} />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {first_name} {last_name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{email}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className={clsx("opacity-50 rounded-full px-3 py-1  font-semibold leading-tight inline-block",
                        has_submitted_images ? "bg-green-200 text-green-800" : "bg-orange-200 text-orange-800"
                      )}>{has_submitted_images ? "Submitted" : "Not Submitted"}</div>
                    </td>
                    <td
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <button
                        type="button"
                        className="inline-block text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          confirm("Are you sure you want to delete this student?") && _deleteStudent(id)
                        }}
                        disabled={isDeleting && deleteStudentVariables == id}
                      >
                        <Icon type={(isDeleting && deleteStudentVariables == id) ? "spinner" : "delete"} className="w-6 h-6 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>

      <form className="w-full max-w-xl mt-20" onSubmit={onSubmit}>
        <h1 className="text-2xl font-semibold leading-tight mb-4 flex items-center gap-3 cursor-pointer hover:text-gray-700"
          onClick={() => setIsAddStudentOpen(!isAddStudentOpen)}
        >
          Add New Student <span
            className={clsx("transition-transform transform", isAddStudentOpen && "rotate-180")}
          ><Icon type="down" /></span>
        </h1>
        <div className={clsx(
          isAddStudentOpen ? "block" : "hidden",
        )}>
          <div className="grid md:grid-cols-2 gap-5 grid-cols-1">
            <Input
              type="email"
              name="email"
              placeholder="ram.191704@ncit.edu.np"
              required
              label="College Email"
            />
            <Input
              type="first_name"
              name="first_name"
              placeholder="Ram"
              required
              label="First Name"
            />
            <Input
              type="last_name"
              name="last_name"
              placeholder="Sharma"
              required
              label="Last Name"
            />
            <Input type="text" name="password" required label="Password" value="presence"
              placeholder="presence"
            />
          </div>
          <div className="mt-4">
            <Button type="submit" isLoading={isAdding}>Add New Student</Button>
          </div>
        </div>
      </form>
    </section >
  );
}

function TableHeader({ children }: { children: ReactNode }) {
  return (<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{children}</th>)
}
