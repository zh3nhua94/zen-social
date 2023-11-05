import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//temporary user for development without login
const tempUser = {
	_id: "651d1bb5b370468f6248761e",
	username: "jameyoakley",
	email: "jamey@gmail.com",
	password: "$2b$10$DYo/rzyVBvQIuvWLgvJEr.lB2hhx3xDVbPMAYoQREcJucjEiPGJC6",
	profilePicture: "person/z3.jpg",
	coverPicture: "post/3.jpeg",
	followers: ["651d1c1fb370468f62487620"],
	followings: [],
	isAdmin: false,
	createdAt: { $date: { $numberLong: "1696406453288" } },
	updatedAt: { $date: { $numberLong: "1696575218581" } },
	__v: { $numberInt: "0" },
	displayName: "Jamey Oakley",
	desc: "Welcome to my profile page!",
	city: "Kuala Lumpur",
	from: "Malaysia",
	relationship: "2",
};

let LoggedIn = {};
if (localStorage.getItem("userLoggedIn") !== "null") {
	//localStorage is set in apiCalls.js from client side
	LoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
}

//initial state everything is empty
const INITIAL_STATE = {
	user: localStorage.getItem("userLoggedIn") ? LoggedIn : null,
	isFecthing: false,
	error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	//useReducer(reducer, initial-state)
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
