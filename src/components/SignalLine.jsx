/*
 * The Signal Yellow line (brand guidelines, 00 · Graphic elements): fine Mist
 * wave lines from the letterhead, with one line picked out in Signal Yellow.
 *
 *   sweep — rises from the bottom left and bends up and away to the top right
 *           (cover and homepage hero)
 *   wave  — runs across, for bands and section edges
 */
const PATHS = {
	sweep: {
		box: '0 0 640 900',
		d: 'M-40 940 C 200 860 470 760 470 560 C 470 380 330 300 390 170 C 430 80 540 40 700 20',
		step: [ 13, 0 ],
		fit: 'xMidYMid slice'
	},
	wave: {
		box: '0 0 1200 240',
		d: 'M-20 170 C 220 70 420 70 600 140 C 780 210 980 220 1220 90',
		step: [ 0, 9 ],
		fit: 'none'
	}
};

export default function SignalLine( { variant = 'sweep', lines = 9, accent = 4, className = '' } ) {
	const { box, d, step, fit } = PATHS[ variant ];
	const offset = ( i ) => `translate(${ ( i - accent ) * step[ 0 ] } ${ ( i - accent ) * step[ 1 ] })`;
	return (
		<svg className={ `signalLine signalLine--${ variant } ${ className }` } viewBox={ box } preserveAspectRatio={ fit }
			aria-hidden="true" focusable="false">
			{ Array.from( { length: lines }, ( _, i ) => i !== accent && (
				<path key={ i } className="signalLine_mist" d={ d } transform={ offset( i ) } />
			) ) }
			<path className="signalLine_signal" d={ d } pathLength="1" />
		</svg>
	);
}
