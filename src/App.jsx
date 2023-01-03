import React, { useState, useEffect } from 'react';
import Style from './app.module.scss';
import { taborInfo } from './content/taborInfo.js';

function App() {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const onScroll = (event) => {
			if (window.pageYOffset >= 50) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<div className={Style.App}>
			<div className={Style.TopBackground}>
				<div className={Style.Tint}></div>
			</div>
			<section className={Style.HomeBanner}>
				<div className={Style.Inner}>
					<div className={Style.MainHeader}>
						<h1>{taborInfo.mainHeader}</h1>
						<h3>{taborInfo.subHeader}</h3>
					</div>
				</div>
			</section>
			<section className={scroll ? Style.BookScroll : Style.Book}>
				<div className={Style.Inner}>BOOKING</div>
			</section>
			<section className={Style.Description}>
				<div className={Style.Inner}>
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
				</div>
			</section>
			<section className={Style.Photos}>
				<div className={Style.Inner}></div>
			</section>
			<section className={Style.Amenities}>
				<div className={Style.Inner}></div>
			</section>
			<section className={Style.Reviews}>
				<div className={Style.Inner}></div>
			</section>
			<section className={Style.Host}>
				<div className={Style.Inner}></div>
			</section>
		</div>
	);
}

export default App;
