import React, { useState, useEffect, useRef } from 'react';
import Style from './app.module.scss';
import { BookingWeb, BookingMobile, GalleryWeb, GalleryMobile, AmenitiesWeb, AmenitiesMobile } from 'components';
import { taborInfo } from './content/taborInfo.js';
import { BsDoorClosed, BsDoorOpen } from 'react-icons/bs';

function App() {
	const [enter, setEnter] = useState(false);
	const [offset, setOffset] = useState(0);
	const [scroll, setScroll] = useState(false);

	const main = useRef();

	useEffect(() => {
		const handleScroll = (event) => {
			const bottom = (event.target.scrollTop / (1.4 * event.target.clientHeight)) * 100;
			setOffset(bottom);

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
				<main className={scroll ? Style.MainScroll : Style.Main} ref={main}>
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
						<AmenitiesWeb offset={offset} scroll={scroll} />
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
