import React, { useState, useEffect, useRef } from 'react';
import Style from './app.module.scss';
import {
	BookingWeb,
	BookingMobile,
	GalleryWeb,
	GalleryMobile,
	AmenitiesMatrix,
	AmenitiesMobile,
	GoogleMaps,
} from 'components';
import { taborInfo, amenitiesIconData, hostIntro, houseRulesMain, highlightedReviews } from 'content';
import { BsDoorClosed, BsDoorOpen, BsStarFill } from 'react-icons/bs';

// const fs = require('fs');
// const path = require('path');
// require('dotenv').config({ path: __dirname + '/.env' });

function App() {
	const [enter, setEnter] = useState(false);
	const [scroll, setScroll] = useState(0);
	const [show, setShow] = useState(-1);
	const [showAll, setShowAll] = useState(false);

	const main = useRef();
	const matrixEven = useRef();
	const matrixOdd = useRef();

	useEffect(() => {
		const handleScroll = (event) => {
			console.log(event.target.scrollTop / event.target.clientHeight);
			let scrollTop = event.target.scrollTop;
			let pageHeight = event.target.clientHeight;

			const delta = (scrollTop / (1.6 * pageHeight)) * 16;

			matrixEven.current.style.transform = `translateY(${-8 + delta}%)`;
			matrixOdd.current.style.transform = `translateY(${8 - delta}%)`;

			if (scrollTop <= 0.5 * pageHeight) {
				setScroll(0);
			} else if (scrollTop > 0.5 * pageHeight && scrollTop <= 1.4 * pageHeight) {
				setScroll(1);
			} else if (scrollTop > 1.4 * pageHeight) {
				setScroll(2);
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
				<main className={`${Style[`Main${scroll}`]} ${enter ? Style.Enter : ''}`} ref={main}>
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
						<div className={Style.Header}>
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
					<div className={Style.LineBreak}></div>
					<section className={Style.Host}>
						<div className={Style.HostPhoto}>
							<div className={Style.Signature}>
								Your Hosts,
								<br />
								Brenson & Alaina
							</div>
						</div>
						<div className={Style.HostIntro}>
							<p>{hostIntro.hostIntro1}</p>
							<p>{hostIntro.hostIntro2}</p>
							<p>{hostIntro.hostIntro3}</p>
						</div>
					</section>
					<div className={Style.LineBreak}></div>
					<section className={Style.Info}>
						<div className={Style.Container}>
							<div className={Style.Tab}>
								<h4>Location</h4>
							</div>
							<div className={Style.InfoInner}>
								<p className={Style.Location}>
									Mt. Tabor neighborhood is best known for its beautiful city park, Mt. Tabor Park- an
									extinct volcano just a short 5-minute walk from here. The park features numerous
									walking paths, tennis courts, basketball courts, majestic fir trees, and
									breathtaking panoramic views of the city and water reservoirs at the peak of the
									park.
								</p>
								<div className={Style.Expand}>
									View Map <span>></span>
								</div>
							</div>
						</div>
						<div className={Style.Container}>
							<div className={Style.Tab}>
								<h4>Reviews</h4>
							</div>
							<div className={Style.InfoInner}>
								<h2 className={Style.FiveStars}>
									5{' '}
									<span>
										<BsStarFill />
									</span>{' '}
									Rating on Air B&B
								</h2>
								<ul className={Style.HighlightedReviews}>
									{highlightedReviews.map((highlight, index) => (
										<li key={index}>
											<div>"{highlight[1]}"</div>
											<div className={Style.Name}>-{highlight[0]}</div>
										</li>
									))}
								</ul>
								<div className={Style.Expand}>
									See reviews <span>></span>
								</div>
							</div>
						</div>
						<div className={Style.Container}>
							<div className={Style.Tab}>
								<h4>Rules</h4>
							</div>
							<div className={Style.InfoInner}>
								<ul className={Style.RulesMain}>
									{houseRulesMain.map((rule, index) => (
										<li key={index}>
											<div>{rule[1]}</div>
											<h4>{rule[0]}</h4>
										</li>
									))}
								</ul>
								<div className={Style.Expand}>
									House rules <span>></span>
								</div>
							</div>
						</div>
					</section>
					<div className={Style.LineBreak}></div>
				</main>
				<section className={Style.Booking}>
					<BookingWeb />
				</section>
			</div>
		</div>
	);
}

export default App;
