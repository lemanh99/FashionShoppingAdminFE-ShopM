import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from 'moment';
import { getNotificationUser } from "../../actions/Admin/notification_user.action";
import { convert_date_from_timestamp } from "../../utils/datetime";
import './header.css'

const NotificationHeader = (props) => {
  const notification = useSelector((state) => state.notificationUser);
  // State variabls
  const [showCount, setShowCount] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [data, setData] = useState([])
  const [raedIndex, setReadIndex] = useState(0);
  const ref = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotificationUser())
  }, [])

  useEffect(() => {
    if (notification && notification.notifications) {
      setData(notification.notifications.item)
      setMessageCount(notification.notifications.number_not_read)
      if (notification.notifications.number_not_read > 0) {
        setShowCount(true)
      } else {
        setShowCount(false)
      }
    }
  }, [notification])

  const getDayDiff = timestamp => {
    let a = moment();
    let b = moment(timestamp);
    let diff = a.diff(b, 'year');
    if (diff === 0) {
      diff = a.diff(b, 'month');
      if (diff === 0) {
        diff = a.diff(b, 'days');
        if (diff === 0) {
          diff = a.diff(b, 'hour');
          if (diff === 0) {
            diff = a.diff(b, 'minute');
            if (diff === 0) {
              diff = a.diff(b, 'second');
              return `${diff} second before`;
            } else {
              return `${diff} minute before`;
            }
          } else {
            return `${diff} hour before`;
          }
        } else {
          return `${diff} day before`;
        }
      } else {
        return convert_date_from_timestamp(timestamp);
      }
    } else {
      return convert_date_from_timestamp(timestamp);
    }
  };


  return (
    <>
      <ul className="navbar-nav ml-auto">
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell" />
            <span className="badge badge-warning navbar-badge">{messageCount}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" ref={ref}>
            <span className="dropdown-item dropdown-header">{messageCount} Notifications</span>

            {
              data && data.length > 0 ?
                data.map((message, index) =>
                (
                  <>
                    <div className="dropdown-divider" />
                    <a href="#" className="dropdown-item">
                      <i className="fas fa-envelope mr-2" /> <b>{message.title}</b>
                      <span className="float-right text-muted text-sm">{getDayDiff(message.created_at)}</span>
                      <br /> <div className="content-notification" >{message.content}</div>
                    </a>
                  </>
                )) : (null)
            }

            {/* // <div className="dropdown-divider" />
            // <a href="#" className="dropdown-item">
            //   <i className="fas fa-users mr-2" /> 8 friend requests
            //   <span className="float-right text-muted text-sm">12 hours</span>
            // </a>
            // <div className="dropdown-divider" />
            // <a href="#" className="dropdown-item">
            //   <i className="fas fa-file mr-2" /> 3 new reports
            //   <span className="float-right text-muted text-sm">2 days</span>
            // </a> */}
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">

          </a>
        </li>
      </ul>

    </>
  );
};

export default NotificationHeader;
