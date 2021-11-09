import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrand,
  deleteBrand,
  getListBrand,
  updateBrand,
} from "../../actions/Brand/brand.action";
import { getListCategory } from "../../actions/Category/category.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import { generatePublicUrl } from "../../urlConfig";
import AddBrandModal from "./components/AddBrandModal";
import DeleteBrandModal from "./components/DeleteBrandModal";
import EditBrandModal from "./components/EditBrandModal";

const Brand = () => {
  const brands = useSelector((state) => state.brand);
  const categories = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandImage, setBrandImage] = useState("");
  const [brand, setBrand] = useState({});
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //entries
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListBrand());
    dispatch(getListCategory());
  }, [dispatch]);
  useEffect(() => {
    setMessage(brands.messages);
  }, [brands.messages]);
  useEffect(() => {
    setListBrand(brands.listBrand);
    setListCategory(categories.listCategory);
  }, [brands.listBrand, categories.listCategory]);
  //show Modal

  const handleShowAdd = () => {
    setName("");
    setBrandImage("");
    setCategoryId("");
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("brandImage", brandImage);
    form.append("categoryId", categoryId);
    dispatch(addBrand(form));
    setShowAdd(false);
    setName("");
    setBrandImage("");
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    const cat = brands.listBrand.find((brand) => brand._id === id);
    setBrand(cat);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    dispatch(deleteBrand(brand._id));
    setBrand({});
    setShowDeleteModal(false);
    setMessage("Delete Successfully!");
  };
  const handleShowEdit = (event) => {
    const id = event.target.value;
    const cat = brands.listBrand.find((brand) => brand._id === id);
    setBrand(cat);
    setName(cat.name);
    setBrandImage(cat.brandImage);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    const form = new FormData();
    form.append("id", brand._id);
    form.append("name", name);
    form.append("categoryId", categoryId);
    form.append("brandImage", brandImage);
    dispatch(updateBrand(form));
    setBrand({});
    setName("");
    setBrandImage("");
    setShowEditModal(false);
    setMessage("Edit Successfully!");
  };

  const selectList = (event) => {
    const value = event.target.value;
    setSelected(value);
    if (value) {
      const list = brands.listBrand.filter(
        (brand) => brand.categoryId === value
      );
      list ? setListBrand(list) : setListBrand([]);
    } else {
      setListBrand(brands.listBrand);
    }
    setSearch("");
  };
  //selected
  const searchList = (event) => {
    const value = event.target.value;
    setSearch(value);
    let listSearch;
    listSearch = brands.listBrand.filter((brand) =>
      selected
        ? brand.categoryId === selected &&
          brand.name.toLowerCase().includes(value.toLowerCase())
        : brand.name.toLowerCase().includes(value.toLowerCase())
    );
    setListBrand(listSearch);
  };

  //row table
  const rowTable = (brands) => {
    const all = [];
    for (let [index, brand] of brands.entries()) {
      let cat = categories.listCategory.find(
        (category) => category._id === brand.categoryId
      );
      var element = {
        sr: index + 1,
        name: brand.name,
        category: cat ? cat.name : null,
        image: (
          <img
            src={generatePublicUrl(brand.brandImage)}
            alt={brand.brandImage}
            width="50"
            height="50"
          ></img>
        ),
        btnEdit: (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-warning "
              value={brand._id}
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
              value={brand._id}
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
        label: "Category",
        field: "category",
        sort: "asc",
        width: 200,
      },
      {
        label: "Image",
        field: "image",
        sort: "asc",
        width: 50,
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
    rows: rowTable(listBrand),
  };

  return (
    <Layout title="Manage brand">
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
                      New A brand
                    </button>
                  </div>
                  <div style={{ float: "right" }}>
                    <select
                      className="form-control "
                      value={selected}
                      style={{ backgroundColor: "#e9ecef" }}
                      onChange={(e) => selectList(e)}
                    >
                      <option value="">Select Category</option>
                      cat
                      {listCategory
                        ? listCategory.map((category) => (
                            <option value={category._id}>
                              {category.name}
                            </option>
                          ))
                        : null}
                      <option value="">All</option>
                    </select>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      brands.error !== "" ? (
                        <Notification type="danger" message={message} />
                      ) : (
                        <Notification type="success" message={message} />
                      )
                    ) : null}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "-80px" }}>
                  <div className="col-lg-12">
                    <div className="" style={{ float: "right" }}>
                      <div className="card-body">
                        <div className="input-group">
                          <div class="input-group-append">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search name"
                              value={search}
                              onChange={(e) => {
                                searchList(e);
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
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
                      // barReverse
                      noBottomColumns
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>

      <AddBrandModal
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Brand"}
        name={name}
        setName={setName}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        listBrand={listBrand}
        brandImage={brandImage}
        listCategory={listCategory}
        setBrandImage={setBrandImage}
      />
      <DeleteBrandModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setBrand({});
        }}
        modalTitle={"Delete Brand"}
        onSubmit={handleCloseDelete}
        brandDelete={brand}
      />
      <EditBrandModal
        show={showEditModal}
        handleClose={() => {
          setShowEditModal(false);
          setBrand({});
        }}
        onSubmit={handleCloseEdit}
        modalTitle={"Edit brand"}
        name={name}
        setName={setName}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        brandImage={brandImage}
        setBrandImage={setBrandImage}
        listCategory={listCategory}
        listBrand={listBrand}
        s
      />
    </Layout>
  );
};

export default Brand;
