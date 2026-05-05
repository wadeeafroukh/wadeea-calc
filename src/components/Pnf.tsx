import { FunctionComponent } from "react";

interface PnfProps {}

const Pnf: FunctionComponent<PnfProps> = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-2">
        <h1>Page not found - 404</h1>
      </div>
    </>
  );
};

export default Pnf;
