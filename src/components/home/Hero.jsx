import { useLayoutEffect, useRef } from 'react';
import { canHover, gsap, reduced } from '../../lib/motion.js';
import TLink from '../TLink.jsx';
import SignalLine from '../SignalLine.jsx';

/* Hero copy from the brand guidelines (03 · Homepage hero). */
const LABEL = 'Creative agency · Colombo 04';
const LEDE = 'Photography, film and digital marketing that shapes how your brand looks, lives online and grows.';

/*
 * Client tiles under the headline: four of the studio's own campaigns, each
 * opening the flagship portfolio. Where the campaign has a film, it plays on
 * hover (muted, inline); the rest show the campaign still.
 */
const TILES = [
	{ client: 'Pond’s', work: 'Social campaign', img: '/assets/projects/ponds.jpg', video: '/assets/projects/ponds.mp4', alt: 'Still from the Pond’s Sri Lanka campaign reel', pos: '50% 56%' },
	{ client: 'Nescafé', work: 'Colombo Fashion Week', img: '/assets/projects/cases/nescafe-cfw.webp', alt: 'Nescafé at Colombo Fashion Week, photographed by Visual Studios Plus' },
	{ client: 'Heritance', work: 'Hospitality film', img: '/assets/projects/heritance.jpg', video: '/assets/projects/heritance.mp4', alt: 'Still from the Heritance Ayurveda hospitality film' },
	{ client: 'Dankotuwa', work: 'CGI campaign', img: '/assets/projects/dankotuwa.jpg', video: '/assets/projects/dankotuwa.mp4', alt: 'Still from the Dankotuwa Porcelain CGI campaign' }
];

function Tile( { t } ) {
	const video = useRef( null );
	const play = () => {
		const v = video.current;
		if ( v && canHover && ! reduced ) {
			v.preload = 'auto';
			v.play().catch( () => {} );
		}
	};
	const stop = () => {
		const v = video.current;
		if ( v ) {
			v.pause();
		}
	};
	return (
		<li className="heroTile">
			<TLink to="/work/#case-studies" className="heroTile_link" onMouseEnter={ play } onMouseLeave={ stop } onFocus={ play } onBlur={ stop }>
				<span className="heroTile_media">
					<img src={ t.img } alt={ t.alt } decoding="async" style={ t.pos && { objectPosition: t.pos } } />
					{ t.video && canHover && ! reduced && (
						<video ref={ video } src={ t.video } muted loop playsInline preload="none" aria-hidden="true" tabIndex={ -1 }
							style={ t.pos && { objectPosition: t.pos } } />
					) }
				</span>
				<span className="heroTile_text">
					<span className="heroTile_client">{ t.client }</span>
					<span className="heroTile_work">{ t.work }</span>
				</span>
			</TLink>
		</li>
	);
}

/*
 * Home hero — the first screen of the Signal Yellow system: Ink surface, the
 * Ink band with its Signal Yellow edge down the left, light Jost headline with
 * one Signal Yellow phrase, the Signal Yellow line sweeping up the right, and
 * the studio's own campaigns as proof underneath. The header carries the one
 * Signal Yellow button, so the hero's actions stay monochrome.
 */
export default function Hero() {
	const root = useRef( null );

	useLayoutEffect( () => {
		if ( reduced ) {
			return undefined;
		}
		const ctx = gsap.context( () => {
			gsap.timeline( { delay: 0.15 } )
				.from( '.vsHero_row > span', { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.12 } )
				.from( '.vsHero_inner .eyebrow, .vsHero_lede, .vsHero_actions', { y: 18, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, '<0.25' )
				.from( '.heroTile', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.07 }, '<0.2' )
				.fromTo( '.vsHero .signalLine_signal', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0 )
				.from( '.vsHero .signalLine_mist', { opacity: 0, duration: 1.6, ease: 'power1.out' }, 0.3 );
		}, root );
		return () => ctx.revert();
	}, [] );

	return (
		<section className="vsHero" aria-labelledby="hero-title" ref={ root }>
			<div className="vsHero_band" aria-hidden="true">
				<span className="vsHero_mark"></span>
				<span className="plus">+</span>
			</div>
			<SignalLine className="vsHero_lines" />

			<div className="vsHero_inner">
				<p className="eyebrow">{ LABEL }</p>
				<h1 id="hero-title" className="vsHero_title">
					<span className="vsHero_row"><span>Brands built to be found,</span></span>{ ' ' }
					<span className="vsHero_row"><span>felt <em className="signalText">and followed.</em></span></span>
				</h1>
				<p className="vsHero_lede">{ LEDE }</p>
				<p className="vsHero_actions">
					<TLink className="btn btn--ghost" to="/work/">View work</TLink>
					<TLink className="plusLink" to="/services/">Explore services</TLink>
				</p>
				<ul className="vsHero_tiles" aria-label="Selected campaigns">
					{ TILES.map( ( t ) => <Tile key={ t.client } t={ t } /> ) }
				</ul>
			</div>
		</section>
	);
}
