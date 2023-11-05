import React, { useContext } from "react";
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);

	const handleLogOut = () => {
		localStorage.removeItem("userLoggedIn");
		window.location.replace("/");
	};

	return (
		<div className="topbarContainer">
			{/* Logo */}
			<div className="topbarLeft">
				<Link
					to="/"
					style={{ textDecoration: "none" }}
				>
					<span className="logo">ZenSocial</span>
				</Link>
			</div>
			{user && (
				<>
					{/* Search Bar at center */}
					<div className="topbarCenter">
						<div className="searchbar">
							<SearchIcon className="searchIcon" />
							<input
								type="text"
								placeholder="Search for friend, post or video"
								className="searchInput"
							/>
						</div>
					</div>
					{/*Links and notification icons */}
					<div className="topbarRight">
						<div className="topbarLinks">
							<Link to="/">
								<span className="topbarLink">Homepage</span>
							</Link>
							<button
								className="topbarLink"
								id="logOutButton"
								onClick={handleLogOut}
							>
								Log Out
							</button>
						</div>
						<div className="topbarIcons">
							<div className="topbarIconItem">
								<PersonIcon />
								<span className="topbarIconBadge">2</span>
							</div>
							<div className="topbarIconItem">
								<ChatIcon />
								<span className="topbarIconBadge">1</span>
							</div>
							<div className="topbarIconItem">
								<NotificationsIcon />
								<span className="topbarIconBadge">5</span>
							</div>
						</div>
						<Link to={`/profile/${user.username}`}>
							<img
								src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
								alt=""
								className="topbarImg"
							/>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default Topbar;
