import React, { useEffect, useState } from "react";
import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
import "./Admin.scss";

const ModifyProduct = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isAdmin = userInfo.role === "admin";

  const location = useLocation();

  const [product, setProduct] = useState();
  const [errorMessage, seterrorMessage] = useState("");
  const { categories } = useSelector((state) => state.productList);

  const [category, setcategorie] = useState("");
  const [labo, setlabo] = useState("");
  const [nom, setnom] = useState("");
  const [picture, setphoto] = useState("");
  const [prix, setprix] = useState("");
  const [achat, setachat] = useState("");

  const [subcategory, setsub] = useState("");

  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  useEffect(() => {
    if (location?.state?.product) {
      setProduct(location.state.product);
      console.log(location.state.product);
      setcategorie(location.state.product?.category || "");
      setlabo(location.state.product?.labo || "");
      setnom(location.state.product?.nom || "");
      setphoto(location.state.product?.picture || "");
      setprix(location.state.product?.prix || "");
      setachat(location.state.product?.achat || "");

      setsub(location.state.product?.subCategory || "");
    }
  }, [location]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Voulez vous modifier ce produit ?") == true) {
      let catIndex = categories.findIndex((item) => item.nom === category);
      if (catIndex >= 0) {
        if (categories[catIndex].subCategories.includes(subcategory)) {
          const newProduct = {
            category,
            labo,
            nom,
            picture,
            prix,
            subcategory,
          };
          console.log(newProduct);
        } else {
          if (
            window.confirm(
              `attention ! cela va creer une nouvelle sous category : ${subcategory}`
            ) == true
          ) {
            const newProduct = {
              category,
              labo,
              nom,
              picture,
              prix,
              subcategory,
            };
            console.log(newProduct);
          }
        }
      } else {
        if (
          window.confirm(
            `attention ! cela va creer une nouvelle category : ${category}`
          ) == true
        ) {
          const newProduct = {
            category,
            labo,
            nom,
            picture,
            prix,
            subcategory,
          };
          console.log(newProduct);
        }
      }
    }
  };
  const categoryPickerHandler = (choice) => {
    setcategorie(choice);
    let catIndex = categories.findIndex((item) => item.nom === choice);
    setSelectedSubCategories(categories[catIndex].subCategories);
  };

  return (
    <>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <div className="py-2 mx-md-5 mx-2">
        <hr />
        <div className="my-3">
          <label className="form-label mt-1 text-success">Mes Categories</label>
          <select
            className="form-select form-select-sm"
            onChange={(choice) => categoryPickerHandler(choice.target.value)}
          >
            {categories &&
              categories.map((cat) => {
                return (
                  <option key={cat.nom} value={cat.nom}>
                    {cat.nom}
                  </option>
                );
              })}
          </select>
          <label className="form-label mt-4 text-success">
            Mes Sous Categories
          </label>
          <select
            className="form-select mb-4 form-select-sm"
            onChange={(choice) => setsub(choice.target.value)}
          >
            {selectedSubCategories &&
              selectedSubCategories.map((cat) => {
                return (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
          </select>
        </div>
        <hr />
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group className="py-2">
                <Form.Label className="text-info mb-1">Categorie</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setcategorie(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="py-2">
                <Form.Label className="text-info mb-1">Laboratoire</Form.Label>
                <Form.Control
                  type="text"
                  value={labo}
                  onChange={(e) => setlabo(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="py-2">
            <Form.Label className="text-info mb-1">Nom</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              onChange={(e) => setnom(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-2">
            <Form.Label className="text-info mb-1">Sous categorie</Form.Label>
            <Form.Control
              type="text"
              value={subcategory}
              onChange={(e) => setsub(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-2">
            <Form.Label className="text-info mb-1">Prix MAD</Form.Label>
            <Form.Control
              type="number"
              value={prix}
              onChange={(e) => setprix(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-2">
            <Form.Label className="text-info mb-1">Prix d'achat</Form.Label>
            <Form.Control
              type="number"
              value={achat}
              onChange={(e) => setachat(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="py-2">
            <Form.Label className="text-info mb-1">Lien Photo</Form.Label>
            <Form.Control
              type="text"
              value={picture}
              onChange={(e) => setphoto(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-between my-4">
            {isAdmin && (
              <Button type="submit" variant="info" className="btn-sm ">
                Modifier
              </Button>
            )}
            <Button type="submit" variant="success" className="btn-sm ">
              Rajouter
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ModifyProduct;
