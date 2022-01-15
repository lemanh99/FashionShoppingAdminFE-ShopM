
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, deleteCoupon, getListCoupon, updateCoupon } from "../../actions/Shop/coupon.action";
import { createNotification, deleteNotification, getListNotification, updateNotification } from "../../actions/Shop/notification.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import axiosIntance from "../../helpers/axios";
import { convert_date_from_timestamp } from "../../utils/datetime";
import AddCouponModal from "./CouponComponent/AddCouponModal";
import DeleteCouponModal from "./CouponComponent/DeleteCouponModal";
import ViewCouponModal from "./CouponComponent/ViewCouponModal";
import AddNotificationModal from "./NotificationComponent/AddNotificationModal";
import DeleteNotificationModal from "./NotificationComponent/DeleteNotificationModal";
import ViewNotificationModal from "./NotificationComponent/ViewNotificationModal";

const Coupon = () => {
    const coupons = useSelector((state) => state.shop.coupons);

    const [listCoupon, setListCoupon] = useState([]);
    const [couponCode, setCouponCode] = useState(null);
    const [price, setPrice] = useState(null);
    const [quatity, setQuatity] = useState(null);
    const [expriedDate, setExpriedDate] = useState(null);
    const [limited, setLimited] = useState(true);
    const [couponId, setCouponId] = useState(null);
    const [couponItem, setCouponItem] = useState({});
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
        dispatch(getListCoupon());
    }, [dispatch]);

    useEffect(() => {
        setListCoupon(coupons)
    }, [coupons]);
    //show Modal

    const handleShowAdd = () => {
        setCouponCode(null);
        setPrice(null);
        setQuatity(null);
        setExpriedDate(null);
        setLimited(true)
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        const coupon = {
            "coupon_code": couponCode,
            "price": price,
            "limited": limited,
            "quantity": quatity,
            "expiration_date": expriedDate ? expriedDate.getTime() : expriedDate,
            "product_id": null
        }
        dispatch(createCoupon(coupon));
        setShowAdd(false);
        setCouponCode(null);
        setPrice(null);
        setQuatity(null);
        setExpriedDate(null);
        setLimited(true)
    };

    const handleShowView = (e) => {
        const id = e.target.value
        setCouponId(id);
        const coupon = coupons.find((notifi) => Number(notifi.id) === Number(id));
        setCouponCode(coupon.coupon_code);
        setPrice(coupon.price);
        setQuatity(coupon.quantity);
        setExpriedDate(coupon.expiration_date ? new Date(coupon.expiration_date) : coupon.expiration_date);
        setLimited(coupon.limited);
        setShowView(true);
    };
    const handleCloseView = () => {
        setCouponCode(null);
        setPrice(null);
        setQuatity(null);
        setExpriedDate(null);
        setLimited(true)
        setCouponId(null)
        setEdit(false);
        setShowView(false);
    };

    const handleShowDelete = (event) => {
        const id = event.target.value;
        const notfication = coupons.find((notifi) => Number(notifi.id) === Number(id));
        if (notfication) {
            setCouponItem(notfication);
            setCouponCode(notfication.coupon_code);
            setShowDeleteModal(true);
        }
    };

    const handleCloseDelete = (e) => {
        dispatch(deleteCoupon(couponItem.id))
        setCouponItem({});
        setCouponCode(null)
        setShowDeleteModal(false);
    };

    const handleCloseEdit = () => {
        const coupon = {
            "id": couponId,
            "group_id": couponCode,
            "price": price,
            "quatity": quatity,
            "expiration_date": expriedDate ? expriedDate.getTime() : expriedDate,
            "limited": true
        }
        dispatch(updateCoupon(coupon));
        setShowAdd(false);
        setCouponId(null);
        setCouponCode(null);
        setPrice(null);
        setQuatity(null);
        setExpriedDate(null);
        setLimited(true)
        setEdit(false);
        setShowView(false);
    };
    useEffect(() => {
        settingDatatable();
    }, [listCoupon])

    const rowTable = (couponList) => {
        const all = [];
        for (let [index, coupon] of couponList.entries()) {
            var element = {
                sr: index + 1,
                coupon_code: coupon.coupon_code,
                price: coupon.price,
                quantity: coupon.quantity,
                limited: coupon.limited ? "x" : null,
                expiration_date: convert_date_from_timestamp(coupon.expiration_date),
                btn: (
                    <div className="row" style={{ width: '86px' }}>
                        <div class="project-actions  text-center">
                            <button
                                class="btn btn-primary  btn-sm"
                                value={coupon.id}
                                onClick={handleShowView}
                                style={{ marginRight: "5px" }}
                            >
                                <i class="fas fa-folder fa-lg" style={{ pointerEvents: 'none' }}></i>
                            </button>
                            <button
                                class="btn btn-danger btn-sm"
                                value={coupon.id}
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
                    label: "Coupon code",
                    field: "coupon_code",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Quatity",
                    field: "quantity",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Limited",
                    field: "limited",
                    sort: "asc",
                    width: 150,
                },
                {
                    label: "Expiration Date",
                    field: "expiration_date",
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
            rows: rowTable(listCoupon),
        };
        setDataTable(data)
    }


    return (
        <Layout price="Setting payment">
            <section className="quatity">
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
                                            New A Coupon
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
            <AddCouponModal
                show={showAdd}
                handleClose={() => {
                    setShowAdd(false);
                    setCouponCode(null);
                    setPrice(null);
                    setQuatity(null);
                    setExpriedDate(null);
                    setLimited(true)
                }}
                onSubmit={handleCloseAdd}
                modalTitle={"Add Coupon"}
                price={price}
                setPrice={setPrice}
                quatity={quatity}
                setQuatity={setQuatity}
                expriedDate={expriedDate}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                setExpriedDate={setExpriedDate}
                limited={limited}
                setLimited={setLimited}
            />
            <ViewCouponModal
                show={showView}
                handleClose={handleCloseView}
                onSubmit={handleCloseEdit}
                modalTitle={"Coupon"}
                price={price}
                setPrice={setPrice}
                quatity={quatity}
                setQuatity={setQuatity}
                expriedDate={expriedDate}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                setExpriedDate={setExpriedDate}
                limited={limited}
                setLimited={setLimited}
                edit={edit}
                setEdit={setEdit}
            />
            <DeleteCouponModal
                show={showDeleteModal}
                handleClose={() => {
                    setShowDeleteModal(false);
                    setCouponItem({});
                    setCouponCode(null)
                }}
                modalprice={"Delete Coupon"}
                onSubmit={handleCloseDelete}
                name={couponCode}
            />
        </Layout>
    );
};

export default Coupon;
