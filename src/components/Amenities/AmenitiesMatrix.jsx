import React, { useState, useEffect } from 'react';
import Style from './amenitiesMatrix.module.scss';

import { amenitiesIconData } from '../../iconData.js';

export default function AmenitiesMatrix(props) {
	return (
		<div className={Style.AmenitiesMatrix}>
			{amenitiesIconData.map((amenity, index) => (
				<div
					className={`${Style.Amenity} ${props.scroll ? Style.Scroll : ''} ${
						props.show === index ? Style.Show : ''
					}`}
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
