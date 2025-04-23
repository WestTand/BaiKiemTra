import React, { useState } from 'react';

const StudentItem = ({ student, onDelete, onEditStart, onSave, isEditing, form, onChange, onCancel }) => {
  return (
    <tr className="text-center">
      {isEditing ? (
        <>
          <td className="border px-4 py-2">
            <input
              type="text"
              name="ten"
              value={form.ten}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </td>
          <td className="border px-4 py-2">
            <input
              type="text"
              name="lop"
              value={form.lop}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </td>
          <td className="border px-4 py-2">
            <input
              type="number"
              name="tuoi"
              value={form.tuoi}
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </td>
          <td className="border px-4 py-2 space-x-2">
            <button
              onClick={() => onSave(student.id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="border px-4 py-2">{student.ten}</td>
          <td className="border px-4 py-2">{student.lop}</td>
          <td className="border px-4 py-2">{student.tuoi}</td>
          <td className="border px-4 py-2 space-x-2">
            <button
              onClick={() => onEditStart(student)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
