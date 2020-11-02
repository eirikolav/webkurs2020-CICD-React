import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const styles = {
  width: "100%",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [place, setPlace] = useState([10.4028198, 63.4410603]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: place,
        zoom: 16,
      });

      map.on("click", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, place]);

  const handleSubmit = (e) => {
    console.log(e);
    setPlace(e);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret> Finn ditt Norkartkontorer</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleSubmit([10.4028198, 63.4410603])}>
            Trondheim
          </DropdownItem>
          <DropdownItem onClick={() => handleSubmit([10.608773, 59.891586])}>
            Sandvika
          </DropdownItem>
          <DropdownItem onClick={() => handleSubmit([5.34206, 60.37271])}>
            Bergen
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />;
    </div>
  );
};

export default MapboxGLMap;
