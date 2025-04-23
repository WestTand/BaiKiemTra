import React from 'react';

const StudentItem = ({ student, onDelete, onEditStart, onSave, isEditing, form, onChange, onCancel }) => {
  return (
    <tr className="text-center">
      {isEditing ? (
        <>
          <td className="border px-6 py-3">
            <input
              type="text"
              name="ten"
              value={form.ten}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
          <td className="border px-6 py-3">
            <input
              type="text"
              name="lop"
              value={form.lop}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
          <td className="border px-6 py-3">
            <input
              type="number"
              name="tuoi"
              value={form.tuoi}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
          <td className="border px-6 py-3">
            <button
              onClick={() => onSave(student.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mr-2"
            >
              Lưu
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="border px-6 py-3">{student.ten}</td>
          <td className="border px-6 py-3">{student.lop}</td>
          <td className="border px-6 py-3">{student.tuoi}</td>
          <td className="border px-6 py-3">
            <button
              onClick={() => onEditStart(student)}
              className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition mr-2"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentItem;
