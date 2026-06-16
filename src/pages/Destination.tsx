import { useParams } from "react-router-dom";
const Destination = () => {
    const {name} = useParams()
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

export default Destination;