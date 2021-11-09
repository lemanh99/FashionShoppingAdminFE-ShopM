import React from "react";

const Notification = (props) => {
  return (
    <>
      {props.message !== "" ? (
        <>
          <div
            className="flashes"
            style={{marginBottom: "-0.5rem" }}
          >
            <div class={"alert alert-" + props.type} style={{textAlign: "center"}}>{props.message}</div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Notification;
