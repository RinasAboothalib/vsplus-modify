import TLink from '../TLink.jsx';

/* Company facts (from the About page), set in the Ink band. */
const FACTS = [
	[ 'Colombo 04', 'Studio, Sri Lanka' ],
	[ '50+', 'Premier brands partnered' ],
	[ '10M+', 'Organic digital views' ],
	[ '100%', 'In-house production' ]
];

/*
 * Home "Studio": the studio's introduction and manifesto (previously read
 * word by word in the hero's scroll sequence), one production still, and the
 * company facts on an Ink band with its Signal Yellow edge.
 */
export default function StudioIntro() {
	return (
		<section className="studioIntro" id="studio" aria-labelledby="studioTitle">
			<div className="studioIntro_inner">
				<div className="studioIntro_text">
					<p className="eyebrow">(01) The studio</p>
					<h2 className="sectionTitle" id="studioTitle">Visual Studios Plus shape how your brand looks, how it lives online, and how it grows.</h2>
					<div className="studioIntro_body">
						<p>Visual Studios Plus is a Colombo-based digital agency for brands that want to be found, felt, and followed. We bring branding, website development, and digital marketing together under one roof for FMCG, food &amp; beverage, fashion, and luxury hospitality brands.</p>
						<p>From brand strategy to website launch to the last campaign optimisation, everything is built in-house and measured against real commercial results. We partner with ambitious brands to command attention and deliver verified commercial growth.</p>
					</div>
					<p className="studioIntro_links">
						<TLink className="plusLink" to="/about/">About the studio</TLink>
						<TLink className="plusLink" to="/contact/">Contact the studio</TLink>
					</p>
				</div>
				<figure className="studioIntro_img">
					<img src="/assets/img/yt-d-_dQ9-LmxE.jpg" alt="Chef Peter Kuruvita on set for ITC Rathnadeepa" loading="lazy" decoding="async" />
					<figcaption>On set · ITC Rathnadeepa</figcaption>
				</figure>
			</div>
			<ul className="inkBand studioFacts" aria-label="Studio facts">
				{ FACTS.map( ( [ num, label ] ) => (
					<li key={ label }><span className="studioFacts_num">{ num }</span><span className="studioFacts_label">{ label }</span></li>
				) ) }
			</ul>
		</section>
	);
}
