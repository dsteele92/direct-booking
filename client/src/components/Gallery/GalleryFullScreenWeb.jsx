import React, { useState, useRef, useEffect, createRef } from 'react';
import Style from './galleryFullScreenWeb.module.scss';

import { AiOutlineSmallDash, AiFillCloseCircle } from 'react-icons/ai';
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

export default function GalleryFullScreenWeb(props) {
	const [galleryRoom, setGalleryRoom] = useState(0);
	const [current, setCurrent] = useState(props.current);
	const carousel = useRef();

	const photos = [
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
	];

	let photoRefs = [];
	photoRefs = photos.map((img, i) => photoRefs[i] ?? createRef());

	// for creating the maps that allow for navigation by rooms:
	const homePhotos = {
		'Living & Dining': [LR1, LR2, LR3, LR4, LR5, LR6, LR7],
		Kitchen: [K1, K2],
		Bedrooms: [BDR1, BDR2, BDR3, BDR4, BDR5, BDR6, BDR7, BDR8, BDR9],
		Bathrooms: [BTH1, BTH2, BTH3, BTH4, BTH5, BTH6, BTH7, LND],
		Exterior: [EXT],
	};

	const gallery = Object.values(homePhotos);
	const rooms = Object.keys(homePhotos);

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

	useEffect(() => {
		const handleLoad = () => {
			photoRefs[current].current.scrollIntoView({
				// behavior: 'smooth',
				inline: 'center',
			});
		};

		const handleScroll = (e) => {
			const updateCurrent = Math.round((e.target.scrollLeft / e.target.scrollWidth) * 27);
			setCurrent(updateCurrent);
			setGalleryRoom(galleryMap.get(updateCurrent));
		};

		const handleWheel = (e) => {
			if (e.deltaY === 0) return;
			e.preventDefault();
			carouselCurrent.scrollTo({
				left: carouselCurrent.scrollLeft + e.deltaY,
				// behavior: 'smooth',
			});
		};

		const carouselCurrent = carousel.current;
		const openingPhotoRef = photoRefs[current].current;
		carouselCurrent.addEventListener('scroll', handleScroll);
		carouselCurrent.addEventListener('wheel', handleWheel);
		openingPhotoRef.addEventListener('load', handleLoad);

		return () => {
			carouselCurrent.removeEventListener('scroll', handleScroll);
			carouselCurrent.removeEventListener('wheel', handleWheel);
			openingPhotoRef.removeEventListener('load', handleLoad);
		};
	}, []);

	return (
		<div className={Style.FullScreenWeb}>
			<div className={Style.Back} onClick={props.close}>
				<AiFillCloseCircle />
			</div>
			<nav>
				<ul>
					{rooms.map((room, index) => (
						<li
							className={galleryRoom === index ? Style.LiCurrent : Style.Li}
							onClick={() => {
								photoRefs[breakpoints.get(index)].current.scrollIntoView({
									// behavior: 'smooth',
									inline: 'center',
								});
							}}
							key={index}>
							{room}
						</li>
					))}
				</ul>
			</nav>
			<div className={Style.Description}>
				<div className={Style.Tracker}>{`${current + 1} / ${photos.length}`}</div>
				<p>{photos[current].description}</p>
			</div>
			<div className={Style.Scroll}>
				<h4>Scroll</h4>
				<div className={Style.Dash}>
					<AiOutlineSmallDash />
				</div>
			</div>

			<div className={Style.CarouselFrameOuter} ref={carousel}>
				<div className={Style.CarouselFrameInner}>
					{photos.map((photo, index) => (
						<img src={photo.url} alt='gallery' className={Style.Photo} key={index} ref={photoRefs[index]} />
					))}
				</div>
			</div>
		</div>
	);
}
