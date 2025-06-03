import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useValue } from '../MapContext/MapContextProvider';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = ({ onResult }) => {
  const { dispatch } = useValue();
  const ctrl = new MapBoxGeocoder({
    accessToken: "pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA",
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);

  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { lng: coords[0], lat: coords[1] },
    });
    onResult(e.result);
  });

  return null;
};

export default Geocoder;
