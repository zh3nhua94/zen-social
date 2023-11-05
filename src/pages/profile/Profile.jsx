import React, { useState, useEffect } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState([]);
	const username = useParams().username;
	console.log(username);

	useEffect(() => {
		setLoading(true);
		const fetchUser = async () => {
			try {
				const res = await axios.get(process.env.REACT_APP_API_URL + `/users?username=${username}`);
				setUser(res.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchUser();
		window.scrollTo(0, 0);
	}, [username, loading]);

	return (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.jpg"}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.displayName}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
