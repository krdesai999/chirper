import { contentActions } from "../utils/PageManager";
import "./Header.css";

function Header( {contentManager, contentDispatch} ) {
  return (
    <div className="header">
      <div className="headerContent flex justify-between">
        <div>Header</div>
        <div className="flex my-1">
          <div
            className="cursor-pointer btn"
            onClick={() => contentDispatch({
              type: contentActions.tologin,
            })}
          >
            Login
          </div>
          <div
            className="ml-1 mr-1 cursor-pointer btn"
            onClick={() => contentDispatch({
              type: contentActions.toSignUp,
            })}
          >
            SignUp
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
