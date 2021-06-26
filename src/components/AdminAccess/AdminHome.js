import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createArticles, getCategories, createCategory } from "./adminApi";
import { Container } from "@material-ui/core";
import "./AdminHome.css";

function AddProduct() {
  const [values, setValues] = useState({
    tile: "",
    description: "",
    postedBy: "",
    categories: [],
    category: "",
    source: "",
    sourceName: "",
    image: "",
    loading: false,
    error: "",
    createArticle: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    title,
    description,
    postedBy,
    categories,
    source,
    sourceName,
    loading,
    error,
    createdArticle,
    formData,
  } = values;
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const handleChangeCategory = (e) => {
    setCategoryError("");
    setName(e.target.value);
  };
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
      // console.log(data)
    });
  };

  useEffect(() => {
    init();
  }, []);
  // console.log(values)
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;

    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };
  const clickSubmitCategory = (e) => {
    e.preventDefault();
    setCategoryError("");
    setSuccess(false);
    createCategory(
      localStorage.getItem("userID"),
      localStorage.getItem("token"),
      { name }
    ).then((data) => {
      console.log(data);
      if (data.error) {
        setCategoryError(data.error);
      } else {
        setCategoryError("");
        setSuccess(true);
        init();
        setName("");
      }
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createArticles(
      localStorage.getItem("userID"),
      localStorage.getItem("token"),
      formData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          source: "",
          sourceName: "",
          postedBy: "",
          image: "",
          loading: false,
          createdArticle: data.name,
          category: "",
        });
      }
    });
  };

  const showSuccessCategory = () => {
    if (success) {
      return <h3 className="text-success">created successfully</h3>;
    }
  };

  const showErrorCategory = () => {
    if (categoryError) {
      return <h3 className="text-danger">Category Name should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/" className="text-warning">
        Back to Home
      </Link>
    </div>
  );

  const newCategoryForm = () => (
    <form onSubmit={clickSubmitCategory}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChangeCategory}
          value={name}
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const newPostForm = () => {
    return (
      <>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            color: "darkgray",
          }}
        >
          Create a News Article
        </h2>
        <div className="form__container">
          <form className="mb-3" onSubmit={clickSubmit}>
            <h5>Post Photo</h5>
            <div className="form-group">
              <label className="btn btn-secondary">
                <input
                  onChange={handleChange("image")}
                  type="file"
                  className="photo"
                  accept="image/*"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="text-muted">
                <h5>Title</h5>
              </label>
              <input
                onChange={handleChange("title")}
                type="text"
                className="form-control"
                value={title}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                <h5>Description</h5>
              </label>
              <textarea
                onChange={handleChange("description")}
                className="form-control"
                value={description}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                <h5>Author Name</h5>
              </label>
              <input
                onChange={handleChange("postedBy")}
                className="form-control"
                value={postedBy}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                <h5>Category</h5>
              </label>
              <select
                onChange={handleChange("category")}
                type="text"
                className="form-control"
              >
                <option className="bg-secondary text-white">
                  Please Select{" "}
                </option>
                {categories &&
                  categories.map((c, i) => (
                    <option
                      key={i}
                      className="bg-secondary text-white"
                      value={c._id}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label className="text-muted">
                <h5>Source Link</h5>
              </label>
              <input
                onChange={handleChange("source")}
                className="form-control"
                value={source}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">
                <h5>Source </h5>
              </label>
              <input
                onChange={handleChange("sourceName")}
                className="form-control"
                value={sourceName}
                required
              />
            </div>
            <button className="btn btn-outline-primary">Create Article</button>
          </form>
        </div>

        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            color: "darkgray",
          }}
        >
          Create a New Category
        </h2>
        <div className="form__container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {showSuccessCategory()}
              {showErrorCategory()}
              {newCategoryForm()}
              {goBack()}
            </div>
          </div>
        </div>
      </>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createdArticle ? "" : "none" }}
      >
        <h2>{`${createdArticle}`} is created!</h2>
      </div>
    );
  };
  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>loading...</h2>
      </div>
    );

  return (
    <div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
