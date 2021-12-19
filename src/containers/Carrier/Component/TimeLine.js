import React, { useEffect, useState } from "react";
import ModalTimeLine from "./ModalTimeLine";
import Notification from "../../../components/UI/Notification";
const TimeLine = (props) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("");
    }, []);
    const {
        show,
        handleClose,
        modalTitle,
        onSubmit,
        trackingDetail,
    } = props;

    const getDate = (str) => {
        if (str) {
            return str.split(' ')[0];
        }

    }
    const getHours = (str) => {
        if (str) {
            return str.split(' ')[1];
        }
    }
    return (
        <ModalTimeLine
            show={show}
            handleClose={handleClose}
            onSubmit={message === "" ? onSubmit : null}
            modalTitle={modalTitle}
        >
            {trackingDetail ? (
                <div className="card-body">

                    <strong><i className="fas fa-book mr-1" /> Customer: {trackingDetail.customer_name}</strong>
                    <hr />
                    <strong><i className="fas fa-map-marker-alt mr-1" /> Email: {trackingDetail.customer_email}</strong>
                    <hr />
                    <strong><i className="fas fa-map-marker-alt mr-1" /> Phone number courier: {trackingDetail.courier_phone}</strong>
                    <hr />
                </div>
            ) : null}
            <div className="timeline timeline-inverse">
                {trackingDetail && trackingDetail.origin_info ? (trackingDetail.origin_info.trackinfo.map((tracking) => (
                    <>
                        {/* timeline time label */}
                        <div className="time-label">
                            <span className="bg-success">
                                {getDate(tracking.checkpoint_date)}
                            </span>
                        </div>

                        {/* /.timeline-label */}
                        {/* timeline item */}
                        <div>
                            <i className="fas fa-map-marker-alt bg-primary" />
                            <div className="timeline-item">
                                <span className="time"><i className="far fa-clock" /> {getHours(tracking.checkpoint_date)}</span>
                                <h3 className="timeline-header"><a>{tracking.location ? tracking.location : ("_")}</a></h3>
                                <div className="timeline-body">
                                    {tracking.tracking_detail}
                                </div>
                            </div>
                        </div>
                        {/* END timeline item */}
                        {/* timeline item */}
                    </>
                ))

                ) : null}
                {/* timeline time label */}
                <div className="time-label">
                    <span className="bg-success">
                        {trackingDetail && trackingDetail.origin_info ? (getDate(trackingDetail.origin_info.received_date)) : null}
                    </span>
                </div>

                {/* /.timeline-label */}
                {/* timeline item */}
                <div>
                    <i className="far fa-clock bg-gray" />
                    <div className="timeline-item">
                        <span className="time"><i className="far fa-clock" /> {trackingDetail && trackingDetail.origin_info ? (getHours(trackingDetail.origin_info.received_date)) : null}</span>
                        <h3 className="timeline-header"><a>ShopM</a></h3>
                        {/* <div className="timeline-body">
                            {tracking.tracking_detail}
                        </div> */}
                    </div>
                </div>
                {/* END timeline item */}
                {/* timeline item */}
                {/* <div>
                    <i className="far fa-clock bg-gray" />
                </div> */}
            </div>

        </ModalTimeLine>
    );
};

export default TimeLine;
