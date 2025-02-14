import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { Badge, Checkbox, Table } from "flowbite-react";
import Pagination from "@/Components/Pagination";
import {
 PROJECT_STATUS_CLASS_MAP,
 PROJECT_STATUS_TEXT_MAP,
} from "@/constants.js";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
const Index = ({ projects, queryParams = null }) => {
 // impelemnt filtering
 queryParams = queryParams || {};

 const searchFieldChanged = (name, value) => {
  if (value) {
   queryParams[name] = value;
  } else {
   delete queryParams[name];
  }

  router.get(route("project.index"), queryParams);
 };

 const onKeyPress = (name, e) => {
  if (e.key !== "Enter") return;
  searchFieldChanged(name, e.target.value);
 };
 //  console.log(projects);
 return (
  <AuthenticatedLayout
   header={
    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
     Dashboard
    </h2>
   }
  >
   <Head title="Projects" />

   <div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 py-3">
      Projects
     </h2>
     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100">
       {/* {projects.data} */}
       <div className="overflow-x-auto">
        {/* flobite table */}
        <Table hoverable>
         <Table.Head>
          <Table.HeadCell className="p-4">
           <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell className="font-bold">ID</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Created at</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
          <Table.HeadCell>Created By</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
         </Table.Head>

         {/* filtering header */}
         <Table.Head>
          <Table.HeadCell className="p-4">{/* <Checkbox /> */}</Table.HeadCell>
          <Table.HeadCell className="font-bold"></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>
           <TextInput
            defaultValue={queryParams.name}
            className="w-full"
            placeholder="Project Name"
            onBlur={(e) => searchFieldChanged("name", e.target.value)}
            onKeyPress={(e) => onKeyPress("name", e)}
           />
          </Table.HeadCell>
          <Table.HeadCell>
           <SelectInput
            defaultValue={queryParams.status}
            className="w-full"
            onChange={(e) => searchFieldChanged("status", e.target.value)}
           >
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
           </SelectInput>
          </Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
         </Table.Head>
         {/* table body */}
         <Table.Body className="divide-y">
          {projects.data.map((project) => (
           <Table.Row
            key={project.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
           >
            <Table.Cell className="p-4">
             <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
             {project.id}
            </Table.Cell>
            <Table.Cell>
             {" "}
             <img
              src={project.image_path}
              alt={project.image_path}
              width={60}
             />
            </Table.Cell>
            <Table.Cell>{project.name}</Table.Cell>
            <Table.Cell>
             {project.status == "in_progress" ? (
              <Badge color="info">{project.status}</Badge>
             ) : (
              ""
             )}
             {project.status == "completed" ? (
              <Badge color="success">{project.status}</Badge>
             ) : (
              ""
             )}
             {project.status == "pending" ? (
              <Badge color="warning">{project.status}</Badge>
             ) : (
              ""
             )}
            </Table.Cell>
            <Table.Cell>{project.created_at}</Table.Cell>
            <Table.Cell>{project.due_date}</Table.Cell>
            <Table.Cell>{project.createdBy.name}</Table.Cell>
            <Table.Cell>
             {/* inertia js link */}
             <Link
              href={route("project.edit", project.id)}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-1"
             >
              Edit
             </Link>
             <Link
              href={route("project.destroy", project.id)}
              className="font-medium text-red-600 hover:underline dark:text-red-500 mx-1"
             >
              delete
             </Link>
            </Table.Cell>
           </Table.Row>
          ))}
         </Table.Body>
        </Table>
        {/* pagination compponent goes here */}
        <Pagination links={projects.meta.links} />
       </div>
      </div>
     </div>
    </div>
   </div>
  </AuthenticatedLayout>
 );
};

export default Index;
