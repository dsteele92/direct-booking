import React, { useState, useEffect, useRef } from 'react';
import Style from './amenitiesMobileShowAll.module.scss';
import { amenitiesIconData } from 'content';
import { useHasIntersected } from 'components';

export default function AmenitiesMobileShowAll(props) {
	const [showAll, setShowAll] = useState(0);

	// const mobileMatrix = useRef();
	const [mobileMatrix, mobileMatrixIntersected] = useHasIntersected({ threshold: 0.4 });

	return (
		<div className={Style.AmenitiesMobile}>
			<div className={Style.MobileMatrix} ref={mobileMatrix}>
				{amenitiesIconData.map((amenity, index) => (
					<div
						className={`${Style.Amenity} ${Style.AmenShow}`}
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
