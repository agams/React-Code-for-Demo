import React, { useEffect, useState } from "react";
import Header from "../../shared/layout/header/header";
import Footer from "../../shared/layout/footer/footer";
import $ from "jquery";
import Nestable from "react-nestable";
import "../../assets/css/nestable.css";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import {
  deletetAlertService,
  getModuleService,
} from "../../shared/functionality/service/index";
// import { list_to_tree } from "./testformate";
import {
  AiOutlineDrag,
  AiFillCaretRight,
  AiFillCaretDown,
} from "react-icons/ai";
import {
  getProductCategory,
  activationProductCategory,
} from "../../shared/functionality/service/index";
import { Route } from "react-router";
const styles = {
  position: "relative",
  background: "WhiteSmoke",
  display: "flex",
};
const cssCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const handlerStyles = {
  width: "2rem",
  height: "100%",
  cursor: "pointer",
};

var items = [];
function CategoryManager(props) {
  const [collapseAll, setCollapseAll] = useState(false);
  const [table, setTable] = useState();
  const [showTable, setShowTable] = useState(false);
  const [enable, setEnable] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageError, setMessageError] = useState();
  const activetionHandler = (e) => {
    console.log("sjdsfjk", e.target.id);
    e.preventDefault();
    localStorage.setItem("product-category", e.target.id);
    // console.log(e.target.id);
    localStorage.setItem("clip-art", e.target.id);
    var setValue = e.target.checked === true ? "true" : "false";

    var data = {
      pro_cat_active: setValue,
    };
    console.log(data);
    activationProductCategory(data).then((result) => {
      if (result.status) {
        setMessageError("");
        setMessage(result.message);
        setShowTable(false);
        setEnable(!enable);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessageError(result.message);
        setMessage("");
        setTimeout(() => {
          setMessageError("");
        }, 3000);
      }
    });
  };
  const deleteHandler = (e) => {
    console.log("e.target.id", e.target.id);
    deletetAlertService("moduleListing", e.target.id);
  };
  const swapHandler = (e) => {
    e.preventDefault();
    console.log("swap", e);
  };
  const editClipArtsCategoryHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    localStorage.setItem("product-category", e.target.id);
    props.history.push({
      pathname: "/product-category-edit",
      id: e.target.id,
    });
  };
  const renderItem = (props) => {
    const { item, index, collapseIcon, handler } = props;
    // console.log("item", props);
    return (
      <div className="nestable-item-inn">
        <div className="handler-left">
          {/* {handler} */}
          {collapseIcon}
          <h4
            id={item._id}
            // draggable="true"
            // onDragExit={swapHandler}
            // onDragOver={swapHandler}
            // onDragOver={swapHandler}
            // onDrop={swapHandler}
          >
            {/* {item.pro_cat_name}  */}
            {index}
            {item.text}
          </h4>
        </div>
        {/* <div className="handler-center">
          <span>Active</span>
        </div> */}

        <div>
          <ul className="action-icon-list">
            <li id={item._id}>
              <a
                id={item._id}
                onClick={editClipArtsCategoryHandler}
                className="icon-btn"
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </a>
            </li>
            <li id={item._id}>
              <a
                href="#"
                id={item._id}
                className="icon-btn danger-btn"
                onClick={deleteHandler}
              >
                <i id={item._id} className="fa fa-trash" aria-hidden="true"></i>
              </a>
            </li>
            <li id={item._id}>
              <FormControlLabel
                id={item.pro_cat_active}
                className="success-switch switch-no-label"
                control={
                  <Switch
                    checked={item.pro_cat_active === "true" ? true : false}
                    id={item._id}
                    onChange={activetionHandler}
                    color="primary"
                  />
                }
              />
            </li>
          </ul>
        </div>
      </div>
    );
  };
  useEffect(() => {
    getProductCategory()
      .then(async (result) => {
        console.log("result.result", result.data);
        items = result.data;

        setTable("ojkkom");
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    getProductCategory()
      .then(async (result) => {
        console.log("result.result", result.data);
        items = result.data;

        setTable("ojkkom");
      })
      .catch((err) => {});
  }, [enable]);

  // const items = [
  //   {
  //     id: 0,
  //     text: "Lot A",

  //     children: [
  //       {
  //         id: 4,
  //         text: "Ouvrage",

  //         children: [
  //           {
  //             id: 12,
  //             text: "Une ressource",
  //           },
  //           {
  //             id: 13,
  //             text: "La main d'œuvre",
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     id: 2,
  //     text: "Lot B",

  //     children: [
  //       {
  //         id: 1,
  //         text: "Super Ouvrage",

  //         children: [
  //           {
  //             id: "2-1",
  //             text: "Ressource 1",
  //           },
  //           {
  //             id: "2-2",
  //             text: "Ouvrage",

  //             children: [
  //               { id: "toto", text: "Ressource truc" },
  //               { id: "toto2", text: "Ressource autre" },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  const Handler = () => {
    return (
      <div style={{ ...cssCenter, ...handlerStyles }}>
        <AiOutlineDrag />
      </div>
    );
  };
  const Collapser = ({ isCollapsed }) => {
    return (
      <div className="drop-arrow" style={{ ...cssCenter, ...handlerStyles }}>
        {isCollapsed ? (
          // <AiFillCaretRight className="drop-arrow" />
          <i class="fa fa-plus" aria-hidden="true"></i>
        ) : (
          // <AiFillCaretDown />
          <i class="fa fa-minus" aria-hidden="true"></i>
        )}
      </div>
    );
  };

  // const items = [
  //   {
  //     id: 2,
  //     text: "Lot A",

  //     children: [
  //       {
  //         id: 4,
  //         text: "Ouvrage",
  //         children: [
  //           {
  //             id: 4,
  //             text: "testr",
  //           },
  //         ],
  //       },

  //       {
  //         id: 12,
  //         text: "Une ressource",
  //         amount: 1,
  //       },
  //       {
  //         id: 13,
  //         text: "La main d'œuvre",
  //         amount: 1,
  //       },
  //     ],
  //   },

  //   {
  //     id: 1,
  //     text: "Lot B",

  //     children: [
  //       {
  //         id: 2,
  //         text: "Super Ouvrage",
  //       },
  //       {
  //         id: 1,
  //         text: "Super Ouvrage 2",
  //       },
  //     ],
  //   },
  // ];
  const moveToModuleCreate = () => {
    // console.log(props);
    props.history.push("/modulecreate");
    // /modulecreate
  };
  return (
    <>
      <Header props={props} />
      <div className="page-wrap">
        <div className="page-head d-f j-c-s-b">
          <h2 className="page-title">Category Listing</h2>
          <ul className="page-head-compo d-f a-i-c">
            <li>
              <a className="main-btn mini-btn" href="/product-category-add">
                Add
              </a>
            </li>
          </ul>
        </div>
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
                  <div className="module-list-wrap">
                    <Nestable
                      items={items}
                      renderItem={renderItem}
                      handler={<Handler />}
                      renderCollapseIcon={({ isCollapsed }) => (
                        <Collapser isCollapsed={isCollapsed} />
                      )}
                      collapsed={collapseAll}
                      // collapsed={true}
                      //onChange={(items) => console.log(items)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default CategoryManager;
