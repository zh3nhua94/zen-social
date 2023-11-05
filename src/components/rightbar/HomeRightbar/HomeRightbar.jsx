import React from "react";
import Online from "../../online/Online";
import { Users } from "../../../dummyData";

const HomeRightbar = () => {
	return (
		<>
			<div className="birthdayContainer">
				<img
					src="/assets/gift.png"
					alt=""
					className="birthdayImg"
				/>
				<span className="birthdayText">
					<b>Pola Foster</b> and <b>3 other people</b> have a birthday today
				</span>
			</div>
			<img
				src="/assets/ad3.jpg"
				alt=""
				className="rightbarAd"
			/>
			<h4 className="rightbarTitle">Online Friends</h4>
			<ul className="rightbarFriendList">
				{Users.map((u) => (
					<Online
						key={u.id}
						user={u}
					/>
				))}
			</ul>
		</>
	);
};

export default HomeRightbar;
