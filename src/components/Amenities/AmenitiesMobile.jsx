import React, { useState, useEffect } from 'react';
import Style from './amenitiesMobile.module.scss';
import { amenitiesIconData } from 'content';

export default function AmenitiesMobile(props) {
	const [showAll, setShowAll] = useState(0);

	useEffect(() => {}, []);

	return (
		<div className={Style[`AmenitiesMobile${props.scroll}`]}>
			<h2>Our Amenities:</h2>
			<div className={Style.MobileMatrix}>
				{amenitiesIconData.map((amenity, index) => (
					<div className={`${index < 12 ? Style.Amenity : Style[`AmenityAll${showAll}`]}`} key={index}>
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
