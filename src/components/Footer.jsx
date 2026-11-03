import data from '../data/site.js';
import TLink from './TLink.jsx';
import CopyEmail from './CopyEmail.jsx';
import { usePageMeta } from '../context/PageContext.jsx';
import { SocialIcons } from './SocialIcon.jsx';
import FooterBrief from './FooterBrief.jsx';
import SignalLine from './SignalLine.jsx';

/*
 * Footer: the page's call to action and brief form on Paper, then the Ink
 * band (Signal Yellow edge) with the wordmark, contact details, address,
 * both link lists, and the bottom bar with the VS+ mark, copyright and
 * social icons.
 */
export default function Footer() {
	const { cta, page } = usePageMeta();
	const { site, services } = data;

	return (
		<footer className="siteFooter">
			<div className="footerLead">
				<div className="footerInner">
					<p className="eyebrow">Accepting select commercial briefs for 2026</p>
					<h2 className="footerTitle">{ cta.title }</h2>
					{ /* The contact page has its own brief form, so the footer keeps its plain call to action there. */ }
					<div className={ `footerLead_row${ page === 'contact' ? '' : ' footerLead_row--form' }` }>
						<p>{ cta.text }</p>
						{ page === 'contact'
							? <TLink className="pillBtn" to="/contact/#brief">{ cta.button }</TLink>
							: <FooterBrief /> }
					</div>
				</div>
			</div>

			<div className="footerBand inkBand">
				<SignalLine variant="wave" className="footerBand_lines" lines={ 7 } accent={ 3 } />
				<div className="footerInner">
					<div className="footerBand_top">
						<TLink to="/" className="footerBand_brand" aria-label="Visual Studios Plus — home">
							<span className="siteBrand_word" aria-hidden="true"></span>
						</TLink>
						<p className="footerBand_line">Brands built to be found, felt <span className="signalText">and followed.</span></p>
					</div>

					<div className="footerCols">
						<div className="footerCol">
							<p className="fLabel">Email the studio</p>
							<CopyEmail email={ site.email } />
							<p className="fLabel fLabel--gap">Call the studio</p>
							{ site.phones.map( ( p ) => (
								<a key={ p } className="fAction" href={ `tel:${ p.replace( /\s+/g, '' ) }` }>{ p }</a>
							) ) }
						</div>
						<div className="footerCol">
							<p className="fLabel">Visit the studio</p>
							<address className="fAddress">
								{ site.address.map( ( l ) => <span key={ l }>{ l }</span> ) }
							</address>
							<a className="plusLink" href={ site.maps } target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
						</div>
						<nav className="footerCol" aria-label="Footer">
							<p className="fLabel">Explore</p>
							<ul className="footerList">
								<li><TLink to="/">Home</TLink></li>
								<li><TLink to="/social-media-marketing/">Social Media Marketing</TLink></li>
								<li><TLink to="/web-development/">Web Development</TLink></li>
								<li><TLink to="/work/">Projects &amp; Archive</TLink></li>
								<li><TLink to="/photography/">Photography</TLink></li>
								<li><TLink to="/services/">Capabilities &amp; Services</TLink></li>
								<li><TLink to="/about/">About Studio</TLink></li>
								<li><TLink to="/contact/">Contact Studio</TLink></li>
							</ul>
						</nav>
						<div className="footerCol">
							<p className="fLabel">Services</p>
							<ul className="footerList">
								{ services.map( ( s ) => (
									<li key={ s[ 0 ] }><TLink to={ `/services/#${ s[ 0 ] }` }>{ s[ 1 ] }</TLink></li>
								) ) }
							</ul>
						</div>
					</div>

					<div className="footerBar">
						<TLink className="footerBar_mark" to="/" aria-label="Visual Studios Plus — home">
							<img src="/assets/img/VSP-Square-logo.png" alt="" />
						</TLink>
						<p className="footerBar_copy">© { new Date().getFullYear() } Visual Studios Plus. All rights reserved.</p>
						<SocialIcons items={ site.socials } className="socialIcons--footer" size={ 16 } />
					</div>
				</div>
			</div>
		</footer>
	);
}
