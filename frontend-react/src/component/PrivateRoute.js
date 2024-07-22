import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { AuthURL } from "./axios/AxiosInstance";

const PrivateRoute = ({ component }) => {

  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { authState, authDispatch } = useContext(AuthContext);
  

  useEffect(() => {

    const loginURL = '/auth/sign-in';

    const checkAuth = async () => {
      if( !authState.isAuth ) {

        if( accessToken != '' ) {
          await AuthURL.post('/verify.php', {
            token : accessToken
          })
          .then(function (response) {
            //console.log(response);
            const responseData = response.data;
  
            if( responseData.status == 'success' ) {
              authDispatch({type: 'update', payload:{ userdata: accessToken, isAuth: true }});
            } else {
              return navigate(loginURL);
            }
          })
          .catch(function (error) {
            return navigate(loginURL);
            console.log(error);
          });
        } else {
          return navigate(loginURL);
        }
      }
    }

    checkAuth();
  }, []);
 
  return component()
};
export default PrivateRoute;