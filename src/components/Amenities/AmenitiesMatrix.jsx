import React from 'react';
import Style from './amenitiesMatrix.module.scss';

import { amenitiesIconData } from 'content';

export default function AmenitiesMatrix(props) {
	return (
		<div className={Style[`AmenitiesMatrix${props.scroll}`]}>
			{amenitiesIconData.map((amenity, index) => (
				<div
					className={`${Style.Amenity} ${props.show === index ? Style.Show : ''} ${
						props.intersected ? Style.AmenShow : Style.Amen
					}`}
					style={{ animationDelay: `${Math.random() * 1}s` }}
					key={index}>
					{index % 2 === props.modulo ? (
						<div>
							<div className={Style.Icon}>{amenity[1]}</div>
							<div className={props.showAll ? Style.DescriptionShow : Style.Description}>
								{amenity[0]}
							</div>
						</div>
					) : (
						''
					)}
				</div>
			))}
		</div>
	);
}
