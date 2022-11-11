interface IconProps {
  strokeWidth?: number;
  iconClassName?: string;
  [key: string]: any;
}

const Search = ({
  strokeWidth = 1.5,
  iconClassName = "w-6 h-6",
  ...props
}: IconProps) => {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        className={iconClassName}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
};

const icons = {
  Search,
};
export default icons;
