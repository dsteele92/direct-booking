import React, { useState, useEffect, useRef } from 'react';
import Style from './app.module.scss';
import { BookingWeb, BookingMobile, GalleryWeb, GalleryMobile, AmenitiesMatrix, AmenitiesMobile } from 'components';
import { taborInfo } from './content/taborInfo.js';
import { BsDoorClosed, BsDoorOpen } from 'react-icons/bs';
import { amenitiesIconData } from './iconData.js';

function App() {
	const [enter, setEnter] = useState(false);
	const [scroll, setScroll] = useState(false);
	const [show, setShow] = useState(-1);
	const [showAll, setShowAll] = useState(false);

	const main = useRef();
	const matrixEven = useRef();
	const matrixOdd = useRef();

	useEffect(() => {
		const handleScroll = (event) => {
			// console.log(event.target.scrollTop / (1.6 * event.target.clientHeight));
			const delta = (event.target.scrollTop / (1.6 * event.target.clientHeight)) * 16;

			matrixEven.current.style.transform = `translateY(${-8 + delta}%)`;
			matrixOdd.current.style.transform = `translateY(${8 - delta}%)`;

			if (event.target.scrollTop > 0.5 * event.target.clientHeight) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		const window = main.current;

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={Style.App}>
			<div className={Style.Full}>
				<main className={`${Style.Main} ${scroll ? Style.Scroll : ''} ${enter ? Style.Enter : ''}`} ref={main}>
					<section className={enter ? Style.HomeBannerEnter : Style.HomeBanner}>
						<div className={Style.Tint}></div>
						<div className={Style.MainHeader}>
							<h1>{taborInfo.mainHeader}</h1>
							<h3>{taborInfo.subHeader}</h3>
						</div>
						<div className={Style.Enter} onClick={() => setEnter(true)}>
							<h3>Enter</h3>
							<div className={Style.Door}>
								<div className={Style.Closed}>
									<BsDoorClosed />
								</div>
								<div className={Style.Open}>
									<BsDoorOpen />
								</div>
							</div>
						</div>
					</section>
					<section className={Style.Photos}>
						<GalleryWeb />
					</section>
					<section className={Style.Description}>
						<div className={Style.Left}>
							<div className={Style.InfoBox}>
								<p>{taborInfo.aboutTheSpace}</p>
								<div className={Style.ShowMore}>
									{/* Add onClick modal open function */}
									Show more <span>></span>
								</div>
							</div>
						</div>
						<div className={Style.Right}>
							<h2>Welcome</h2>
						</div>
					</section>
					<section className={Style.Amenities}>
						<div className={scroll ? Style.HeaderScroll : Style.Header}>
							<h2>Our Amenities:</h2>
							<h4
								className={Style.ShowAll}
								onMouseEnter={() => setShowAll(true)}
								onMouseLeave={() => setShowAll(false)}>
								Show All
							</h4>
						</div>
						<div className={Style.Matrix} ref={matrixEven}>
							<AmenitiesMatrix scroll={scroll} modulo={0} show={show} showAll={showAll} />
						</div>
						<div className={Style.Matrix} ref={matrixOdd}>
							<AmenitiesMatrix scroll={scroll} modulo={1} show={show} showAll={showAll} />
						</div>
						<div className={Style.MatrixHoverGrid}>
							{amenitiesIconData.map((amenity, index) => (
								<div className={Style.GridSlot} key={index}>
									<div
										className={Style.HoverDiv}
										onMouseEnter={() => setShow(index)}
										onMouseLeave={() => setShow(-1)}></div>
								</div>
							))}
						</div>
					</section>
					<section className={Style.Reviews}>Reviews</section>
					<section className={Style.Host}>Host</section>
				</main>
				<section className={Style.Booking}>
					<BookingWeb />
				</section>
			</div>
		</div>
	);
}

export default App;
