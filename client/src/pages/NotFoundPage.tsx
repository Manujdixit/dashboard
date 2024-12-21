import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold ">Oops! 404</h1>
      <p className="m-4 text-lg text-gray-600 ">
        The page you're looking for doesn't exist.
      </p>
      <NavLink to={"/students"}>
        <Button>Go to Home</Button>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
