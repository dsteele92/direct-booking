import React, { useState, useEffect, useRef } from 'react';
import Style from './app.module.scss';
import { BookingWeb, BookingMobile, GalleryWeb, GalleryMobile, AmenitiesMatrix, AmenitiesMobile } from 'components';
import { taborInfo, amenitiesIconData, hostIntro, houseRulesMain, highlightedReviews } from 'content';
import { BsDoorClosed, BsDoorOpen, BsStarFill, BsCalendarRange } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

function App() {
	// for opening page enter button -->
	const [enter, setEnter] = useState(false);
	// for background color -->
	const [scroll, setScroll] = useState(0);
	const main = useRef();
	// for amenities matrix -->
	const [show, setShow] = useState(-1);
	const [showAll, setShowAll] = useState(false);
	const matrixEven = useRef();
	const matrixOdd = useRef();
	// for modals --->
	const [seeIntro, setSeeIntro] = useState(false);
	const [seeMap, setSeeMap] = useState(false);
	const [seeReviews, setSeeReviews] = useState(false);
	const [seeRules, setSeeRules] = useState(false);

	useEffect(() => {
		const handleScroll = (event) => {
			// console.log(event.target.scrollTop / event.target.clientHeight);
			let scrollTop = event.target.scrollTop;
			// let pageHeight = event.target.clientHeight;
			let pageHeight = window.innerHeight;

			let total = main.current.scrollHeight - window.innerHeight;
			// ---> can use scrollHeight of element for total pixels of page
			// console.log(main.current.scrollHeight);

			const delta = (scrollTop / (2.8 * pageHeight)) * 16;
			// parralax amenities matrix only displayed above breakpoint-small
			if (window.innerWidth >= 750) {
				matrixEven.current.style.transform = `translateY(${-8 + delta}%)`;
				matrixOdd.current.style.transform = `translateY(${8 - delta}%)`;
			}

			// ***** Switch to intersection observer *****
			// ---> Add different parralax breakpoints for mobile

			// if (window.innerWidth > 1000) {
			if (scrollTop <= 1.5 * pageHeight) {
				setScroll(0);
			} else if (scrollTop > 1.5 * pageHeight && scrollTop <= 2.3 * pageHeight) {
				setScroll(1);
			} else if (scrollTop > 2.3 * pageHeight) {
				setScroll(2);
			}
			// } else {
			// 	console.log(scrollTop / total);
			// 	// console.log(total);
			// 	if (scrollTop / total <= 0.2) {
			// 		setScroll(0);
			// 	} else if (scrollTop / total > 0.2 && scrollTop / total <= 0.6) {
			// 		setScroll(1);
			// 	} else if (scrollTop / total > 0.6) {
			// 		setScroll(2);
			// 	}
			// }
		};

		const mainCurrent = main.current;

		mainCurrent.addEventListener('scroll', handleScroll);

		return () => {
			mainCurrent.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={Style.App}>
			<main className={Style[`Main${scroll}`]} ref={main}>
				<div className={Style.HomeBanner}>
					<div className={Style.BackgroundPhoto}>
						<div className={Style.Tint}></div>
					</div>
					<div className={Style.MainHeader}>
						<h1>{taborInfo.mainHeader}</h1>
						<h3>{taborInfo.subHeader}</h3>
					</div>
					{/* <div className={Style.Enter} onClick={() => setEnter(true)}>
					<h3>Enter</h3>
					<div className={Style.Door}>
						<div className={Style.Closed}>
							<BsDoorClosed />
						</div>
						<div className={Style.Open}>
							<BsDoorOpen />
						</div>
					</div>
				</div> */}
				</div>
				<div className={Style.BookingWeb}>
					{/* <BookingWeb /> */}
					<BookingMobile />
				</div>
				<div className={Style.BookingMobileBar}>
					<BookingMobile />
				</div>
				<section className={Style.Description}>
					<div className={Style.Welcome}>
						<h2>Welcome</h2>
					</div>
					<div className={Style.Intro}>
						<div className={Style.InfoBox}>
							<p>{taborInfo.aboutTheSpace}</p>
							<div className={Style.ShowMore} onClick={() => setSeeIntro(true)}>
								{/* Add onClick modal open function */}
								Show more <span>></span>
							</div>
						</div>
					</div>
				</section>
				<section className={Style.Gallery}>
					<GalleryWeb scroll={scroll} />
				</section>
				<section className={Style.GalleryMobile}>
					<GalleryMobile scroll={scroll} />
				</section>
				<section className={Style.AmenitiesWeb}>
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
				<section className={Style.AmenitiesMobile}>
					<AmenitiesMobile scroll={scroll} />
				</section>
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
				<section className={Style.Info}>
					<div className={Style.Container}>
						<div className={Style.Tab}>
							<h4>Location</h4>
						</div>
						<div className={Style.InfoInner}>
							<p className={Style.Location}>
								Mt. Tabor neighborhood is best known for its beautiful city park, Mt. Tabor Park- an
								extinct volcano just a short 5-minute walk from here. The park features numerous walking
								paths, tennis courts, basketball courts, majestic fir trees, and breathtaking panoramic
								views of the city and water reservoirs at the peak of the park.
							</p>
						</div>
						<div className={Style.Expand} onClick={() => setSeeMap(true)}>
							View Map <span>></span>
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
								Rating on Airbnb
							</h2>
							<ul className={Style.HighlightedReviews}>
								{highlightedReviews.map((highlight, index) => (
									<li key={index}>
										<div>"{highlight[1]}"</div>
										<div className={Style.Name}>-{highlight[0]}</div>
									</li>
								))}
							</ul>
						</div>
						<div className={Style.Expand} onClick={() => setSeeReviews(true)}>
							See reviews <span>></span>
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
						</div>
						<div className={Style.Expand} onClick={() => setSeeRules(true)}>
							House rules <span>></span>
						</div>
					</div>
				</section>

				{seeIntro && (
					<div className={Style.Modal}>
						<div className={Style.ModalBackground} onClick={() => setSeeIntro(false)}></div>
						<div className={Style.Inner}>
							<div className={Style.Close} onClick={() => setSeeIntro(false)}>
								<AiFillCloseCircle />
							</div>
							<div className={Style.Content}>
								<h1>About this space</h1>
								<p>{taborInfo.aboutTheSpace}</p>
								<h4>The space</h4>
								<p>{taborInfo.aboutTheSpaceCont}</p>
								<h4>Guest access</h4>
								<p>{taborInfo.guestAccess}</p>
								<h4>Other things to note</h4>
								<p>{taborInfo.otherThingsToNote}</p>
							</div>
						</div>
					</div>
				)}
				{seeMap && (
					<div className={Style.Modal}>
						<div className={Style.ModalBackground} onClick={() => setSeeMap(false)}></div>
						<div className={Style.Inner}>
							<div className={Style.Close} onClick={() => setSeeMap(false)}>
								<AiFillCloseCircle />
							</div>
							<div className={Style.Content}>Yo yo yo</div>
						</div>
					</div>
				)}
				{seeReviews && (
					<div className={Style.Modal}>
						<div className={Style.ModalBackground} onClick={() => setSeeReviews(false)}></div>
						<div className={Style.Inner}>
							<div className={Style.Close} onClick={() => setSeeReviews(false)}>
								<AiFillCloseCircle />
							</div>
							<div className={Style.Content}>Yo yo yo</div>
						</div>
					</div>
				)}
				{seeRules && (
					<div className={Style.Modal}>
						<div className={Style.ModalBackground} onClick={() => setSeeRules(false)}></div>
						<div className={Style.Inner}>
							<div className={Style.Close} onClick={() => setSeeRules(false)}>
								<AiFillCloseCircle />
							</div>
							<div className={Style.Content}>
								<h1>House Rules</h1>
								<p>
									Follow these rules to be a considerate guest and avoid any issues during your stay.
								</p>
								<h4>Who can stay</h4>
								<ul>
									<li>
										<div className={Style.Icon}>{houseRulesMain[0][1]}</div>
										<p>{houseRulesMain[0][0]}</p>
									</li>
									<li>
										<div className={Style.Icon}>{houseRulesMain[1][1]}</div>
										<p>{houseRulesMain[1][0]}</p>
									</li>
								</ul>
								<h4>What's allowed</h4>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
