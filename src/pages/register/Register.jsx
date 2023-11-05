import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
	const username = useRef();
	const displayName = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const navigate = useNavigate();

	const validatePassword = () => {
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity("Password don't match");
		} else {
			passwordAgain.current.setCustomValidity("");
		}
	};
	const handleClick = async (e) => {
		console.log(`password: ${password.current.value} // passwordAgain: ${passwordAgain.current.value}`);
		e.preventDefault();
		//check password Again correct or not
		if (passwordAgain.current.value === password.current.value) {
			const user = {
				username: username.current.value,
				displayName: displayName.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post(process.env.REACT_APP_API_URL + "auth/register", user);
				navigate("/login");
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">ZenSocial</h3>
					<span className="loginDesc">Connect with friends and the world around you on ZenSocial</span>
				</div>
				<div className="loginRight">
					<form
						onSubmit={handleClick}
						className="loginBox"
					>
						<input
							placeholder="Username"
							ref={username}
							type="text"
							className="loginInput"
							required
							minLength="8"
						/>
						<input
							placeholder="Display Name"
							ref={displayName}
							type="text"
							className="loginInput"
							required
							minLength="3"
						/>
						<input
							placeholder="Email"
							ref={email}
							type="email"
							className="loginInput"
							required
						/>
						<input
							placeholder="Password"
							ref={password}
							type="password"
							className="loginInput"
							required
							minLength="8"
						/>
						<input
							placeholder="Password Again"
							ref={passwordAgain}
							type="password"
							className="loginInput"
							required
							minLength="8"
							onChange={validatePassword}
						/>
						<button
							className="loginButton"
							type="submit"
						>
							Sign Up
						</button>
						<Link
							to={"/login"}
							style={{ textAlign: "center" }}
						>
							<button className="loginRegister">Log into Account</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
