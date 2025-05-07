export default function SSQ({ question, name, onChange }) {
    return (
      <div className="w-full flex flex-col gap-3 border-b-2 border-gray-300 pb-5">
        <p>{question}</p>
        <fieldset className="w-full flex flex-row items-center justify-center gap-5">
          {['None', 'Slight', 'Moderate', 'Severe'].map((value) => (
            <div key={value} className="flex flex-row items-center">
              <input
                id={`${name}-${value}`}
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              />
              <label
                htmlFor={`${name}-${value}`}
                className="block ms-2 text-sm font-medium text-gray-900"
              >
                {value}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    );
  }
  