import React from "react";

function InputNum({ id,placeholder, value,setValue }) {
  // Fungsi untuk memblokir tombol up/down
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault(); // Mencegah perubahan nilai dengan tombol up/down
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Pastikan input hanya menerima angka dan tidak negatif
    if (/^\d*$/.test(value)) {
      setValue(value);
    }
  };

  return (
    <div>
      {/* Input field */}
      <input
        id={id}
        type="number"
        inputMode="numeric" // Memastikan keyboard numerik muncul di perangkat mobile
        placeholder={placeholder}
        className="border border-gray-300 px-4 py-2 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800 no-spinner"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Menambahkan event listener untuk memblokir tombol up/down
        min="0" // Memastikan nilai tidak negatif
        step="1" // Menghilangkan increment/decrement default
      />
    </div>
  );
}

export default InputNum;