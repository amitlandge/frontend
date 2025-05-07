import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivate = () => {
  const { isLogin } = useSelector((state) => state.user);

  return (
    <div>
      {isLogin ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="/form" />
      )}
    </div>
  );
};

export default UserPrivate;
