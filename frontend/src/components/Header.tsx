import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {

  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-emerald-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">WanderPhilia</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link className="flex items-center text-white px-3 font-bold hover:bg-emerald-600" to='/my-bookings'>My Bookings</Link>
              <Link className="flex items-center text-white px-3 font-bold hover:bg-emerald-600" to='/my-hotels'>My Hotels</Link>
              <SignOutButton />
              </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-emerald-600 px-3 font-bold hover:bg-emerald-200"
            >
              Sign In
            </Link>
          )}

        </span>
      </div>
    </div>
  );
};

export default Header;