const UserIcon = (props) => {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 16a6.667 6.667 0 1 0 0-13.333A6.667 6.667 0 0 0 16 16ZM27.453 29.333C27.453 24.173 22.32 20 16 20c-6.32 0-11.453 4.173-11.453 9.333"
        stroke="#717171"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default UserIcon
