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
        <link crossOrigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.1.0/octicons.min.css" media="all" rel="stylesheet" />
        <link crossOrigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
        <link crossOrigin="anonymous" href="https://assets-cdn.github.com/pinned-octocat.svg" rel="icon" sizes="any" mask="" />
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
        <div className="col-md-12">
            <div className="row hidden-sm hidden-xs" style={{height: "36px", maxHeight: "36px" }} />
            <div className="row" style={{height: "15px", maxHeight: "15px" }} />
            <div className="row">
                <div className="col-md-3 hidden-sm hidden-xs" itemScope="" itemType="http://schema.org/Person" style={{padding: "0 51px"}}>
                    <a href="/" rel="prev">
                        <img alt="avatar" className="avatar hidden-sm hidden-xs" height="auto" src="https://avatars1.githubusercontent.com/u/624757?v=3&amp;s=460" width="100%" />
                    </a>

                    <a href="/" rel="prev">
                        <h2 className="vcard-names">
                            <span className="vcard-username" itemProp="additionalName">randyp</span>
                        </h2>
                    </a>

                    <ul className="vcard-details">
                    <li className="vcard-detail hidden-sm hidden-xs" itemProp="homeLocation" title="Portland, OR"><span className="octicon octicon-location" /> Portland, OR</li>
                    <li className="vcard-detail hidden-sm hidden-xs"><span className="octicon octicon-mail"/> <a className="email" href="mailto:%72%73%70%65%6e%73%69%6e%67%65%72@%67%6d%61%69%6c.%63%6f%6d">rspensinger@gmail.com</a></li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <div>
                        <a href="/" rel="prev"><h3 className="article-header"><span className="octicon octicon-book"/> <span className='current-file'>randyp.md</span></h3></a>
                        <article className="markdown-body">
                            {main}
                        </article>
                    </div>
                    <footer><p>&copy; Randy Pensinger</p></footer>
                </div>
                <div className="col-md-1">
                </div>
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
	main: PropTypes.node.isRequired
};

Page.defaultProps = {};

export default Page;
