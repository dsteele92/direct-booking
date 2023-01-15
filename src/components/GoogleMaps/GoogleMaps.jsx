// import React, { useMemo } from 'react';
// import Style from './googleMaps.module.scss';
// import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';

// export default function GoogleMaps() {
// 	const { isLoaded } = useLoadScript({ googleMapsApiKey: '' });
// 	const center = useMemo(() => ({ lat: 45.51, lng: -122.603 }));

// 	if (!isLoaded) return <div className={Style.Loading}>Loading Maps...</div>;

// 	return (
// 		<GoogleMap zoom={14} center={center} mapContainerClassName={Style.Maps}>
// 			<Circle center={center} radius={500} />
// 		</GoogleMap>
// 	);
// }
