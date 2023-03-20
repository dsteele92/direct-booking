import React, { useState, useEffect, useRef } from 'react';
import Style from './amenitiesMobile.module.scss';
import { amenitiesIconData } from 'content';
import { useHasIntersected } from 'components';

export default function AmenitiesMobile(props) {
	const [showAll, setShowAll] = useState(0);

	// const mobileMatrix = useRef();
	const [mobileMatrix, mobileMatrixIntersected] = useHasIntersected({ threshold: 0.4 });

	return (
		<div className={Style[`AmenitiesMobile${props.scroll}`]}>
			<div className={Style.Header}>
				<h2>Our Amenities:</h2>
				<h4 onClick={props.showAll}>Show All</h4>
			</div>
			<div className={Style.MobileMatrix} ref={mobileMatrix}>
				{amenitiesIconData.map((amenity, index) => (
					<div
						className={`${index < 12 ? Style.Amenity : Style[`AmenityAll${showAll}`]} ${
							mobileMatrixIntersected ? Style.AmenShow : Style.Amen
						}`}
						style={{ animationDelay: `${index * 0.1}s` }}
						key={index}>
						<div>
							<div className={Style.Icon}>{amenity[1]}</div>
							<div className={Style.Description}>{amenity[0]}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
