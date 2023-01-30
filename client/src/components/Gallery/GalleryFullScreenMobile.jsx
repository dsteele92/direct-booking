import React, { useState, useEffect, useRef } from 'react';
import Style from './galleryFullScreenMobile.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
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

export default function GalleryFullScreenMobile(props) {
	const [current, setCurrent] = useState(props.current);

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

	const carousel = useRef();

	useEffect(() => {
		const handleScroll = (e) => {
			const updateCurrent = Math.round((e.target.scrollLeft / e.target.scrollWidth) * 27) + 1;
			setCurrent(updateCurrent);
		};

		const carouselCurrent = carousel.current;
		carouselCurrent.addEventListener('scroll', handleScroll);
		return () => {
			carouselCurrent.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={Style.FullScreenMobile}>
			<div className={Style.Back} onClick={props.close}>
				<IoIosArrowBack />
			</div>
			<div className={Style.Tracker}>{`${current} / ${photos.length}`}</div>
			<div className={Style.CarouselFrameOuter} ref={carousel}>
				<div className={Style.CarouselFrameInner} style={{ transform: `translateX(-${props.current}00%)` }}>
					{photos.map((photo, index) => (
						<div className={Style.Current} key={index}>
							<img src={photo.url} alt='gallery' className={Style.Photo} />
							<div className={Style.Description}>{photo.description}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
