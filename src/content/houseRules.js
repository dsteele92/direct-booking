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

export const additionalRules = [
	'Please NO SHOES on the carpet. Cleaning charges may apply.',
	'Please NO SMOKING/VAPING. Cleaning charges may apply.',
	'The whole property has a NO PET POLICY. Extra charges may apply.',
	'Please make sure to recycle and dispose of garbage properly in the right containers. If it is found that all items are put in trash and no recycling was separated then extra charges may apply.',
	'Quiet hours are from 10 PM to 7 AM so please be mindful of your noise levels. Any parties held at the home or loud events will result in an automatic $100 fine or more.',
	'If you break any furniture or appliances please report it immediately.',
	'No unregistered guests allowed.',
	'Please don’t eat or drink in the bedrooms.',
	'Please respect the noise curfew.',
	'Please respect check-in and check-out times.',
	'Please take care of the furnishings. You have to pay for damages that *exceed the security deposit.',
	'Please don’t rearrange the furniture.',
	'Please do your dishes.',
	'No illegal substances allowed on the premises.',
	'Please leave the home the way you would leave your own home. If the home is left dirtier then normal you may be charged an extra cleaning fee.',
];
