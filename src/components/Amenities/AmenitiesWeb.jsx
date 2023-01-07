import React, { useState, useEffect } from 'react';
import Style from './amenitiesWeb.module.scss';
import { AiOutlineWifi, AiOutlineCar } from 'react-icons/ai';
import {
	MdOutlinePark,
	MdLocalLaundryService,
	MdIron,
	MdKitchen,
	MdMicrowave,
	MdOutlineCoffeeMaker,
} from 'react-icons/md';
import { TbToolsKitchen, TbHanger } from 'react-icons/tb';
import { GiThermometerCold, GiCctvCamera, GiSoap, GiTowel, GiFireplace, GiCook, GiWineGlass } from 'react-icons/gi';
import { FaShower, FaFireExtinguisher } from 'react-icons/fa';
import { CiTempHigh } from 'react-icons/ci';
import { BiFirstAid } from 'react-icons/bi';
import { TfiGame } from 'react-icons/tfi';
import { HiOutlineKey } from 'react-icons/hi';
import { BsDoorClosed, BsTv } from 'react-icons/bs';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { IoIosBed, IoMdKeypad } from 'react-icons/io';

export default function AmenitiesWeb(props) {
	return (
		<div className={Style.Amenities}>
			<div className={Style.Matrix}>
				<div className={Style.Amenity1}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<AiOutlineWifi />
					</div>
				</div>
				<div className={Style.Amenity2}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<MdOutlinePark />
					</div>
				</div>
				<div className={Style.Amenity3}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<BsTv />
					</div>
				</div>
				<div className={Style.Amenity4}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<GiThermometerCold />
					</div>
				</div>
				<div className={Style.Amenity5}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<CiTempHigh />
					</div>
				</div>
				<div className={Style.Amenity6}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<MdLocalLaundryService />
					</div>
				</div>
				<div className={Style.Amenity7}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<MdKitchen />
					</div>
				</div>
				<div className={Style.Amenity8}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<MdMicrowave />
					</div>
				</div>
				<div className={Style.Amenity9}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<MdOutlineCoffeeMaker />
					</div>
				</div>
				<div className={Style.Amenity10}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<TbToolsKitchen />
					</div>
				</div>
				<div className={Style.Amenity11}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<GiCook />
					</div>
				</div>
				<div className={Style.Amenity12}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<TbHanger />
					</div>
				</div>
				<div className={Style.Amenity13}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<MdIron />
					</div>
				</div>
				<div className={Style.Amenity14}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<IoIosBed />
					</div>
				</div>
				<div className={Style.Amenity15}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<FaShower />
					</div>
				</div>
				<div className={Style.Amenity16}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<GiSoap />
					</div>
				</div>
				<div className={Style.Amenity17}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<GiTowel />
					</div>
				</div>
				<div className={Style.Amenity18}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<TfiGame />
					</div>
				</div>
				<div className={Style.Amenity19}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<GiFireplace />
					</div>
				</div>
				<div className={Style.Amenity20}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<GiWineGlass />
					</div>
				</div>
				<div className={Style.Amenity21}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<FaFireExtinguisher />
					</div>
				</div>
				<div className={Style.Amenity22}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<BiFirstAid />
					</div>
				</div>
				<div className={Style.Amenity23}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<GiCctvCamera />
					</div>
				</div>
				<div className={Style.Amenity24}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<BsDoorClosed />
					</div>
				</div>
				<div className={Style.Amenity25}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<HiOutlineKey />
					</div>
				</div>
				<div className={Style.Amenity26}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<IoMdKeypad />
					</div>
				</div>
				<div className={Style.Amenity27}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${props.offset}%` }}>
						<RiAlarmWarningLine />
					</div>
				</div>
				<div className={Style.Amenity28}>
					<div
						className={`${Style.Icon} ${props.scroll ? Style.Scroll : ''}`}
						style={{ bottom: `${0.5 * props.offset}%` }}>
						<AiOutlineCar />
					</div>
				</div>
			</div>
		</div>
	);
}
