import React, { useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, ten: "Nguyễn Văn A", lop: "12A1", tuoi: 18 },
    { id: 2, ten: "Trần Thị B", lop: "11B2", tuoi: 17 },
    { id: 3, ten: "Lê Văn C", lop: "10C3", tuoi: 16 }
  ]);

  const [form, setForm] = useState({ ten: '', lop: '', tuoi: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
        id: Date.now(),
        ten: form.ten,
        lop: form.lop,
        tuoi: parseInt(form.tuoi)
      };
      setStudents([...students, newStudent]);
      setForm({ ten: '', lop: '', tuoi: '' });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const startEditing = (student) => {
    setEditingId(student.id);
    setForm({ ten: student.ten, lop: student.lop, tuoi: student.tuoi });
  };

  const handleSave = (id) => {
    setStudents(students.map(sv =>
      sv.id === id ? { ...sv, ten: form.ten, lop: form.lop, tuoi: parseInt(form.tuoi) } : sv
    ));
    setEditingId(null);
    setForm({ ten: '', lop: '', tuoi: '' });
  };

  const filteredStudents = students.filter(sv =>
    sv.ten.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Danh sách sinh viên</h2>

      {/* Tìm kiếm */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-1/2"
        />
      </div>

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
          {filteredStudents.map((sv) => (
            <tr key={sv.id} className="text-center">
              {editingId === sv.id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="ten"
                      value={form.ten}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="lop"
                      value={form.lop}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      name="tuoi"
                      value={form.tuoi}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleSave(sv.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Huỷ
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2">{sv.ten}</td>
                  <td className="border px-4 py-2">{sv.lop}</td>
                  <td className="border px-4 py-2">{sv.tuoi}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => startEditing(sv)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(sv.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Không có sinh viên nào phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
