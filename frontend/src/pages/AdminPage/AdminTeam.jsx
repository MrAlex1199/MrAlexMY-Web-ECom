import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../../components/AdminComponents/Sidebar";
import Header from "../../components/AdminComponents/header";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminTeam({ adminData }) {
  // Sample data for team members
  const teamMembers = [
    {
      id: 1,
      name: "John Cena",
      role: "Manager",
      email: "johncena@gmail.com",
      phone: "0877654321",
      joined: "2022-01-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Developer",
      email: "janedoe@gmail.com",
      phone: "0987654321",
      joined: "2022-02-01",
    },
    {
      id: 3,
      name: "Alice Smith",
      role: "Designer",
      email: "alicesmith@gmail.com",
      phone: "1122334455",
      joined: "2022-03-01",
    },
    {
      id: 4,
      name: "Bob Johnson",
      role: "Tester",
      email: "bobjohnson@gmail.com",
      phone: "1234567890",
      joined: "2022-04-01",
    },
    {
      id: 5,
      name: "Charlie Brown",
      role: "Support",
      email: "charliebrown@gmail.com",
      phone: "0981234567",
      joined: "2022-05-01",
    },
    {
      id: 6,
      name: "Diana Prince",
      role: "HR",
      email: "dianaprince@gmail.com",
      phone: "0912345678",
      joined: "2022-06-01",
    },
    {
      id: 7,
      name: "Desa Prince",
      role: "Support",
      email: "desa123@gmail.com",
      phone: "0912345554",
      joined: "2022-06-01",
    },
    {
      id: 8,
      name: "Ziana Posea",
      role: "HR",
      email: "diprince@gmail.com",
      phone: "0912456678",
      joined: "2022-06-01",
    },
    {
      id: 9,
      name: "Fiaza Srince",
      role: "Developer",
      email: "Fizzaprince@gmail.com",
      phone: "0912456678",
      joined: "2022-06-01",
    },
    {
      id: 10,
      name: "Eiana Frins",
      role: "Designer",
      email: "diance@gmail.com",
      phone: "0912345778",
      joined: "2022-06-01",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter logic
  const [filter, setFilter] = useState("All Members");
  const FilterAdminTeam =
    filter === "All Members"
      ? teamMembers
      : filter === "Managers"
      ? teamMembers.filter((member) => member.role === "Manager")
      : filter === "Developers"
      ? teamMembers.filter((member) => member.role === "Developer")
      : teamMembers.filter((member) => member.role === "Designer");
  const CurrentAdminTeamFilter = FilterAdminTeam.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalFilteredPages = Math.ceil(FilterAdminTeam.length / itemsPerPage);

  //
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Header
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          textpage="Admin Members"
          AdminData={adminData}
        />

        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            {
              title: "Total Members",
              value: teamMembers.length,
              color: "text-blue-600",
            },
            {
              title: "Managers",
              value: teamMembers.filter((member) => member.role === "Manager")
                .length,
              color: "text-green-600",
            },
            {
              title: "Developers",
              value: teamMembers.filter((member) => member.role === "Developer")
                .length,
              color: "text-purple-600",
            },
            {
              title: "Designers",
              value: teamMembers.filter((member) => member.role === "Designer")
                .length,
              color: "text-red-600",
            },
            {
              title: "Testers",
              value: teamMembers.filter((member) => member.role === "Tester")
                .length,
              color: "text-yellow-600",
            },
            {
              title: "Support",
              value: teamMembers.filter((member) => member.role === "Support")
                .length,
              color: "text-indigo-600",
            },
            {
              title: "HR",
              value: teamMembers.filter((member) => member.role === "HR")
                .length,
              color: "text-pink-600",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex-1 min-w-[200px]"
            >
              <h2 className="text-sm font-semibold text-gray-500">
                {card.title}
              </h2>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Team Members List */}
        <div className="bg-white shadow rounded-lg p-6">
          {/* Team Members Card */}
          <div className="py-24 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 ">
                  Our team{" "}
                </h2>
              </div>
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-8 max-w-xl mx-auto md:max-w-3xl lg:max-w-full">
                <div className="block group md:col-span-2 lg:col-span-1 ">
                  <div className="relative mb-6">
                    <img
                      src="https://pagedone.io/asset/uploads/1696238374.png"
                      alt="Antonio"
                      className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                    Antonio Roberto{" "}
                  </h4>
                  <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                    Founder
                  </span>
                </div>
                <div className="block group md:col-span-2 lg:col-span-1 ">
                  <div className="relative mb-6">
                    <img
                      src="https://pagedone.io/asset/uploads/1696238396.png"
                      alt="Patricia"
                      className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                    Patricia Angely{" "}
                  </h4>
                  <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                    Co-Founder
                  </span>
                </div>
                <div className="group group md:col-span-2 lg:col-span-1">
                  <div className="relative mb-6">
                    <img
                      src="	https://pagedone.io/asset/uploads/1696238411.png"
                      alt="Jerom"
                      className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                    Jerom Bell{" "}
                  </h4>
                  <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                    Chairman
                  </span>
                </div>
                <div className="block group md:col-span-2 lg:col-span-1 md:col-start-2 lg:col-start-4">
                  <div className="relative mb-6">
                    <img
                      src="	https://pagedone.io/asset/uploads/1696238425.png"
                      alt="Yasmine"
                      className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                    Yasmine Tano{" "}
                  </h4>
                  <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                    CEO
                  </span>
                </div>
                <div className="block group min-[500px]:col-span-2 mx-auto md:col-span-2 lg:col-span-1 ">
                  <div className="relative mb-6">
                    <img
                      src="https://pagedone.io/asset/uploads/1696238446.png"
                      alt="Martin"
                      className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                    Martin Darbys
                  </h4>
                  <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                    Product Manager
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Table */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Team Members
          </h2>
          {/* Tabs for different roles */}
          <div className="flex space-x-4 mb-4">
            {["All Members", "Managers", "Developers", "Designers"].map(
              (tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${
                    index === 0
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-purple-600 hover:text-white transition duration-300`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                </button>
              )
            )}
            <button className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
              Export as CSV
            </button>
          </div>

          {/* Search, Filter, and Date Range */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-300">
              Filter
            </button>
            <div className="p-2 border border-gray-300 rounded-lg">
              01 Jan 25 - 27 Jan 25
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    "ID",
                    "Name",
                    "Role",
                    "Email",
                    "Phone Number",
                    "Joined Date",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CurrentAdminTeamFilter.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {member.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.role}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {member.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="inline-flex">
              <button
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <span>«</span>
              </button>
              {Array.from(
                { length: totalFilteredPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 leading-tight border ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={() =>
                  handlePageChange(
                    Math.min(totalFilteredPages, currentPage + 1)
                  )
                }
                disabled={currentPage === totalFilteredPages}
              >
                <span>»</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
