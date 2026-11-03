import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import data from '../data/site.js';
import { gsap, reduced, startScroll, stopScroll } from '../lib/motion.js';
import { useTransition } from '../context/TransitionContext.jsx';
import { SocialIcons } from './SocialIcon.jsx';
import TLink from './TLink.jsx';

/*
 * Header bar (brand guidelines, 03 · The first screen): the full wordmark,
 * Work · Services · Studio, and Start a project as the one Signal Yellow
 * button. "Studio" is the About page.
 */
const PRIMARY = [
	[ '/work/', 'Work', [ 'work', 'photography' ] ],
	[ '/services/', 'Services', [ 'services', 'social-media-marketing', 'web-development' ] ],
	[ '/about/', 'Studio', [ 'about' ] ]
];

/* The menu keeps every route, with the client's two lead services (Oct 24 revision) first among the services. */
const MENU = [
	[ '/work/', 'Work', 'work' ],
	[ '/photography/', 'Photography', 'photography' ],
	[ '/services/', 'Services', 'services' ],
	[ '/social-media-marketing/', 'Social Media Marketing', 'social-media-marketing' ],
	[ '/web-development/', 'Web Development', 'web-development' ],
	[ '/about/', 'Studio', 'about' ],
	[ '/contact/', 'Contact', 'contact' ]
];

export default function Nav() {
	const location = useLocation();
	const navigate = useNavigate();
	const { register } = useTransition();
	const [ open, setOpen ] = useState( false );
	const toggle = useRef( null );
	const panel = useRef( null );
	const curtain = useRef( null );

	const page = location.pathname.split( '/' )[ 1 ] || 'home';

	const setMenu = useCallback( ( next ) => {
		setOpen( next );
		document.body.classList.toggle( 'menu-open', next );
		if ( next ) {
			stopScroll();
		} else {
			startScroll();
		}
	}, [] );

	// Focus follows the menu: into the first link on open, back to the toggle on close.
	const wasOpen = useRef( false );
	useEffect( () => {
		if ( open ) {
			const first = panel.current.querySelector( '.menuItems a' );
			setTimeout( () => first && first.focus( { preventScroll: true } ), reduced ? 0 : 120 );
		} else if ( wasOpen.current && toggle.current ) {
			toggle.current.focus( { preventScroll: true } );
		}
		wasOpen.current = open;
	}, [ open ] );

	useEffect( () => {
		const onKey = ( e ) => {
			if ( e.key === 'Escape' && document.body.classList.contains( 'menu-open' ) ) {
				setMenu( false );
			}
		};
		document.addEventListener( 'keydown', onKey );
		return () => document.removeEventListener( 'keydown', onKey );
	}, [ setMenu ] );

	// The bar turns solid Ink once the page has moved under it.
	useEffect( () => {
		const check = () => document.body.classList.toggle( 'is-scrolled', window.scrollY > 24 );
		check();
		window.addEventListener( 'scroll', check, { passive: true } );
		return () => window.removeEventListener( 'scroll', check );
	}, [] );

	// Route transitions: an Ink band with a Signal Yellow edge rises over the page and lifts away.
	useEffect( () => {
		const el = curtain.current;
		let covered = false;
		// GSAP would read the stylesheet's translateY(100%) as a pixel offset; own the transform as yPercent only.
		gsap.set( el, { y: 0, yPercent: 100 } );
		register( {
			cover( done ) {
				covered = true;
				gsap.fromTo( el, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power3.inOut', overwrite: 'auto', onComplete: done } );
			},
			reveal() {
				if ( ! covered ) {
					return;
				}
				covered = false;
				gsap.to( el, { yPercent: -100, duration: 0.7, ease: 'power3.inOut', overwrite: 'auto', delay: 0.05 } );
			}
		} );
	}, [ register ] );

	// Leaving the page closes the menu.
	useEffect( () => {
		setMenu( false );
	}, [ location.pathname, setMenu ] );

	const onMenuLink = ( e, to ) => {
		e.preventDefault();
		const samePage = new URL( to, window.location.href ).pathname === location.pathname;
		setMenu( false );
		if ( ! samePage ) {
			navigate( to );
		}
	};

	return (
		<>
			<header className="siteHeader">
				<div className="siteHeader_inner">
					<TLink to="/" className="siteBrand" aria-label="Visual Studios Plus — home">
						<span className="siteBrand_word" aria-hidden="true"></span>
					</TLink>
					<nav className="siteNav" aria-label="Main">
						<ul className="siteNav_list">
							{ PRIMARY.map( ( [ to, label, keys ] ) => (
								<li key={ to }>
									<TLink to={ to } className="siteNav_link" aria-current={ keys.includes( page ) ? 'page' : undefined }>{ label }</TLink>
								</li>
							) ) }
						</ul>
						<TLink to="/contact/" className="btn btn--signal siteNav_cta" aria-current={ page === 'contact' ? 'page' : undefined }>Start a project</TLink>
						<button type="button" className="menuToggle" ref={ toggle } aria-expanded={ open } aria-controls="vsMenuPanel"
							onClick={ () => setMenu( ! open ) }>
							<span className="menuToggle_label">{ open ? 'Close' : 'Menu' }</span>
							<span className="menuToggle_icon" aria-hidden="true"></span>
						</button>
					</nav>
				</div>
			</header>

			<div className={ `menuWrap${ open ? ' is-open' : '' }` } id="vsMenuPanel" ref={ panel } inert={ ! open }
				role="dialog" aria-modal="true" aria-label="Site menu">
				<div className="menuWrap_row">
					<div className="menuWrap_links">
						<p className="eyebrow">Menu</p>
						<ul className="menuItems">
							{ MENU.map( ( [ to, label, key ], i ) => (
								<li key={ key } style={ { '--i': i } }>
									<a href={ to } onClick={ ( e ) => onMenuLink( e, to ) }
										className={ page === key ? 'is-current' : undefined }
										aria-current={ page === key ? 'page' : undefined }>{ label }</a>
								</li>
							) ) }
						</ul>
					</div>
					<div className="menuWrap_side">
						<p className="menuWrap_note">We create. We strategize. We execute.<br />We amplify. We measure. We grow.</p>
						<p className="menuWrap_contact">
							<a href={ `mailto:${ data.site.email }` }>{ data.site.email }</a><br />
							{ data.site.phones.map( ( p ) => (
								<span key={ p }><a href={ `tel:${ p.replace( /\s+/g, '' ) }` }>{ p }</a><br /></span>
							) ) }
							<span className="menuWrap_addr">{ data.site.address.join( ', ' ) }</span>
						</p>
						<a href="/contact/" className="btn btn--signal" onClick={ ( e ) => onMenuLink( e, '/contact/' ) }>Start a project</a>
						<SocialIcons items={ data.site.socials } className="socialLinks" size={ 20 } />
					</div>
				</div>
			</div>

			<div className="pageCurtain" ref={ curtain } aria-hidden="true">
				<span className="pageCurtain_mark"></span>
			</div>
		</>
	);
}
