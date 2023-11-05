import React, { useContext, useRef, useState } from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

const Share = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);
	const desc = useRef();
	const [file, setFile] = useState(null);

	const submitHandler = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		};
		console.log(file);
		if (file) {
			const data = new FormData(); //empty html form data
			const fileName = Date.now() + file.name;
			//for some reason need to append filename first then only file, if not will get error
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName; //post filename later to mongoDB
			try {
				await axios.post(process.env.REACT_APP_API_URL + "/upload", data); //post file to our local folder
			} catch (error) {
				console.log(error);
			}
		}

		try {
			await axios.post(process.env.REACT_APP_API_URL + "/posts", newPost);
			window.location.reload();
		} catch (error) {}
	};

	// const handleCancel = () => {
	// 	mediaFileUpload

	// }

	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
						alt=""
						className="shareProfileImg"
					/>
					<input
						type="text"
						className="shareInput"
						placeholder={"What's in your mind " + user.displayName + "?"}
						ref={desc}
					/>
				</div>
				<hr className="shareHr" />
				{file && (
					<div className="shareImgContainer">
						<img
							src={URL.createObjectURL(file)}
							alt=""
							className="shareImg"
						/>
						<CancelIcon
							className="shareCancel"
							onClick={() => setFile(null)}
						/>
					</div>
				)}
				<form
					className="shareBottom"
					onSubmit={submitHandler}
				>
					<div className="shareOptions">
						<label
							htmlFor="file"
							className="shareOption"
						>
							<PermMediaIcon
								htmlColor="#ff7675"
								className="shareIcon"
							/>
							<span className="shareOptionText">Photo</span>
							<input
								type="file"
								id="file"
								accept=".png, .jpg, .jpeg"
								value="" //empty value so that can re-fire again at each re-render after cancel img
								onChange={(e) => setFile(e.target.files[0])}
								style={{ display: "none" }}
							/>
						</label>
						<div className="shareOption">
							<LabelIcon
								htmlColor="#0984e3"
								className="shareIcon"
							/>
							<span className="shareOptionText">Tag</span>
						</div>
						<div className="shareOption">
							<RoomIcon
								htmlColor="#00cec9"
								className="shareIcon"
							/>
							<span className="shareOptionText">Location</span>
						</div>
						<div className="shareOption">
							<EmojiEmotionsIcon
								htmlColor="#fdcb6e"
								className="shareIcon"
							/>
							<span className="shareOptionText">Feelings</span>
						</div>
					</div>
					<button
						className="shareButton"
						type="submit"
					>
						Share
					</button>
				</form>
			</div>
		</div>
	);
};

export default Share;
