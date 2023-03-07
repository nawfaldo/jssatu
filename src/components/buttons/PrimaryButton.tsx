interface Props {
  placeholder: string;
  onClick: any;
  bg: any;
  disabled: any;
}

const PrimaryButton = ({ placeholder, onClick, bg, disabled }: Props) => {
  return (
    <button
      className={`${bg} w-full rounded py-1.5 px-3 font-medium text-white shadow`}
      onClick={onClick}
      disabled={disabled}
    >
      {placeholder}
    </button>
  );
};

export default PrimaryButton;
