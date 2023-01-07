import React, { useState } from 'react';
import Style from './galleryWeb.module.scss';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { LR1, LR2, LR3, K1, K2 } from 'images';

export default function GalleryWeb() {
	const [galleryRoom, setGalleryRoom] = useState(0);
	const [galleryIndex, setGalleryIndex] = useState(0);

	const photos = {
		'Living & Dining': [LR1, LR2, LR3],
		Kitchen: [K1, K2],
		Bedrooms: [],
		Bathrooms: [],
		Exterior: [],
	};

	const gallery = Object.values(photos);
	const rooms = Object.keys(photos);

	const galleryMap = new Map();
	const breakpoints = new Map();
	let total = 0;
	let breakpoint = 0;
	gallery.forEach((arr, index) => {
		breakpoints.set(index, breakpoint ? breakpoint - 1 : breakpoint);
		breakpoint += arr.length;
		for (const photo in arr) {
			galleryMap.set(total, index);
			total++;
		}
	});

	const handleArrow = (change) => {
		const next = galleryIndex + change;
		if (next < 0 || next > total - 2) {
			return;
		}
		setGalleryIndex(next);
		setGalleryRoom(galleryMap.get(next + 1));
	};
	const handleRoomSelect = (room) => {
		const next = breakpoints.get(room);
		setGalleryIndex(next);
		setGalleryRoom(galleryMap.get(next + 1));
	};

	return (
		<div className={Style.Gallery}>
			<nav>
				<ul>
					{rooms.map((room, index) => (
						<li
							className={galleryRoom === index ? Style.LiCurrent : Style.Li}
							onClick={() => handleRoomSelect(index)}
							key={index}>
							{room}
						</li>
					))}
				</ul>
			</nav>
			<div
				className={galleryIndex > 0 ? Style.ArrowLeft : Style.ArrowLeftDisable}
				onClick={() => handleArrow(-1)}>
				<BsFillArrowLeftCircleFill />
			</div>
			<div
				className={galleryIndex < total - 2 ? Style.ArrowRight : Style.ArrowRightDisable}
				onClick={() => handleArrow(1)}>
				<BsFillArrowRightCircleFill />
			</div>
			<div className={Style.CarouselFrameOuter}>
				<div className={Style.CarouselFrameInner} style={{ transform: `translateX(-${galleryIndex * 50}%)` }}>
					{gallery.map((room, index) => (
						<div className={Style.CarouselRooms} style={{ width: `${room.length * 50}%` }} key={index}>
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
