import React from "react";
import "./rightbar.css";
import HomeRightbar from "./HomeRightbar/HomeRightbar";
import ProfileRightbar from "./ProfileRightbar/ProfileRightbar";

const Rightbar = ({ user }) => {
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">{user ? <ProfileRightbar user={user} /> : <HomeRightbar />}</div>
		</div>
	);
};

export default Rightbar;
