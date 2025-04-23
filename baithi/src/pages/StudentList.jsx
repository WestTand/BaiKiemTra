import React, { useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([
    { ten: "Nguyễn Văn A", lop: "12A1", tuoi: 18 },
    { ten: "Trần Thị B", lop: "11B2", tuoi: 17 },
    { ten: "Lê Văn C", lop: "10C3", tuoi: 16 }
  ]);

  const handleDelete = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Danh sách sinh viên</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Lớp</th>
            <th className="border px-4 py-2">Tuổi</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{sv.ten}</td>
              <td className="border px-4 py-2">{sv.lop}</td>
              <td className="border px-4 py-2">{sv.tuoi}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Không có sinh viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
