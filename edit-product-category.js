import React, { useState, useEffect, useRef } from "react";
import Header from "../../shared/layout/header/header";
import Footer from "../../shared/layout/footer/footer";
import Checkbox from "@material-ui/core/Checkbox";
import { TreeSelect } from "antd";
import "antd/dist/antd.css";
import { IMAGE_PATH_SECOND } from "../../shared/config/config";

import $ from "jquery";
import "bootstrap-fileinput";
import {
  getProductCategory,
  getProductCategoryById,
  updateProductCategory,
} from "../../shared/functionality/service/index";
//   Treenode

const { TreeNode } = TreeSelect;

function ProductCategoryEdit(props) {
  const [parent, setParent] = useState();
  const [getDataFromProductCategory, setGetDataFromProductCategory] =
    useState();
  const [getFromProductCategory, setDataFromProductCategory] = useState();
  const [image, setImage] = useState();
  const [checkBox, setCheckBox] = useState("false");
  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState();
  const [loder, setLoder] = useState(false);
  $("#input-id").fileinput();
  var {
    pro_cat_name,
    pro_cat_slug_first,
    pro_cat_meta_title,
    pro_cat_meta_tag,
    pro_cat_meta_descripion,
  } = useRef();
  const checkedHandeler = (e) => {
    console.log(e.target.checked);
    setCheckBox(e.target.checked ? "true" : "false");
  };
  const editProductCategory = (e) => {
    e.preventDefault();
    setLoder(true);
    console.log(pro_cat_name.value);
    var data = new FormData();
    data.append("file", image);
    data.append("pro_cat_name", pro_cat_name.value);
    data.append("pro_cat_slug_first", pro_cat_slug_first.value);
    data.append("pro_cat_meta_title", pro_cat_meta_title.value);
    data.append("pro_cat_meta_tag", pro_cat_meta_tag.value);
    data.append("pro_cat_meta_descripion", pro_cat_meta_descripion.value);
    data.append("pro_cat_check", checkBox);
    data.append("pro_cat_parent", parent === "Parent" ? "" : parent);
    // console.log(data);
    updateProductCategory(data)
      .then((result) => {
        if (result.status) {
          console.log(result);
          // document.getElementById("product-category").reset();
          setMessageError("");
          setMessage(result.message);
          // setState(false);
          setLoder(false);

          window.scrollTo(0, 0);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setMessageError(result.message);
          setMessage("");
          // setState(false);
          setLoder(false);

          window.scrollTo(0, 0);
          setTimeout(() => {
            setMessageError("");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // with plugin options
  $("#input-id").fileinput({
    uploadUrl: "/path/to/your-upload-api",
    previewFileType: "any",
  });

  //   Treenode
  // var state = {
  //   value: undefined,
  // };

  const onChange = (value) => {
    console.log(value);

    setParent(value);
  };
  const fileUploadHandler = (e) => {
    e.preventDefault();
    console.log("file", e.target.files[0]);
    setImage(e.target.files[0]);
    document.getElementById("image").style.display = "none";
  };
  useEffect(() => {
    getProductCategory()
      .then((result) => {
        setGetDataFromProductCategory(result.data);
        if (result.data) {
          // console.log(result.data);

          const id = localStorage.getItem("product-category");
          if (id) {
            getProductCategoryById(id)
              .then((res) => {
                setParent(res.data.pro_cat_name);
                console.log("res", res);
                setCheckBox(res.data.pro_cat_check);
                setImage(res.data.pro_cat_file);
                setDataFromProductCategory(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            props.history.push("/categories-manager");
          }
        } else {
          props.history.push("/categories-manager");
        }

        // console.log("kfddfkdf", test(result.data));

        // Listdata(result.data).then((data) => {
        //   console.log("fdkjdfjfndjjn", data);
        // });
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header props={props} />
      <div className="page-wrap">
        <div className="page-head">
          <a href="/categories-manager" className="back-btn">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </a>
          <h2 className="page-title">Edit Category</h2>
        </div>
        <form onSubmit={editProductCategory}>
          <div className="page-body">
            {message ? (
              <span className="alert alert-success w-100">
                {message ? message : ""}
              </span>
            ) : (
              ""
            )}
            {messageError ? (
              <span className="alert alert-danger w-100">
                {messageError ? messageError : ""}
              </span>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-lg-12">
                <div className="card common-card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Category <span className="required">*</span>
                          </label>
                          {console.log("parent", parent)}
                          <TreeSelect
                            showSearch
                            style={{ width: "100%" }}
                            value={parent ? parent : "Parent"}
                            dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
                            placeholder="Select Category"
                            allowClear
                            treeDefaultExpandAll
                            treeData={getDataFromProductCategory}
                            onChange={onChange}
                          >
                            <TreeNode value="" title="Parent"></TreeNode>
                          </TreeSelect>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Name<span className="required">*</span>
                            <span className="required"></span>
                          </label>
                          <input
                            ref={(input) => (pro_cat_name = input)}
                            defaultValue={
                              getFromProductCategory
                                ? getFromProductCategory.pro_cat_name
                                : ""
                            }
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Slug <span className="required">*</span>
                          </label>
                          <input
                            ref={(input) => (pro_cat_slug_first = input)}
                            defaultValue={
                              getFromProductCategory
                                ? getFromProductCategory.pro_cat_slug_first
                                : ""
                            }
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-label">
                          Slug 2 <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div> */}
                      {/* <div className="col-lg-6">
                      <div className="form-group hide-upload-bar">
                        <label className="form-label">
                          Thumbnail Image <span className="required">*</span>
                        </label>
                        <input
                          id="input-id"
                          name="input-b3[]"
                          type="file"
                          className="file"
                          // multiple
                          data-show-upload="false"
                          data-show-caption="true"
                          data-browse-on-zone-click="true"
                          data-msg-placeholder="Select {files} for upload..."
                        ></input>
                      </div>
                    </div> */}
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Meta Title <span className="required">*</span>
                          </label>
                          <input
                            ref={(input) => (pro_cat_meta_title = input)}
                            defaultValue={
                              getFromProductCategory
                                ? getFromProductCategory.pro_cat_meta_title
                                : ""
                            }
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Meta Tags <span className="required">*</span>
                          </label>
                          <input
                            ref={(input) => (pro_cat_meta_tag = input)}
                            defaultValue={
                              getFromProductCategory
                                ? getFromProductCategory.pro_cat_meta_tag
                                : ""
                            }
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="form-label">
                            Meta Description <span className="required">*</span>
                          </label>
                          <textarea
                            ref={(input) => (pro_cat_meta_descripion = input)}
                            defaultValue={
                              getFromProductCategory
                                ? getFromProductCategory.pro_cat_meta_descripion
                                : ""
                            }
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-check-label mb-0"
                            for="flexCheckDefault"
                          >
                            <input
                              // ref={(input) => (pro_cat_check = input)}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkBox === "true" ? true : false}
                              onChange={checkedHandeler}
                              id="flexCheckDefault"
                            />
                            Featured
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group hide-upload-bar">
                          <label className="form-label">
                            Image <span className="required">*</span>
                          </label>
                          <input
                            id="input-id"
                            name="input-b3[]"
                            type="file"
                            className="file"
                            // multiple
                            data-show-upload="false"
                            data-show-caption="true"
                            data-browse-on-zone-click="true"
                            data-msg-placeholder="Select {files} for upload..."
                            onChange={fileUploadHandler}
                          />
                          <img
                            id="image"
                            src={
                              getFromProductCategory
                                ? `${IMAGE_PATH_SECOND}${getFromProductCategory.pro_cat_file.substring(
                                    getFromProductCategory.pro_cat_file.lastIndexOf(
                                      "/"
                                    ) + 1,
                                    getFromProductCategory.pro_cat_file.length
                                  )}`
                                : ""
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="btn-wrap">
                          {loder ? (
                            <button
                              type="submit"
                              className="main-btn"
                              // onClick={fetchData}
                              disabled={loder}
                            >
                              {loder && (
                                <i
                                  className="fa fa-refresh fa-spin"
                                  style={{ marginRight: "5px" }}
                                />
                              )}
                              {loder && <span>Loading...</span>}
                              {/* {!loading && <span>Login</span>} */}
                            </button>
                          ) : (
                            <button type="submit" className="main-btn">
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
export default ProductCategoryEdit;
