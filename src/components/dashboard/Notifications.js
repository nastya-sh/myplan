import React from "react";
import moment from "moment";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title" data-e2e="title-notifications">
            Notifications
          </span>
          <ul className="ntifications">
            {notifications &&
              notifications.map((item, i) => {
                return (
                  <li key={item.id} data-e2e={`notification-${i}`}>
                    <span className="pink-text">{item.user} </span>
                    <span>{item.content}</span>
                    <div className="grey-text note-date">
                      {` ${moment(item.time.toDate()).fromNow()}`}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
