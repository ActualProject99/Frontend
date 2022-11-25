function ArrowLeft({ _width = 2 }) {
    return (
      <svg
        className="w-6 h-6 "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={_width}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    );
  }
  export default ArrowLeft;