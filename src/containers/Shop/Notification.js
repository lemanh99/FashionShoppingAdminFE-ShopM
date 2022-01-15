
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeVisiblePaymentMethod, createPaymentMethod, deletePaymentMethod, getPaymentMethod, updatePaymentMethod } from "../../actions/Setting/payment.action";
import { changeVisibleNotification, createNotification, deleteNotification, getListNotification, updateNotification } from "../../actions/Shop/notification.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import axiosIntance from "../../helpers/axios";
import AddNotificationModal from "./NotificationComponent/AddNotificationModal";
import DeleteNotificationModal from "./NotificationComponent/DeleteNotificationModal";
import ViewNotificationModal from "./NotificationComponent/ViewNotificationModal";

const NotificationShop = () => {
    const notification = useSelector((state) => state.shop.notifications);

    const [listNotification, setListNotification] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [groupID, setGroupId] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [url, setUrl] = useState(null);
    const [visible, setVisible] = useState(true);
    const [notificationId, setNotificationId] = useState(null);
    const [notificationItem, setNotificationItem] = useState({});
    const [message, setMessage] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [dataTable, setDataTable] = useState([])
    const [edit, setEdit] = useState(false);

    const [showView, setShowView] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    //entries
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListNotification());
    }, [dispatch]);
    useEffect(() => {
        setListNotification(notification)
    }, [notification]);
    //show Modal

    const handleShowAdd = () => {
        setUserIds([]);
        setGroupId(null);
        setTitle(null);
        setContent(null);
        setUrl(null);
        setVisible(true)
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        const notification = {
            "user_ids": userIds,
            "group_id": groupID,
            "title": title,
            "content": content,
            "url": url,
            "visible": true
        }
        dispatch(createNotification(notification));
        setShowAdd(false);
        setUserIds([]);
        setGroupId(null);
        setTitle(null);
        setContent(null);
        setUrl(null);
        setVisible(true)
    };

    const handleShowView = (e) => {
        const id = e.target.value
        setNotificationId(id);
        const notification = listNotification.find((notifi) => Number(notifi.id) === Number(id));
        setUserIds([]);
        setGroupId(notification.group_id);
        setTitle(notification.title);
        setContent(notification.content);
        setUrl(notification.url);
        setVisible(notification.visible);
        setShowView(true);



    };
    const handleCloseView = () => {
        setUserIds([]);
        setGroupId(null);
        setTitle(null);
        setContent(null);
        setUrl(null);
        setVisible(true)
        setNotificationId(null)
        setEdit(false);
        setShowView(false);
    };

    const handleShowDelete = (event) => {
        const id = event.target.value;
        const notfication = listNotification.find((notifi) => Number(notifi.id) === Number(id));
        if (notfication) {
            setNotificationItem(notfication);
            setTitle(notfication.title);
            setShowDeleteModal(true);
        }
    };

    const handleCloseDelete = (e) => {
        dispatch(deleteNotification(notificationItem.id))
        setNotificationItem({});
        setTitle(null)
        setShowDeleteModal(false);
    };

    const handleCloseEdit = () => {
        const notification = {
            "id": notificationId,
            "user_ids": userIds,
            "group_id": groupID,
            "title": title,
            "content": content,
            "url": url,
            "visible": true
        }
        dispatch(updateNotification(notification));
        setShowAdd(false);
        setNotificationId(null);
        setUserIds([]);
        setGroupId(null);
        setTitle(null);
        setContent(null);
        setUrl(null);
        setVisible(true)
        setEdit(false);
        setShowView(false);
    };
    useEffect(() => {
        settingDatatable();
    }, [listNotification])

    const handTogleVisible = (e) => {
        e.preventDefault();
        const id = e.target.value;
        const pay = listNotification.find((notification) => Number(notification.id) === Number(id));
        if (pay) {
            const data = {
                "id": pay.id,
                "visible": !pay.visible,
            }
            dispatch(changeVisibleNotification(data));
        }

    }
    const handleSelected = (e) => {
        const value = e.target.value;
        e.preventDefault();
        if (value) {
            const notifi = notification.filter((notifi) => Number(notifi.group_id) === Number(value));
            setListNotification(notifi);
        }else{
            setListNotification(notification);
        }

    }
    const rowTable = (notificationList) => {
        const all = [];
        for (let [index, notification] of notificationList.entries()) {
            var element = {
                sr: index + 1,
                group: notification.group_id == 2 ? "Staff" : notification.group_id == 1 ? "super_admin" : "Customer",
                title: notification.title,
                content: notification.content,
                visible: (
                    <div className="form-group">
                        <div className="custom-control custom-switch">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`customSwitch${index}`}
                                checked={notification.visible}
                                value={notification.id}
                                onChange={(e) => { handTogleVisible(e) }} />
                            <label className="custom-control-label" htmlFor={`customSwitch${index}`}></label>
                        </div>
                    </div>
                ),
                btn: (
                    <div className="row" style={{ width: '86px' }}>
                        <div class="project-actions  text-center">
                            <button
                                class="btn btn-primary  btn-sm"
                                value={notification.id}
                                onClick={handleShowView}
                                style={{ marginRight: "5px" }}
                            >
                                <i class="fas fa-folder fa-lg" style={{ pointerEvents: 'none' }}></i>
                            </button>
                            <button
                                class="btn btn-danger btn-sm"
                                value={notification.id}
                                onClick={handleShowDelete}
                                style={{ marginRight: "5px" }}
                            >
                                <i class="fas fa-trash fa-lg" style={{ pointerEvents: 'none' }}></i>
                            </button>
                        </div>
                    </div>
                ),
            };
            all.push(element);
        }
        return all;
    };
    const settingDatatable = () => {
        const data = {
            columns: [
                {
                    label: "No.",
                    field: "sr",
                    sort: "asc",
                    width: 50,
                },
                {
                    label: "Group",
                    field: "group",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Title",
                    field: "title",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Content",
                    field: "content",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Visible",
                    field: "visible",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "",
                    field: "btn",
                    sort: "asc",
                    width: 200,
                },
            ],
            rows: rowTable(listNotification),
        };
        setDataTable(data)
    }


    return (
        <Layout title="Setting payment">
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <div class="card-title">
                                        <button
                                            className="btn btn-block bg-gradient-primary"
                                            onClick={handleShowAdd}
                                        >
                                            New A Notification
                                        </button>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <div className="row">
                                            <div className="col-md-6">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                                    </div>
                                </div>
                                <div className="row mt-3" style={{ marginBottom: "-50px", marginRight: "10px" }}>
                                    <div className="col-lg-12">
                                        <div className="float-right">
                                            <select className="custom-select" style={{ width: 'auto' }} data-sortorder onChange={(e) => { handleSelected(e) }}>
                                                <option value=""> Filter by group </option>
                                                <option value="2">Staff</option>
                                                <option value="3">Customer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card-body">
                                        <MDBDataTable
                                            entries={5}
                                            // displayEntries={false}
                                            entriesOptions={[5, 10, 15, 20, 25, 50]}
                                            searching={false}
                                            striped
                                            bordered
                                            hover
                                            fixed
                                            autoWidth={false}
                                            // barReverse
                                            noBottomColumns
                                            data={dataTable}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </section>
            <AddNotificationModal
                show={showAdd}
                handleClose={() => {
                    setShowAdd(false);
                    setUserIds([]);
                    setGroupId(null);
                    setTitle(null);
                    setContent(null);
                    setUrl(null);
                    setVisible(true)
                }}
                onSubmit={handleCloseAdd}
                modalTitle={"Add Notification method"}
                userIds={userIds}
                setUserIds={setUserIds}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                url={url}
                groupID={groupID}
                setGroupId={setGroupId}
                setUrl={setUrl}
                visible={visible}
                setVisible={setVisible}
            />
            <ViewNotificationModal
                show={showView}
                handleClose={handleCloseView}
                onSubmit={handleCloseEdit}
                modalTitle={"Notification"}
                userIds={userIds}
                setUserIds={setUserIds}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                url={url}
                groupID={groupID}
                setGroupId={setGroupId}
                setUrl={setUrl}
                visible={visible}
                setVisible={setVisible}
                edit={edit}
                setEdit={setEdit}
            />
            <DeleteNotificationModal
                show={showDeleteModal}
                handleClose={() => {
                    setShowDeleteModal(false);
                    setNotificationItem({});
                    setTitle(null)
                }}
                modalTitle={"Delete Notfication"}
                onSubmit={handleCloseDelete}
                name={title}
            />
        </Layout>
    );
};

export default NotificationShop;
