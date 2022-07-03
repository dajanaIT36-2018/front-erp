import ProizvodList from "./components/proizvod/Proizvod-list";

class Home extends Component {
    render() {
    return (
      <div className="home">
        <ProizvodList  title="Svi proizvodi" />
      </div>
    );
  }
  }
   
  export default Home;