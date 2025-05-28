import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginAsync, fetchSignupAsync } from '../features/user/userSlice';
import Modal from "../components/Modals";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const isAuthenticated = useSelector(state => state.user.is_authenticated);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setError('')
    dispatch(fetchLoginAsync({ email, password }))
    // alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`)
  }

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    dispatch(fetchSignupAsync({ email: newEmail, password: newPassword }));
  }

  return (
    <>
      <div className="fixed-top d-flex justify-content-end pe-3 pt-3">
        <button className="btn btn-info btn-lg mb-3" onClick={() => setShowModal(true)}>
          Sign up
        </button>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Register your email</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            // Handle registration logic here
            // Example: dispatch(registerAsync({ email: newEmail, password: newPassword }))
            setShowModal(false);
          }}
        >
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" onClick={handleRegistration}>
              Register
            </button>
          </div>
        </form>
        {/* <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign up in application</h5>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={e => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={newPassword}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={() => handleEmailSend({
                  //   email,
                  //   company_name,
                  //   company_nit: Number(company_nit)
                  // })}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </Modal>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: 400 }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary w-100">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;