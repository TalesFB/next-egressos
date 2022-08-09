import { useState, useContext } from "react";
import { AuthUserContext } from "../../contexts/authUser";

import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { autenticationUser } = useContext(AuthUserContext);

  const onSubmit = () => {
    autenticationUser(email, password);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <Link href={"/"}>
            <a>voltar</a>
          </Link>

          <h1>Agora precisamos que você se identifique... </h1>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onSubmit}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
