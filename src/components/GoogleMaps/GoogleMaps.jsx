// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import Style from './googleMaps.module.scss';

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px',
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

function MyComponent() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDIjgf_kME9edjRufmtOYRhE-vqYdjJrio',
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
			{/* Child components, such as markers, info windows, etc. */}
			<></>
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(MyComponent);

// const MapContainer = () => {
// 	const mapStyles = {
// 		height: '100%',
// 		width: '100%',
// 	};

// 	const defaultCenter = {
// 		lat: 45.51,
// 		lng: -122.603,
// 	};

// 	return (
// 		<div>
// 			<LoadScript googleMapsApiKey='AIzaSyDIjgf_kME9edjRufmtOYRhE-vqYdjJrio'>
// 				<GoogleMap GoogleMapsStyle={mapStyles} zoom={13} center={defaultCenter} />
// 			</LoadScript>
// 		</div>
// 	);
// };

// export default MapContainer;

// export default function GoogleMaps() {
// 	const mapStyles = {
// 		height: '100%',
// 		width: '100%',
// 	};

// 	const defaultCenter = {
// 		lat: 45.51,
// 		lng: -122.603,
// 	};

// 	return (
// 		<div>
// 			<div>Hi</div>
// 			<LoadScript googleMapsApiKey='AIzaSyDIjgf_kME9edjRufmtOYRhE-vqYdjJrio'>
// 				<GoogleMap GoogleMapsStyle={mapStyles} zoom={13} center={defaultCenter} />
// 			</LoadScript>
// 		</div>
// 	);
// }
