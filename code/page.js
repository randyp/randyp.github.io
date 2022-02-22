import PropTypes from 'prop-types';
import React from 'react';


/**
 * The page layout component
 */
const Page = ({ title, stylesheet, main, script, _relativeURL, _ID }) => (
	<html>
	<head>
		<title>{ title }</title>
		<meta charSet="utf-8" />
		<meta httpEquiv="x-ua-compatible" content="ie=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link rel="stylesheet" href={ _relativeURL( `/assets/css/site.css`, _ID ) } />
        <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.1.0/octicons.min.css" media="all" rel="stylesheet" />
        <link crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
        <link crossorigin="anonymous" href="https://assets-cdn.github.com/pinned-octocat.svg" rel="icon" sizes="any" mask="" />
        <link rel="mask-icon" href="https://github.githubassets.com/pinned-octocat.svg" color="#000000" />
        <link rel="alternate icon" className="js-site-favicon" type="image/png" href="https://github.githubassets.com/favicons/favicon-dark.png" />
        <link rel="icon" className="js-site-favicon" type="image/svg+xml" href="https://github.githubassets.com/favicons/favicon-dark.svg" />
		{
			stylesheet != undefined
				? ( <link rel="stylesheet" href={ _relativeURL( `/assets/css/${ stylesheet }.css`, _ID ) } /> )
				: null
		}
	</head>
	<body>
        <div className="row">
            <div className="col-md-3" itemscope="" itemtype="http://schema.org/Person" style={{padding: "51px"}}>
                <img alt="" className="avatar" height="auto" src="https://avatars1.githubusercontent.com/u/624757?v=3&amp;s=460" width="100%" />

                <h2 className="vcard-names">
                    <span className="vcard-username" itemprop="additionalName">randyp</span>
                </h2>

                <ul className="vcard-details">
                <li className="vcard-detail" itemprop="homeLocation" title="Portland, OR"><span className="octicon octicon-location"></span> Portland, OR</li>
                <li className="vcard-detail"><span className="octicon octicon-mail"></span> <a className="email" href="mailto:%72%73%70%65%6e%73%69%6e%67%65%72@%67%6d%61%69%6c.%63%6f%6d">rspensinger@gmail.com</a></li>
                </ul>
            </div>
            <div className="col-md-8">
                <div>
                    <h3 className="article-header" href="/index.html"><span className="octicon octicon-book"></span> <span className='current-file'>README.md</span></h3>
                    <article className="markdown-body">{main}</article>
                </div>
                <footer><p>&copy; Randy Pensinger</p></footer>
            </div>
            <div className="col-md-1">
            </div>
		</div>
		{
			script != undefined
				? ( <script src={ _relativeURL( `/assets/js/${ script }.js`, _ID ) } /> )
				: null
		}
	</body>
	</html>
);

Page.propTypes = {
	title: PropTypes.string.isRequired,
	main: PropTypes.node.isRequired,
};

Page.defaultProps = {};

export default Page;
