import { FunctionComponent, useState } from "react";
import { register } from "../service/userServices";
import { useNavigate } from "react-router-dom";

const RegisterPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    image: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: {
        firstName: form.firstName,
        lastName: form.lastName,
      },
      phone: form.phone,
      image: form.image,
      address: {
        state: form.state,
        country: form.country,
        city: form.city,
        street: form.street,
        houseNumber: Number(form.houseNumber),
        zip: Number(form.zip),
      },
      email: form.email,
      password: form.password,
    };

    try {
      await register(payload as any);
      setSuccess("Account created successfully");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      console.log("Regisster Error:", err.response?.data);

      setError(err.response?.data || "Something went wrong");
      setSuccess("");
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: "720px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h3 className="mb-4 text-center fw-bold">Register</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label>First Name</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label>Last Name</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                  <label>Phone</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                  />
                  <label>Image URL optional</label>
                </div>
              </div>

              <div className="col-12">
                <h5 className="fw-bold mt-2 mb-0">Address</h5>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  />
                  <label>Country</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                  />
                  <label>State optional</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                  />
                  <label>City optional</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    placeholder="Street"
                    value={form.street}
                    onChange={handleChange}
                  />
                  <label>Street</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    name="houseNumber"
                    className="form-control"
                    placeholder="House Number"
                    value={form.houseNumber}
                    onChange={handleChange}
                    required
                  />
                  <label>House Number</label>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    name="zip"
                    className="form-control"
                    placeholder="Zip"
                    value={form.zip}
                    onChange={handleChange}
                    required
                  />
                  <label>Zip</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Email</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <label>Password</label>
                </div>
              </div>

              <div className="col-12">
                <button className="btn btn-dark w-100 py-2" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
