import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerContent flex justify-between">
        <div>Header</div>
        <div className="flex my-1">
          <div className="cursor-pointer btn">Login</div>
          <div className="ml-1 mr-1 cursor-pointer btn">SignUp</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
