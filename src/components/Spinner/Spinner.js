import loader from "../../assets/loading.gif";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <img className="spinnerImg" src={loader} alt="Loading..." />
    </div>
  );
};

export default Spinner;
