import { FunctionComponent, useState } from "react";
import { login, setToken } from "../service/userServices";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = await login(form);
      setToken(token);
      navigate("/");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4 text-center">Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>

            <button className="btn btn-dark w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
