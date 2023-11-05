import React from 'react'
import './sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import { Users } from '../../dummyData'
import CloseFriend from '../closeFriend/CloseFriend';


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <CalendarMonthIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show more</button>
        <hr className='sidebarHr' />
        <h4 className="closeFriendTitle">Close Friends</h4>
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar