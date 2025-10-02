import './ProviderComponent.css';

const Provider: React.FC = () => {
  return (
    <div className="container">
      <div className="">
        <img
          src="https://module-federation.io/svg.svg"
          alt="logo"
          className="logo-image"
        />
      </div>
      <h1 className="title">Hello from Product Provider</h1>
    </div>
  );
};

export default Provider;
