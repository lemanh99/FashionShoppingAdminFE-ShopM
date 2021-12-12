import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminById, getListAdmin, signup } from "../../actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import { MDBDataTable } from "mdbreact";
import AddAdminModal from "./Components/AddAdminModal";
import DeleteAdminModal from "./Components/DeleteAdminModal";

const ManageAdmin = () => {
  const manage_admin = useSelector((state) => state.manage_admin);
  const userCurrent = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listAdmin, setListAdmin] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminDelete, setAdminDelete] = useState({});
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAdmin());
    setMessage("");
  }, [dispatch]);

  useEffect(() => {
    setListAdmin(manage_admin.listAdmin);
  }, [manage_admin.listAdmin]);

  //Set Modal
  const handleShow = () => setShow(true);
  const handleShowDelete = (event) => {
    const id = event.target.value;
    const admin = manage_admin.listAdmin.find((admin) => admin._id === id);
    setAdminDelete(admin);
    setShowDeleteModal(true);
  };
  const handleClose = () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
    setShow(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setMessage("Register a new admin successfully!");
  };
  const handleCloseDelete = () => {
    dispatch(deleteAdminById(adminDelete._id));
    setAdminDelete({});
    setShowDeleteModal(false);
    setMessage("Delete Successfully!");
  };

  //Set table
  const rowTable = (listAdmin) => {
    const all = [];
    for (let [index, admin] of listAdmin.entries()) {
      var element = {
        sr: index + 1,
        email: admin.email,
        fullName: admin.full_name,
        role: admin.group_id == 1 ? "super-admin" : "member",
        btnButton: admin.group_id == 1 ?
          (<button type="button" className="btn  btn-dark" disabled>
            Delete
          </button>) : (admin.id != userCurrent.infor.id ?
            (
              <button
                type="button"
                className="btn  btn-danger"
                value={admin._id}
                onClick={handleShowDelete}
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn  btn-dark" disabled>
                Delete
              </button >
            ))
        // authenticate === "super-admin" ? (
        //   admin.role === "super-admin" ? (
        //     <button type="button" className="btn  btn-dark" disabled>
        //       Delete
        //     </button>
        //   ) : (
        //     <button
        //       type="button"
        //       className="btn  btn-danger"
        //       value={admin._id}
        //       onClick={handleShowDelete}
        //     >
        //       Delete
        //     </button>
        //   )
        // ) : (

        // ),
      };
      all.push(element);
    }
    return all;
  };
  const data = {
    columns: [
      {
        label: "No.",
        field: "sr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Full name",
        field: "fullName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Authenticate",
        field: "role",
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "btnButton",
        sort: "asc",
        width: 150,
      },
    ],
    rows: rowTable(listAdmin),
  };

  return (
    <Layout title="Manage admin">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShow}
                    >
                      New A Admin
                    </button>
                  </div>
                  {/* <h3 className="float-sm-right">MANAGE ADMIN</h3> */}
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      <Notification type="success" message={message} />
                    ) : null}
                  </div>
                </div>
                <div className="card-body">
                  {manage_admin.loading ? (
                    <div class="overlay">
                      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
                    </div>
                  ) : (
                    <MDBDataTable
                      className=""
                      entriesOptions={[5, 10, 15, 20, 25, 50]}
                      striped
                      bordered
                      noBottomColumns
                      data={data}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddAdminModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Admin"}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        listAdmin={listAdmin}
      />
      <DeleteAdminModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        modalTitle={"Delete Admin"}
        onSubmit={handleCloseDelete}
        adminDelete={adminDelete}
        setAdminDelete={setAdminDelete}
      />
    </Layout>
  );
};

export default ManageAdmin;
