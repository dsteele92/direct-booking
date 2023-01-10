import { BsPeople, BsDoorOpen } from 'react-icons/bs';
import { MdPets } from 'react-icons/md';
import { SlClock } from 'react-icons/sl';
import { TbSmokingNo } from 'react-icons/tb';

export const houseRulesMain = [
	['10 guests maximum', <BsPeople />],
	['No pets', <MdPets />],
	['Check-in after 4:00 PM', <SlClock />],
	['Check-out before 11:00 AM', <SlClock />],
	['Self check-in with smart lock', <BsDoorOpen />],
	['No smoking', <TbSmokingNo />],
];
