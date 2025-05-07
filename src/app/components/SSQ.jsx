export default function SSQ({ question, name, onChange, value }) {
    return (
      <div className="w-full flex flex-col gap-3 border-b-2 border-gray-300 pb-5">
        <p>{question}</p>
        <fieldset className="w-full flex flex-row items-center justify-center gap-5">
          {['None', 'Slight', 'Moderate', 'Severe'].map((val) => (
            <div key={val} className="flex flex-row items-center">
              <input
                id={`${name}-${val}`}
                type="radio"
                name={name}
                value={val}
                checked={String(val) === String(value)}
                onChange={onChange}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              />
              <label
                htmlFor={`${name}-${val}`}
                className="block ms-2 text-sm font-medium text-gray-900"
              >
                {val}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    );
  }
  