import React, { useState, useEffect, useRef } from 'react';
import Style from './app.module.scss';
import { BookingWeb, BookingMobile, GalleryWeb, GalleryMobile, AmenitiesMatrix, AmenitiesMobile } from 'components';
import { taborInfo, amenitiesIconData, hostIntro, houseRulesMain, highlightedReviews } from 'content';
import { BsDoorClosed, BsDoorOpen, BsStarFill, BsCalendarRange, BsArrowDown } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TfiArrowCircleRight } from 'react-icons/tfi';

function App() {
	// for opening page enter button -->
	// const [enter, setEnter] = useState(false);
	const [top, setTop] = useState(true);
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
	// ----->
	const intro = useRef();
	const amenities = useRef();
	const host = useRef();

	useEffect(() => {
		const handleScroll = (event) => {
			// ------------------------VARIABLES------------------------>
			// amount scrolled:
			const scrollTop = event.target.scrollTop;
			// height of main window:
			const windowHeight = main.current.clientHeight;
			// total scrollable pixels of app:
			const total = main.current.scrollHeight - main.current.clientHeight;

			// ------------------------PARALLAX------------------------>
			const delta = ((scrollTop - windowHeight) / (2.5 * windowHeight)) * 16;
			// parralax amenities matrix only displayed above breakpoint-small ----->
			if (window.innerWidth >= 750) {
				matrixEven.current.style.transform = `translateY(${-8 + delta}%)`;
				matrixOdd.current.style.transform = `translateY(${8 - delta}%)`;
			}

			// ------------------------STATE CHANGES------------------------>
			if (scrollTop > 10) {
				setTop(false);
			} else {
				setTop(true);
			}

			const percentScrolled = scrollTop / total;
			if (percentScrolled < 0.55) {
				setScroll(0);
			} else if (percentScrolled >= 0.55 && percentScrolled < 0.85) {
				setScroll(1);
			} else if (percentScrolled >= 0.85) {
				setScroll(2);
			}
		};

		const mainCurrent = main.current;
		mainCurrent.addEventListener('scroll', handleScroll);
		return () => {
			mainCurrent.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={Style.App}>
			<div className={Style.BookingWeb}>
				<div className={Style.Nav}>
					<nav>
						<ul>
							<li onClick={() => intro.current.scrollIntoView({ behavior: 'smooth' })}>Gallery</li>
							<li onClick={() => amenities.current.scrollIntoView({ behavior: 'smooth' })}>Amenities</li>
							<li onClick={() => host.current.scrollIntoView({ behavior: 'smooth' })}>Host</li>
						</ul>
					</nav>
					<div>
						<div className={Style.Book}>
							<h4>BOOK</h4>
							<div className={Style.Icon}>
								<TfiArrowCircleRight />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={Style.Window}>
				<main className={Style[`Main${scroll}`]} ref={main}>
					<div className={Style.HomeBanner}>
						<div className={Style.BackgroundPhoto}>
							<div className={Style.Tint}></div>
						</div>
						<div className={Style.MainHeader}>
							<h1>{taborInfo.mainHeader}</h1>
							<h3>{taborInfo.subHeader}</h3>
						</div>
						<div className={Style.Scroll}>
							<div className={Style.Door}>
								<div className={top ? Style.Current : ''}>
									<BsDoorClosed />
								</div>
								<div className={!top ? Style.Current : ''}>
									<BsDoorOpen />
								</div>
							</div>
							<div className={Style.Arrow}>
								<div className={Style.Bounce}>
									<BsArrowDown />
								</div>
							</div>
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
					<section className={Style.Description} ref={intro}>
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
					<section className={Style.AmenitiesWeb} ref={amenities}>
						<div className={Style.Header}>
							<h2>Our Amenities:</h2>
							<h4
								className={Style.ShowAll}
								onMouseEnter={() => setShowAll(true)}
								onMouseLeave={() => setShowAll(false)}>
								Show All
							</h4>
						</div>
						<div className={Style.MatrixContainer}>
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
						</div>
					</section>
					<section className={Style.AmenitiesMobile}>
						<AmenitiesMobile scroll={scroll} />
					</section>
					<section className={Style.Host} ref={host}>
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
									extinct volcano just a short 5-minute walk from here. The park features numerous
									walking paths, tennis courts, basketball courts, majestic fir trees, and
									breathtaking panoramic views of the city and water reservoirs at the peak of the
									park.
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
				</main>
			</div>
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
							<p>Follow these rules to be a considerate guest and avoid any issues during your stay.</p>
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
		</div>
	);
}

export default App;
