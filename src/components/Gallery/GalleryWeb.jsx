import React, { useState } from 'react';
import Style from './galleryWeb.module.scss';
import { LR1, LR2, LR3, K1, K2 } from 'images';

export default function GalleryWeb() {
	// const photos = {
	// 	livingRoom: [LR2, LR3],
	// };
	const photos = {
		livingRoom: [LR2, LR3, LR1],
		kitchen: [K1, K2],
		bedrooms: [],
		bathrooms: [],
		exterior: [],
	};

	let total = 0;
	Object.values(photos).forEach((room) => {
		total += room.length;
	});
	// const CarouselSize = (obj) => {
	//     return total;
	// }

	return (
		<div className={Style.Gallery}>
			<div className={Style.Inner}>
				<div className={Style.CarouselFrame}>
					{Object.values(photos).map((room, index) => (
						<div className={Style.CarouselInnerRooms} style={{ width: `${room.length * 50}%` }} key={index}>
							{room.map((photo, index) => (
								<div
									className={Style.Photo}
									style={{ backgroundImage: `url(${photo})` }}
									key={index}></div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
