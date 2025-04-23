import React, { useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, ten: "Nguyễn Văn A", lop: "12A1", tuoi: 18 },
    { id: 2, ten: "Trần Thị B", lop: "11B2", tuoi: 17 },
    { id: 3, ten: "Lê Văn C", lop: "10C3", tuoi: 16 }
  ]);

  const [form, setForm] = useState({ ten: '', lop: '', tuoi: '' });

  const handleDelete = (id) => {
    setStudents(students.filter((sv) => sv.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (form.ten && form.lop && form.tuoi) {
      const newStudent = {
        id: Date.now(), // tạo id duy nhất
        ten: form.ten,
        lop: form.lop,
        tuoi: parseInt(form.tuoi)
      };
      setStudents([...students, newStudent]);
      setForm({ ten: '', lop: '', tuoi: '' }); // reset form
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Danh sách sinh viên</h2>

      {/* Form thêm sinh viên */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block mb-1 font-medium">Họ tên</label>
          <input
            type="text"
            name="ten"
            value={form.ten}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Nhập họ tên"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Lớp</label>
          <input
            type="text"
            name="lop"
            value={form.lop}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Nhập lớp"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tuổi</label>
          <input
            type="number"
            name="tuoi"
            value={form.tuoi}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Nhập tuổi"
          />
        </div>
        <div>
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Thêm sinh viên
          </button>
        </div>
      </div>

      {/* Bảng sinh viên */}
      <table className="w-full table-auto border border-gray-300 mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Tên</th>
            <th className="border px-4 py-2">Lớp</th>
            <th className="border px-4 py-2">Tuổi</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv.id} className="text-center">
              <td className="border px-4 py-2">{sv.ten}</td>
              <td className="border px-4 py-2">{sv.lop}</td>
              <td className="border px-4 py-2">{sv.tuoi}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(sv.id)}
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
