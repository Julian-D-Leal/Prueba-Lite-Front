import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../features/user/userSlice";
import { fetchCompaniesAsync, addCompanyAsync, removeCompanyAsync, addProductAsync, updateCompAsync } from "../features/user/companySlice";

function Inicio() {
  const isAdmin = useSelector(state => state.user.is_admin);
  const [email, setEmail] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_phone, setCompanyPhone] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [company_nit, setCompanyNIT] = useState("");
  const [modals, setModals] = useState({
    showModal: false,
    showModalAddCom: false,
    showModalAddPro: false,
    showModalDelete: false,
    showModalUpdate: false,
  });
  const [productAdd, setProductAdd] = useState({
    company: null,
    code: "",
    name: "",
    description: "",
    price: "",
    currency: "",
  });
  const dispatch = useDispatch();
  const companies = useSelector(state => state.company).companies;

  useEffect(() => {
    dispatch(fetchCompaniesAsync());
  }, [dispatch]);

  const handleEmailSend = (data) => {
    axios.post("http://127.0.0.1:8000/api/send-inventary/", data)
      .then(res => { alert(res.data.message); })
      .catch(err => console.error(err));
    console.log("Sending inventory by email...");
    setModals({...modals, showModal: false});
    setEmail("");
    setCompanyName("");
    setCompanyNIT(null);
  }

  const modalEmail = (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Send Inventary by email</h5>
            <button type="button" className="btn-close" onClick={() => setModals({...modals, showModal: false})}></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Company's NIT</label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="company's NIT"
                value={company_nit}
                disabled={true}
                // onChange={e => setCompanyNIT(e.target.value)}
              />
            </div>
            <label className="form-label">Company's Name</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Company's name"
                value={company_name}
                disabled={true}
                // onChange={e => setCompanyName(e.target.value)}
              />
            </div>
            <label className="form-label">Email</label>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="email to send the inventary"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleEmailSend({
                email,
                company_name,
                company_nit: Number(company_nit)
              })}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const modalDelete = (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Deleting company...</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this company?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-footer">
              <button type="button" onClick={() => setModals({...modals, showModalDelete: false})}>Cancel</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  dispatch(removeCompanyAsync(
                    Number(company_nit)
                  ))
                  setModals({...modals, showModalDelete: false});
                  setCompanyNIT(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const modalAdd = (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add a product</h5>
            <button type="button" className="btn-close" onClick={() => {
              setModals({...modals, showModalAddPro: false});
              setCompanyNIT("");
            }}></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Company's NIT</label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                disabled={true}
                placeholder="NIT"
                value={productAdd.company}
                onChange={e => setProductAdd({ ...productAdd, nit: e.target.value })}
                required
              />

            </div>
            <label className="form-label">Product's Code</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Code"
                value={productAdd.code}
                onChange={e => setProductAdd({ ...productAdd, code: e.target.value })}
                required
              />
            </div>
            <label className="form-label">Product's name</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={productAdd.name}
                onChange={e => setProductAdd({ ...productAdd, name: e.target.value })}
                required
              />
            </div>
            <label className="form-label">Product's Description</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={productAdd.description}
                onChange={e => setProductAdd({ ...productAdd, description: e.target.value })}
                required
              />
            </div>
            <label className="form-label">Product's Price</label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={productAdd.price}
                onChange={e => setProductAdd({ ...productAdd, price: e.target.value })}
                required
              />
            </div>
            <label className="form-label">Product's Currency</label>
            <div class="input-group mb-3">
              <select
                className="form-select"
                id="inputGroupSelectCurrency"
                value={productAdd.currency}
                onChange={e => setProductAdd({ ...productAdd, currency: e.target.value })}
              >
                <option value="">Choose...</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="COP">COP</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!productAdd.currency}
              onClick={() => {
                dispatch(addProductAsync({
                  company: productAdd.company,
                  code: productAdd.code,
                  name: productAdd.name,
                  description: productAdd.description,
                  price: productAdd.price,
                  currency: productAdd.currency
                }))
                setModals({...modals, showModalAddPro: false});
                setProductAdd({
                  company: "",
                  code: "",
                  name: "",
                  description: "",
                  price: "",
                  currency: "",
                });
              }}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const modalCom = (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modals.showModalAddCom? "Add company" : "update company"}</h5>
            {modals.showModalAddCom ? 
              <button type="button" className="btn-close" onClick={() => {
                setCompanyAddress("");
                setCompanyPhone("");
                setCompanyName("");
                setCompanyNIT(null);
                setModals({...modals, showModalAddCom: false}
                )}}></button>
              : <button type="button" className="btn-close" onClick={() => 
                {setModals({...modals, showModalUpdate: false})
                setCompanyAddress("");
                setCompanyPhone("");
                setCompanyName("");
                setCompanyNIT(null);
              }}></button>
            }
          </div>
          <div className="modal-body">
            <label className="form-label">Company's NIT</label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="NIT"
                value={company_nit}
                disabled={modals.showModalUpdate}
                onChange={e => setCompanyNIT(e.target.value)}
              />
            </div>
            <label className="form-label">Company's name</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Company's name"
                value={company_name}
                onChange={e => setCompanyName(e.target.value)}
              />
            </div>
            <label className="form-label">Company's address</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="company's Adress"
                value={company_address}
                onChange={e => setCompanyAddress(e.target.value)}
              />
            </div>
            <label className="form-label">Company's phone</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="company's phone"
                value={company_phone}
                onChange={e => setCompanyPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (modals.showModalUpdate) {
                  dispatch(updateCompAsync({
                    nit: Number(company_nit),
                    name: company_name,
                    address: company_address,
                    phone: company_phone
                  }))
                  setModals({...modals, showModalUpdate: false});
                } else{
                  dispatch(addCompanyAsync({
                    nit: Number(company_nit),
                    name: company_name,
                    address: company_address,
                    phone: company_phone
                  }))
                  setModals({...modals, showModalAddCom: false});
                }
                setCompanyAddress("");
                setCompanyPhone("");
                setCompanyName("");
                setCompanyNIT(null);
              }}
            >
              {modals.showModalAddCom ? "Add Company" : "Update Company"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container">
      {modals.showModal && modalEmail}
      {modals.showModalAddCom && modalCom}
      {modals.showModalDelete && modalDelete}
      {modals.showModalAddPro && modalAdd}
      {modals.showModalUpdate && modalCom}
      
      <div className="fixed-top d-flex justify-content-end pe-3 pt-3">
        {isAdmin && (
          <button className="btn btn-info btn-lg mb-3" onClick={() => setModals({...modals, showModalAddCom: true})}>
            Register company
          </button>
        )}
        <button className="btn btn-danger btn-lg mb-3" onClick={() => dispatch(logOut())}>
          Sign Out
        </button>
      </div>
      <div className="text-center pt-3" >
        <h1>Inicio</h1>
        <p>
          {isAdmin
            ? "Bienvenido a la página de inicio Admin."
            : "Bienvenido a la página de inicio Invitado."}
        </p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {companies.map(company => (
          <div className="col" key={company.nit}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title"><strong>{company.name}</strong></h3>
                <p className="card-text">
                  <strong>NIT:</strong> {company.nit}<br />
                  <strong>Phone:</strong> {company.phone}<br />
                  <strong>Adress:</strong> {company.address}
                </p>
              </div>
              {isAdmin && (
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setModals({...modals, showModalUpdate: true})
                      setCompanyNIT(company.nit);
                      setCompanyName(company.name);
                      setCompanyPhone(company.phone);
                      setCompanyAddress(company.address);
                    }}
                  >Update</button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      setModals({...modals, showModalAddPro: true})
                      setProductAdd({
                        ...productAdd,
                        company: company.nit
                      });
                    }}
                  >Add product</button>
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => {
                      setModals({...modals, showModal: true})
                      setCompanyNIT(company.nit);
                      setCompanyName(company.name);
                    }}
                  >Send inventary by email</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setModals({...modals, showModalDelete: true});
                      setCompanyNIT(company.nit);
                    }}
                  >Delete Company</button>
                </div>

              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;