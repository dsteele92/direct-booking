import { AiOutlineWifi, AiOutlineCar } from 'react-icons/ai';
import {
	MdOutlinePark,
	MdLocalLaundryService,
	MdIron,
	MdKitchen,
	MdMicrowave,
	MdOutlineCoffeeMaker,
} from 'react-icons/md';
import { TbToolsKitchen, TbHanger, TbTemperature } from 'react-icons/tb';
import { GiThermometerCold, GiCctvCamera, GiSoap, GiTowel, GiFireplace, GiCook, GiWineGlass } from 'react-icons/gi';
import { FaShower, FaFireExtinguisher } from 'react-icons/fa';
import { BiFirstAid } from 'react-icons/bi';
import { TfiGame } from 'react-icons/tfi';
import { HiOutlineKey } from 'react-icons/hi';
import { BsDoorClosed, BsTv } from 'react-icons/bs';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { IoIosBed, IoMdKeypad } from 'react-icons/io';

export const amenitiesIconData = [
	['Wifi', <AiOutlineWifi />],
	['Park View', <MdOutlinePark />],
	['65 Inch HDTV with Netflix', <BsTv />],
	['Central AC', <GiThermometerCold />],
	['Central Heating', <TbTemperature />],
	['Washer & Dryer', <MdLocalLaundryService />],
	['Full Kitchen', <MdKitchen />],
	['Microwave', <MdMicrowave />],
	['Coffee Maker', <MdOutlineCoffeeMaker />],
	['Cooking Basics', <TbToolsKitchen />],
	['Oven and Electric Stove', <GiCook />],
	['Closet Space', <TbHanger />],
	['Iron', <MdIron />],
	['Bed Linens, Pillows, Blankets', <IoIosBed />],
	['Hot Water', <FaShower />],
	['Soap & Shower Gel', <GiSoap />],
	['Towels', <GiTowel />],
	['Game Console', <TfiGame />],
	['Fireplace', <GiFireplace />],
	['Wine Glasses', <GiWineGlass />],
	['Fire Extinguisher', <FaFireExtinguisher />],
	['First Aid Kit', <BiFirstAid />],
	['Smoke Alarm', <RiAlarmWarningLine />],
	['Security Cameras on Property', <GiCctvCamera />],
	['Private Entrance', <BsDoorClosed />],
	['Self Check-in', <HiOutlineKey />],
	['Smart Lock', <IoMdKeypad />],
	['Parking (2 spaces)', <AiOutlineCar />],
];
