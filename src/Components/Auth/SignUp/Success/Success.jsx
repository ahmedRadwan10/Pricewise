import { useSelector } from "react-redux";
/*for test */
const Success = () => {
  const success = useSelector(({ authState }) => authState.signUpSuccess);

  if (success) {
    return <h1 style={{ margin: "100px" }}>success SignUp</h1>;
  } else return <h1 style={{ margin: "100px" }}>not register yet</h1>;
};
export default Success;
