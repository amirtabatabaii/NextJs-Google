import { calcCrow } from "../utility";
import classes from "./map-card.module.scss";

const MapCard = (props) => {
  const { data, latitude, longitude, radius } = props;

  return (
    <div key={data.place_id} className={classes.card}>
      <span>
        <img src={data.icon} alt={data.name} />
      </span>
      <h3>{data.name}</h3>

      <h5 className={classes.geometry}>
        {data.geometry.location.lat}
        {", "}
        {data.geometry.location.lng}
      </h5>
      <h5>
        Distance :{" "}
        {calcCrow(
          latitude,
          longitude,
          data.geometry.location.lat,
          data.geometry.location.lng,
          radius
        ).toFixed(2)}{" "}
        m
      </h5>
      <p className={classes.types}>
        {data.types.map((type, index) => (
          <a key={index} className={classes.tag}>
            {type}
          </a>
        ))}
      </p>
    </div>
  );
};

export default MapCard;
