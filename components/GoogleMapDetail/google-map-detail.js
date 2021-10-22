import { Fragment, useState, useEffect } from "react";
import MapCard from "../ui/map-card";
import { FilterData, SortData } from "../utility";

import CardStyle from "../ui/map-card.module.scss";

const GoogleMapDetail = (props) => {
  const { mapData } = props;
  const [FltData, setFltData] = useState(mapData.data);
  const [type, setType] = useState("food");

  useEffect(() => {
    setFltData(mapData.data.filter((data) => data.types.includes(type)));
  }, [type]);

  const FilteredHandle = (event) => {
    setType(event.target.value);
  };

  return (
    <Fragment>
      <div className={CardStyle.container}>
        <main className={CardStyle.main}>
          <div className={CardStyle.grid}>
            <select className={CardStyle.select} onChange={FilteredHandle}>
              {FilterData.map((flt) => (
                <option key={flt.id} value={flt.value}>
                  {flt.name}
                </option>
              ))}
            </select>
            <select className={CardStyle.select}>
              {SortData.map((flt) => (
                <option key={flt.id} value={flt.value}>
                  {flt.name}
                </option>
              ))}
            </select>
          </div>
          <div className={CardStyle.grid}>
            {FltData.map((data) => (
              <MapCard
                data={data}
                latitude={mapData.latitude}
                longitude={mapData.longitude}
                radius={mapData.radius}
              />
            ))}
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default GoogleMapDetail;
