import React, { useState } from 'react';
import Style from './galleryMobile.module.scss';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { GalleryFullScreenMobile } from 'components';
import {
	LR1sm,
	LR2sm,
	LR3sm,
	LR4sm,
	LR5sm,
	LR6sm,
	LR7sm,
	K1sm,
	K2sm,
	BDR1sm,
	BDR2sm,
	BDR3sm,
	BDR4sm,
	BDR5sm,
	BDR6sm,
	BDR7sm,
	BDR8sm,
	BDR9sm,
	BTH1sm,
	BTH2sm,
	BTH3sm,
	BTH4sm,
	BTH5sm,
	BTH6sm,
	BTH7sm,
	LNDsm,
	EXT,
} from 'images';

export default function GalleryMobile(props) {
	const [galleryRoom, setGalleryRoom] = useState(0);
	const [galleryIndex, setGalleryIndex] = useState(0);

	const photos = {
		'Living & Dining': [LR1sm, LR2sm, LR3sm, LR4sm, LR5sm, LR6sm, LR7sm],
		Kitchen: [K1sm, K2sm],
		Bedrooms: [BDR1sm, BDR2sm, BDR3sm, BDR4sm, BDR5sm, BDR6sm, BDR7sm, BDR8sm, BDR9sm],
		Bathrooms: [BTH1sm, BTH2sm, BTH3sm, BTH4sm, BTH5sm, BTH6sm, BTH7sm, LNDsm],
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
		if (next < 0 || next > total - 1) {
			return;
		}
		setGalleryIndex(next);
		setGalleryRoom(galleryMap.get(next));
	};
	const handleRoomSelect = (room) => {
		const next = breakpoints.get(room);
		setGalleryIndex(next);
		setGalleryRoom(galleryMap.get(next));
	};

	// const closeFullScreen = () => setFullScreen(-1);

	return (
		<div className={Style.GalleryMobile}>
			<nav>
				<ul>
					{rooms.map((room, index) => (
						<li
							className={galleryRoom === index ? Style.LiCurrent : Style[`Li${props.scroll}`]}
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
				className={`${Style[`Arrow${props.scroll}`]} ${galleryIndex < total - 1 ? '' : Style.Disable}`}
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
									style={{ backgroundImage: `url(${photo.url})` }}
									key={index}
									onClick={() => props.openFullScreen(index + 1)}></div>
							))}
						</div>
					))}
				</div>
			</div>
			<div className={Style[`MobileArrows${props.scroll}`]}>
				<div
					className={`${Style.MobileArrow} ${galleryIndex > 0 ? '' : Style.Disable}`}
					onClick={() => handleArrow(-1)}>
					<BsFillArrowLeftCircleFill />
				</div>
				<div
					className={`${Style.MobileArrow} ${galleryIndex < total - 2 ? '' : Style.Disable}`}
					onClick={() => handleArrow(1)}>
					<BsFillArrowRightCircleFill />
				</div>
			</div>
		</div>
	);
}
