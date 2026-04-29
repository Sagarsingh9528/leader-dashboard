const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;