import React, { useState, useEffect } from 'react';
import StudentItem from '../components/StudentItem';

const StudentList = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [
      { id: 1, ten: "Nguyễn Văn A", lop: "12A1", tuoi: 18 },
      { id: 2, ten: "Trần Thị B", lop: "11B2", tuoi: 17 },
      { id: 3, ten: "Lê Văn C", lop: "10C3", tuoi: 16 }
    ];
  });

  const [form, setForm] = useState({ ten: '', lop: '', tuoi: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

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

  const resetStudents = () => {
    const defaultStudents = [
      { id: 1, ten: "Nguyễn Văn A", lop: "12A1", tuoi: 18 },
      { id: 2, ten: "Trần Thị B", lop: "11B2", tuoi: 17 },
      { id: 3, ten: "Lê Văn C", lop: "10C3", tuoi: 16 }
    ];
    setStudents(defaultStudents);
  };

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const filteredStudents = students.filter((sv) =>
    sv.ten.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedClass === '' || sv.lop === selectedClass)
  );

  const classOptions = [...new Set(students.map((sv) => sv.lop))];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Danh sách sinh viên</h2>

      {/* Tìm kiếm và lọc lớp */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả lớp</option>
          {classOptions.map((lop) => (
            <option key={lop} value={lop}>{lop}</option>
          ))}
        </select>
      </div>

      {/* Form thêm sinh viên */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Họ tên</label>
          <input
            type="text"
            name="ten"
            value={form.ten}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập họ tên"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Lớp</label>
          <input
            type="text"
            name="lop"
            value={form.lop}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập lớp"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Tuổi</label>
          <input
            type="number"
            name="tuoi"
            value={form.tuoi}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tuổi"
          />
        </div>
        <div className="flex items-end gap-4">
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Thêm sinh viên
          </button>
        </div>
      </div>

      {/* Nút reset danh sách */}
      <div className="mt-6">
        <button
          onClick={resetStudents}
          className="w-full bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Reset danh sách
        </button>
      </div>

      {/* Bảng sinh viên */}
      <table className="w-full table-auto border border-gray-300 mt-6 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-6 py-3 text-left text-gray-600">Tên</th>
            <th className="border px-6 py-3 text-left text-gray-600">Lớp</th>
            <th className="border px-6 py-3 text-left text-gray-600">Tuổi</th>
            <th className="border px-6 py-3 text-left text-gray-600">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onEditStart={startEditing}
              onSave={handleSave}
              isEditing={editingId === student.id}
              form={form}
              onChange={handleChange}
              onCancel={() => setEditingId(null)}
            />
          ))}
          {!filteredStudents.length && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">Không có sinh viên nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
