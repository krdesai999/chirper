import Blogs from "./blogs";
import LoginSignup from "./LoginSignup";

export default function Content({ pageManager, pageDispatch }) {
  console.log(pageManager.loggedIn);
  console.log(pageManager.currentContent);
  return (
    <div className="content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        description="burger_symbol_option"
        className="w-6 h-6 absolute md:hidden left-0 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      {!pageManager.loggedIn ? (
        <LoginSignup page={pageManager.currentContent} />
      ) : (
        <Blogs />
      )}
    </div>
  );
}
