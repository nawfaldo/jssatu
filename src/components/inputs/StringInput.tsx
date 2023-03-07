interface Props {
  placeholder: string;
  onChange: any;
  value: string;
}

const StringInput = ({ placeholder, onChange, value }: Props) => {
  return (
    <input
      className="w-full rounded border border-gray-300 py-2 px-3 font-light text-gray-800 !outline-none"
      type="text"
      placeholder={placeholder}
      onChange={(e: any) => onChange(e.target.value)}
      value={value}
    />
  );
};

export default StringInput;
