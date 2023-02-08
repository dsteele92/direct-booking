import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Style from './booking.module.scss';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { BsCalendarRange, BsPeopleFill } from 'react-icons/bs';
import { RxPerson } from 'react-icons/rx';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { add } from 'date-fns';

import { keys } from '../../api_keys.js';

import { imgUrl } from '../../firebase.js';

import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function Booking() {
	const [step, setStep] = useState(0);

	return (
		<div className={Style.Construction}>
			{/* <h2>Booking Currently Unavailable</h2> */}
			<div className={Style.Book}>
				<section>
					<h1>Check Availability</h1>
				</section>
				<section>
					<h1>Reserve</h1>
				</section>
				<section>
					<h1>Review & Pay</h1>
				</section>
			</div>
		</div>
	);
}
