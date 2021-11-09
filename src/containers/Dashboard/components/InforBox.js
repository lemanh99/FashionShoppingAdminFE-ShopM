import React from "react";

const InforBox = (props) => {
  const { icon, background, title, value, type, percentage } = props;
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="info-box mb-3">
        <span className={`info-box-icon ${background} elevation-1`}>
          <i className={icon}></i>
        </span>
        <div className="info-box-content">
          <span className="info-box-text">{title}</span>
          <span className="info-box-number">{value}</span>
        </div>
        {type ? (
          type === "increase" ? (
            <span class="description-percentage text-success">
              <i class="fas fa-caret-up"></i>
              {percentage}%
            </span>
          ) : (
            <span class="description-percentage text-danger">
              <i class="fas fa-caret-down"></i>
              {percentage}%
            </span>
          )
        ) : null}
      </div>
      
    </div>
  );
};

export default InforBox;
