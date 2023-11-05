import axios from "axios";

export const LoginCall = async (userCredential, dispatch, setLoginCheck) => {
	dispatch({ type: "LOGIN_START" });
	setLoginCheck(true);
	try {
		const res = await axios.post(process.env.REACT_APP_API_URL + "/auth/login", userCredential);
		//temporary store user details in localStorage. To be used in AuthContext as initial State
		localStorage.setItem("userLoggedIn", JSON.stringify(res.data));
		dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
	} catch (err) {
		dispatch({ type: "LOGIN_FAILURE", payload: err });
		setLoginCheck(false);
	}
};
