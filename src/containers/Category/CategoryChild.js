import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
    addCatgeory,
    deleteCategory,
    getListCategoryChild,
    getListCategory,
    updateCategory,
} from "../../actions/Category/category.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import EditCategoryModal from "./components/EditCategoryModal";

const CategoryChild = (props) => {

    const categories = useSelector((state) => state.categoryChild);
    const categorieParent = useSelector((state) => state.category)

    const [name, setName] = useState("");
    const [category, setCategory] = useState([]);
    const [listCategoryParent, setListCategoryParent] = useState([]);
    const [parentName, setParentName] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [message, setMessage] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const id = props.match.params.id


    const dispatch = useDispatch();
    useEffect(() => {
        if (!categories.loading) {
            dispatch(getListCategoryChild(id));
            dispatch(getListCategory());
        }
    }, []);
    useEffect(() => {
        setMessage(categories.messages);
        const cate = categorieParent.listCategory.find((category) => category.id === Number(id))
        setParentName(cate.category_name)
    });
    useEffect(() => {
        setListCategory(categories.listCategory);
        setListCategoryParent(categorieParent.listCategory);
    }, [categories.listCategory, categorieParent.listCategory]);
    //show Modal

    const handleShowAdd = () => {
        setName("");
        setShowAdd(true);
    };
    const handleCloseAdd = () => {
        const category = {
            "parent_category_id": id,
            "category_name": name
        }
        dispatch(addCatgeory(category)).then((e)=>{
            dispatch(getListCategoryChild(id));
        });
        setShowAdd(false);
        setName("");
    };

    const handleShowDelete = (event) => {
        const id = event.target.value;
        const cat = categories.listCategory.find((category) => category.id === Number(id));
        setCategory(cat);
        setShowDeleteModal(true);
    };

    const handleCloseDelete = () => {
        dispatch(deleteCategory(category.id));
        setCategory({});
        setShowDeleteModal(false);
        setMessage("Delete Successfully!");
    };
    const handleShowEdit = (event) => {
        const id = event.target.value;
        const cat = categories.listCategory.find((category) => category.id === Number(id));
        setCategory(cat);
        setName(cat.category_name);
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        const form = new FormData();
        form.append("id", category.id);
        form.append("category_name", name);
        dispatch(updateCategory(form)).then((e)=>{
            dispatch(getListCategoryChild(id));
        });;
        setCategory({});
        setName("");
        setShowEditModal(false);
        setMessage("Edit Successfully!");
    };
    // }
    const handerBack = (event) => {
        props.history.push("/manage-category")
    }

    //row table
    const rowTable = (categories) => {
        const all = [];
        for (let [index, category] of categories.entries()) {
            var element = {
                sr: index + 1,
                name: category.category_name,
                btnEdit: (
                    <div style={{ textAlign: "center" }}>
                        <button
                            type="button"
                            className="btn btn-warning "
                            value={category.id}
                            style={{ marginRight: "4px" }}
                            onClick={handleShowEdit}
                        >
                            Edit
                        </button>
                    </div>
                ),
                btnDelete: (
                    <div style={{ textAlign: "center" }}>
                        <button
                            type="button"
                            className="btn btn-danger"
                            value={category.id}
                            onClick={handleShowDelete}
                        >
                            Delete
                        </button>
                    </div>
                ),

                //   a
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
                label: "Name",
                field: "name",
                sort: "asc",
                width: 200,
            },
            {
                label: "Edit",
                field: "btnEdit",
                sort: "asc",
                width: 50,
            },
            {
                label: "Delete",
                field: "btnDelete",
                sort: "asc",
                width: 50,
            },
        ],
        rows: rowTable(listCategory),
    };
    return (
        <Layout title="Manage category">
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="card">

                                <div className="card-header">
                                    <div class="card-title">
                                        <button onClick={(e) => { handerBack(e) }}
                                            className="btn btn-block bg-gradient-primary"
                                        >
                                            Back
                                        </button>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <div className="row">
                                            <button
                                                className="btn btn-block bg-gradient-primary"
                                                onClick={handleShowAdd}
                                            >
                                                New A Category For {parentName}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                                        {message !== "" ? (
                                            categories.error !== "" ? (
                                                <Notification type="danger" message={message} />
                                            ) : (
                                                <Notification type="success" message={message} />
                                            )
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card-body">
                                        <MDBDataTable
                                            entries={5}
                                            entriesOptions={[5, 10, 15, 20, 25, 50]}
                                            // searching={false}
                                            striped
                                            bordered
                                            hover
                                            // barReverse
                                            noBottomColumns
                                            disableRetreatAfterSorting={true}
                                            paginationLabel={['Prev', 'Next']}
                                            data={data}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </section>
            <AddCategoryModal
                show={showAdd}
                handleClose={() => setShowAdd(false)}
                onSubmit={handleCloseAdd}
                modalTitle={"Add New Category"}
                name={name}
                setName={setName}
                listCategory={listCategory}
                parentCategory={listCategoryParent}
            // categoryImage={categoryImage}
            // setCategoryImage={setCategoryImage}
            // handleCategoryImage={handleCategoryImage}
            />
            <DeleteCategoryModal
                show={showDeleteModal}
                handleClose={() => {
                    setShowDeleteModal(false);
                    setCategory({});
                }}
                modalTitle={"Delete Category"}
                onSubmit={handleCloseDelete}
                categoryDelete={category}
            />
            <EditCategoryModal
                show={showEditModal}
                handleClose={() => {
                    setShowEditModal(false);
                    setCategory({});
                }}
                onSubmit={handleCloseEdit}
                modalTitle={"Edit Category"}
                name={name}
                setName={setName}
                // categoryImage={categoryImage}
                // setCategoryImage={setCategoryImage}
                listCategory={listCategory}
            />
        </Layout>
    );
};

export default CategoryChild;
