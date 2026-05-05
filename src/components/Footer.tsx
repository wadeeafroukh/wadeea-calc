import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0">© {new Date().getFullYear()} Wadeea Calculator</p>

        <p className="mb-0 text-secondary">Track your money smarter.</p>
      </div>
    </footer>
  );
};

export default Footer;
