import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Login = () => {
	const email = useRef();
	const password = useRef();
	const { isFetching, error, dispatch } = useContext(AuthContext);
	const [loginCheck, setLoginCheck] = useState(true);

	const handleClick = (e) => {
		e.preventDefault();
		LoginCall({ email: email.current.value, password: password.current.value }, dispatch, setLoginCheck);
	};

	let loginWrongStyle = { height: "0" };
	if (!loginCheck) {
		loginWrongStyle = { height: "40px" };
	}

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">ZenSocial</h3>
					<span className="loginDesc">Connect with friends and the world around you on ZenSocial</span>
				</div>
				<div className="loginRight">
					<form
						className="loginBox"
						onSubmit={handleClick}
					>
						<input
							placeholder="Email"
							type="email"
							required
							className="loginInput"
							ref={email}
						/>
						<input
							placeholder="Password"
							type="password"
							required
							minLength="8"
							className="loginInput"
							ref={password}
						/>
						<button
							className="loginButton"
							type="submit"
							disabled={isFetching}
						>
							{isFetching ? (
								<CircularProgress
									color="inherit"
									size="20px"
								/>
							) : (
								"Log In"
							)}
						</button>
						<span
							className="loginWrong"
							style={loginWrongStyle}
						>
							Invalid email or password.
						</span>
						<span className="loginForgot">Forgot Password?</span>
						<Link
							to="register"
							className="loginRegisterLink"
						>
							<button
								className="loginRegister"
								disabled={isFetching}
							>
								{isFetching ? (
									<CircularProgress
										color="inherit"
										size="20px"
									/>
								) : (
									"Create A New Account"
								)}
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
