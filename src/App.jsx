import React, { useState, useEffect } from 'react';
import Style from './app.module.scss';
import { BookingWeb, BookingMobile, GalleryWeb, GalleryMobile } from 'components';
import { taborInfo } from './content/taborInfo.js';
import { HiArrowRight } from 'react-icons/hi';

function App() {
	const [enter, setEnter] = useState(false);

	return (
		<div className={Style.App}>
			<div className={Style.Full}>
				<main className={enter ? Style.MainEnter : Style.Main}>
					<section className={enter ? Style.HomeBannerEnter : Style.HomeBanner}>
						<div className={Style.Tint}></div>
						<div className={Style.MainHeader}>
							<h1>{taborInfo.mainHeader}</h1>
							<h3>{taborInfo.subHeader}</h3>
						</div>
						<div className={Style.Enter} onClick={() => setEnter(true)}>
							<h3>Enter</h3>
							<div className={Style.Arrow}>
								<div className={Style.Rotate}>
									<HiArrowRight />
								</div>
							</div>
						</div>
					</section>
					<section className={Style.Description}>
						<div className={Style.Left}>
							<div className={Style.InfoBox}>
								<div className={Style.Square1}></div>
								<div className={Style.Square2}></div>
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
					<section className={Style.Photos}>
						<GalleryWeb />
					</section>
					<section className={Style.Amenities}>Amenities</section>
					<section className={Style.Reviews}>Reviews</section>
					<section className={Style.Host}>Host</section>
				</main>
				<section className={enter ? Style.BookingEnter : Style.Booking}>
					<BookingWeb />
				</section>
			</div>
		</div>
	);
}

export default App;
