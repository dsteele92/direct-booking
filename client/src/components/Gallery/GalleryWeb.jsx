import React, { useState } from 'react';
import Style from './galleryWeb.module.scss';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsArrowsAngleExpand } from 'react-icons/bs';
import { IoIosPhotos } from 'react-icons/io';
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

export default function GalleryWeb(props) {
	const [galleryRoom, setGalleryRoom] = useState(0);
	const [galleryIndex, setGalleryIndex] = useState(0);

	const photos = [
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
	];

	const homePhotos = {
		'Living & Dining': [LR1sm, LR2sm, LR3sm, LR4sm, LR5sm, LR6sm, LR7sm],
		Kitchen: [K1sm, K2sm],
		Bedrooms: [BDR1sm, BDR2sm, BDR3sm, BDR4sm, BDR5sm, BDR6sm, BDR7sm, BDR8sm, BDR9sm],
		Bathrooms: [BTH1sm, BTH2sm, BTH3sm, BTH4sm, BTH5sm, BTH6sm, BTH7sm, LNDsm],
		Exterior: [EXT],
	};

	const gallery = Object.values(homePhotos);
	const rooms = Object.keys(homePhotos);

	const galleryMap = new Map();
	const breakpoints = new Map();
	let total = 0;
	let breakpoint = 0;
	gallery.forEach((arr, index) => {
		breakpoints.set(index, breakpoint === photos.length - 1 ? breakpoint - 1 : breakpoint);
		breakpoint += arr.length;
		for (const photo in arr) {
			galleryMap.set(total, index);
			total++;
		}
	});

	const handleArrow = (change) => {
		const next = galleryIndex + change;
		console.log(photos.length);
		console.log(next);
		if (next < 0 || next > total - 2) {
			return;
		}
		setGalleryIndex(next);
		if (next !== photos.length - 2) {
			setGalleryRoom(galleryMap.get(next));
		} else {
			setGalleryRoom(galleryMap.get(next + 1));
		}
	};
	const handleRoomSelect = (room) => {
		const next = breakpoints.get(room);
		setGalleryIndex(next);
		if (next !== photos.length - 2) {
			setGalleryRoom(galleryMap.get(next));
		} else {
			setGalleryRoom(galleryMap.get(next + 1));
		}
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
				<div className={Style.CarouselFrameInner} style={{ transform: `translateX(-${galleryIndex * 50}%)` }}>
					<div className={Style.Photos} style={{ width: `${photos.length * 50}%` }}>
						{photos.map((img, index) => (
							<div
								className={Style.Photo}
								style={{ backgroundImage: `url(${img.url})` }}
								key={index}
								onClick={() => props.openFullScreen(index)}>
								<div className={Style.Expand}>
									<BsArrowsAngleExpand />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={Style[`ShowFull${props.scroll}`]} onClick={() => props.openFullScreen(0)}>
				Show All Photos{' '}
				<span>
					<IoIosPhotos />
				</span>
			</div>
		</div>
	);
}
