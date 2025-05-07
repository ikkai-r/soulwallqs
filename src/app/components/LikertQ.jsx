export default function LikertQ({ question, name, onChange }) {
    return (
      <div className="w-full flex flex-col gap-3">
        <p>{question}</p>
        <fieldset className="w-full flex flex-row items-center justify-center gap-5">
          <p>Strongly agree</p>
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
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
          <p>Strongly disagree</p>
        </fieldset>
      </div>
    );
  }
  