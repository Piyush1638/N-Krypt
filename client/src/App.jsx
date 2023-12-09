import {
  Navbar,
  Footer,
  Services,
  Welcome,
  Transactions,
} from "./components";


const App = () => {
  return (
    <div className="h-screen">
      <div className="gradient-bg-welcome">
        <Navbar className="navbar -translate-y-50%"/>
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
