import React, { useState, useEffect } from "react";
import Header from "../../shared/layout/header/header";
import Footer from "../../shared/layout/footer/footer";
import Checkbox from "@material-ui/core/Checkbox";
import { TreeSelect } from "antd";
import "antd/dist/antd.css";
import {
  getProductCategory,
  addProductCategory,
} from "../../shared/functionality/service/index";
import $ from "jquery";
import "bootstrap-fileinput";
import { useForm } from "react-hook-form";
import * as types from "../../shared/config/types";

//   Treenode

const { TreeNode } = TreeSelect;

function ProductCategoryAdd(props) {
  const [state, setState] = useState("Parent");
  const [pro_cat_check, setPro_cat_check] = useState("false");
  const [getDataFromProductCategory, setGetDataFromProductCategory] =
    useState();
  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState();
  const [upload_file, set_Upload_File] = useState();
  const [loder, setLoder] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  $("#input-id").fileinput();

  // with plugin options
  $("#input-id").fileinput({
    uploadUrl: "/path/to/your-upload-api",
    previewFileType: "any",
  });
  const Listdata = (data) => {
    return <li>{data.pro_cat_name}</li>;
  };

  useEffect(() => {
    getProductCategory()
      .then((result) => {
        setGetDataFromProductCategory(result.data);
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
  const checkBoxHandler = (e) => {
    console.log(e.target.checked);
    setPro_cat_check(`${e.target.checked}`);
  };
  const onChange = (value) => {
    console.log("value", value);

    setState(value);
  };
  const fileUploadHandler = (e) => {
    console.log("file", e.target.files);
    set_Upload_File(e.target.files[0]);
  };
  const addProductCategoryHandler = (event) => {
    console.log(event);
    setLoder(true);
    // data = {
    //   ...data,
    //   pro_cat_active: "true",
    //   pro_cat_parent: state === "Parent" ? "" : state,
    //   file: upload_file,
    //   pro_cat_check: pro_cat_check,
    // };
    var data = new FormData();
    data.append("file", upload_file);
    data.append("pro_cat_name", event.pro_cat_name);
    data.append("pro_cat_slug_first", event.pro_cat_slug_first);
    data.append("pro_cat_meta_title", event.pro_cat_meta_title);
    data.append("pro_cat_meta_tag", event.pro_cat_meta_tag);
    data.append("pro_cat_meta_descripion", event.pro_cat_meta_descripion);
    data.append("pro_cat_check", pro_cat_check);
    data.append("pro_cat_active", "true");
    data.append("pro_cat_parent", state === "Parent" ? "" : state);
    addProductCategory(data)
      .then((result) => {
        if (result.status) {
          console.log(result);
          document.getElementById("product-category").reset();
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
        console.log("err", err);
      });
    // console.log(data);
  };

  return (
    <>
      <Header props={props} />
      <div className="page-wrap">
        <div className="page-head">
          <a href="/categories-manager" className="back-btn">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </a>
          <h2 className="page-title">Add Category</h2>
        </div>
        <form
          id="product-category"
          onSubmit={handleSubmit(addProductCategoryHandler)}
        >
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
                          <TreeSelect
                            showSearch
                            style={{ width: "100%" }}
                            value={state}
                            dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
                            placeholder="Select Category"
                            allowClear
                            treeDefaultExpandAll
                            treeData={getDataFromProductCategory}
                            onChange={onChange}
                          >
                            <TreeNode value="" title="Parent" TreeSelect>
                              Parent
                            </TreeNode>
                            {/* <test /> */}
                            {/* {console.log("testtesttesttest", test())} */}
                            {/* {getDataFromProductCategory
                            ? getDataFromProductCategory.map((data) => {
                                console.log(data);
                                return (
                                  <TreeNode
                                    value={data._id}
                                    title={data.pro_cat_name}
                                  >
                                    {data.children.length > 0
                                      ? data.children.map((child) => {
                                          console.log(
                                            "chigffggfld",
                                            child.children
                                          );
                                          return (
                                            <TreeNode
                                              value={child._id}
                                              title={child.pro_cat_name}
                                            ></TreeNode>
                                          );
                                        })
                                      : ""}
                                  </TreeNode>
                                );

                                // if (data.children.length > 0) {
                                //   console.log("data.children", data.children);
                                // }
                              })
                            : ""} */}
                            {/* <TreeNode value="Men clothing" title="Men clothing">
                            <TreeNode value="Jeans" title="Jeans">
                              <TreeNode value="T-shirt" title="T-shirt" />
                              <TreeNode value="Shirt" title="your leaf" />
                            </TreeNode>
                            <TreeNode value="parent 1-0" title="parent 1-0">
                              <TreeNode value="leaf1" title="my leaf" />
                              <TreeNode value="leaf2" title="your leaf" />
                            </TreeNode>
                            <TreeNode value="parent 2-0" title="parent 1-0">
                              <TreeNode value="leaf3" title="my leaf" />
                              <TreeNode value="leaf4" title="your leaf" />
                            </TreeNode>
                            <TreeNode value="parent 1-1" title="parent 1-1">
                              <TreeNode
                                value="sss"
                                title={<b style={{ color: "#08c" }}>sss</b>}
                              />
                            </TreeNode>
                          </TreeNode> */}
                          </TreeSelect>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Name <span className="required">*</span>
                            <span className="required"></span>
                          </label>
                          <input
                            {...register("pro_cat_name", {
                              required: types.F_NAME_VALIDATION,
                            })}
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger text-capitalize  mt-1 d-inline-block">
                            {errors.pro_cat_name
                              ? errors.pro_cat_name.message
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Slug <span className="required">*</span>
                          </label>
                          <input
                            {...register("pro_cat_slug_first", {
                              required: types.SLUG_VALIDATION,
                            })}
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger text-capitalize  mt-1 d-inline-block">
                            {errors.pro_cat_slug_first
                              ? errors.pro_cat_slug_first.message
                              : ""}
                          </span>
                        </div>
                      </div>
                      {/* <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-label">
                          Slug 2 <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    */}
                      <div className="col-lg-6">
                        <div className="form-group hide-upload-bar">
                          <label className="form-label">
                            Image <span className="required">*</span>
                          </label>
                          <input
                            {...register("file", {
                              required: types.FILE_VALIDATION,
                            })}
                            id="input-id"
                            name="input-b3[]"
                            type="file"
                            className="file"
                            accept="image/,.png, .jpeg, .jpg"
                            // multiple
                            data-show-upload="false"
                            data-show-caption="true"
                            data-browse-on-zone-click="true"
                            data-msg-placeholder="Select {files} for upload..."
                            onChange={fileUploadHandler}
                          />
                          <span className="text-danger text-capitalize  mt-1 d-inline-block">
                            {errors.file ? errors.file.message : ""}
                          </span>
                        </div>
                      </div>
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
                            {...register("pro_cat_meta_title", {
                              required: types.TITLE_VALIDATION,
                            })}
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger text-capitalize  mt-1 d-inline-block">
                            {errors.pro_cat_meta_title
                              ? errors.pro_cat_meta_title.message
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">
                            Meta Tags <span className="required">*</span>
                          </label>
                          <input
                            {...register("pro_cat_meta_tag", {
                              required: types.TAG_VALIDATION,
                            })}
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger text-capitalize  mt-1 d-inline-block">
                            {errors.pro_cat_meta_tag
                              ? errors.pro_cat_meta_tag.message
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="form-label">
                            Meta Description <span className="required">*</span>
                          </label>
                          <textarea
                            {...register("pro_cat_meta_descripion", {
                              required: types.TAG_VALIDATION,
                            })}
                            className="form-control"
                          ></textarea>
                          <span className="text-danger text-capitalize  mt-1 d-inline-block">
                            {errors.pro_cat_meta_descripion
                              ? errors.pro_cat_meta_descripion.message
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-check-label mb-0"
                            for="flexCheckDefault"
                          >
                            <input
                              onClick={checkBoxHandler}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            Featured
                          </label>
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
export default ProductCategoryAdd;
