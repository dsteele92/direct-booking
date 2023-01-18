import React, { useState } from 'react';
import Style from './galleryMobile.module.scss';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import {
	LR1,
	LR2,
	LR3,
	LR4,
	LR5,
	LR6,
	LR7,
	K1,
	K2,
	BDR1,
	BDR2,
	BDR3,
	BDR4,
	BDR5,
	BDR6,
	BDR7,
	BDR8,
	BDR9,
	BTH1,
	BTH2,
	BTH3,
	BTH4,
	BTH5,
	BTH6,
	BTH7,
	LND,
	EXT,
} from 'images';

export default function GalleryMobile(props) {
	const [galleryRoom, setGalleryRoom] = useState(0);
	const [galleryIndex, setGalleryIndex] = useState(0);

	const photos = {
		'Living & Dining': [LR1, LR2, LR3, LR4, LR5, LR6, LR7],
		Kitchen: [K1, K2],
		Bedrooms: [BDR1, BDR2, BDR3, BDR4, BDR5, BDR6, BDR7, BDR8, BDR9],
		Bathrooms: [BTH1, BTH2, BTH3, BTH4, BTH5, BTH6, BTH7, LND],
		Exterior: [EXT],
	};

	const gallery = Object.values(photos);
	const rooms = Object.keys(photos);

	const galleryMap = new Map();
	const breakpoints = new Map();
	let total = 0;
	let breakpoint = 0;
	gallery.forEach((arr, index) => {
		breakpoints.set(index, breakpoint);
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
		<div className={Style.GalleryMobile}>
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
				className={`${Style[`Arrow${props.scroll}`]} ${galleryIndex > 0 ? '' : Style.Disable}`}
				style={{ left: '5%' }}
				onClick={() => handleArrow(-1)}>
				<BsFillArrowLeftCircleFill />
			</div>
			<div
				className={`${Style[`Arrow${props.scroll}`]} ${galleryIndex < total - 2 ? '' : Style.Disable}`}
				style={{ right: '5%' }}
				onClick={() => handleArrow(1)}>
				<BsFillArrowRightCircleFill />
			</div>
			<div className={Style.CarouselFrameOuter}>
				<div className={Style.CarouselFrameInner} style={{ transform: `translateX(-${galleryIndex}00%)` }}>
					{gallery.map((room, index) => (
						<div className={Style.CarouselRooms} style={{ width: `${room.length}00%` }} key={index}>
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
			<div className={Style[`MobileArrows${props.scroll}`]}>
				<div
					className={`${Style.MobileArrow} ${galleryIndex > 0 ? Style.Disable : ''}`}
					onClick={() => handleArrow(-1)}>
					<BsFillArrowLeftCircleFill />
				</div>
				<div
					className={`${Style.MobileArrow} ${galleryIndex > 0 ? Style.Disable : ''}`}
					onClick={() => handleArrow(1)}>
					<BsFillArrowRightCircleFill />
				</div>
			</div>
		</div>
	);
}
