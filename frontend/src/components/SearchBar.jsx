function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search employees...",
  options = [],
  buttonText = "Search",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2"
    >
      {options.length > 0 ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
        />
      )}

      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold px-5 py-3 rounded-xl"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default SearchBar;
