import { React, useState, useEffect, useRef } from 'react';

export default function useIsIntersecting(options) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const section = useRef();

	useEffect(() => {
		const entries = section.current;
		const observer = new IntersectionObserver((entries, observer) => {
			const [entry] = entries;
			setIsIntersecting(entry.isIntersecting);
		});

		observer.observe(entries);

		return () => {
			observer.unobserve(entries);
		};
	}, [options]);

	return [section, isIntersecting];
}
