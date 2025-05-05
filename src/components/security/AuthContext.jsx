import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.clear(); 
    sessionStorage.clear(); 

    navigate("/");
  };
};
export default useLogout;