import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import NoMatch from "./pages/nomatch/NoMatch";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<div className="App">
			<Routes>
				<Route path="/">
					<Route
						index
						element={user ? <Home /> : <Login />}
					/>
					<Route
						path="login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						path="register"
						element={user ? <Navigate to="/" /> : <Register />}
					/>
					<Route
						path="profile/:username"
						element={!user ? <Navigate to="/" /> : <Profile />}
					/>
					<Route
						path="*"
						element={<NoMatch />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
