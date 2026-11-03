import SignalLine from './SignalLine.jsx';

/*
 * Inner-page header on Ink, after the guideline section covers ("Website+"):
 * label, light two-line title signed off with the Signal Yellow "+", lede, and
 * the Signal Yellow line sweeping up the right-hand side.
 */
export default function PageHero( { eyebrow, lines, lede, children, className = '' } ) {
	return (
		<header className={ `pageHero ${ className }` }>
			<SignalLine className="pageHero_lines" />
			<div className="pageHero_inner">
				<p className="eyebrow">{ eyebrow }</p>
				<h1 className="pageTitle">
					{ lines.map( ( l, i ) => (
						<span className="pageTitle_line" key={ l }>
							{ l }{ i === lines.length - 1 ? <span className="plus" aria-hidden="true">+</span> : ' ' }
						</span>
					) ) }
				</h1>
				{ lede && <p className="pageLede">{ lede }</p> }
				{ children }
			</div>
		</header>
	);
}
