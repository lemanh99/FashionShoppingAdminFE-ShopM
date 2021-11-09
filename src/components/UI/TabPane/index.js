import React from "react";
import Notification from "../Notification";

const TabPaneNew = (props) => {
  return (
    <div className="card-body">
      <div className="tab-content">
        {props.message ? (
          <div className="card">
            <div className="row justify-content-center">
              <Notification type={props.type} message={props.message} />
            </div>
          </div>
        ) : null}
        {props.children}
      </div>
    </div>
  );
};

export default TabPaneNew;
