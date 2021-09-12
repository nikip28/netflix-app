import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const MovieDetails = ({ location }) => {
  return (
    <>
      <Link to="/">home</Link>
      <div className="text-center">
        <h2 className="py-3">{location.state.item.name}</h2>
        <img
          src="https://placehold.jp/450x350.png"
          alt={location.state.item.name}
        />
        <p className="py-5">{location.state.item.description}</p>
      </div>
    </>
  );
};

export default withRouter(MovieDetails);
