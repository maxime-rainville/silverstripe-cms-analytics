import gtag from './gtag';
import $ from 'jquery';
import TrackingConsentModal from 'containers/TrackingConsentModal/TrackingConsentModal';
import ReactDOM from 'react-dom';
import Config from 'lib/Config';

const readConsent = () => {
  const data = localStorage.getItem('ss-tracking-consent');
  return data ? JSON.parse(data) : null;
};

const writeConsent = (data = {hasConsent, version}) => {
  localStorage.setItem('ss-tracking-consent', JSON.stringify(data));
};

const hasConsent = (currentVersion, data = {hasConsent, version}) => {
  return (
    version == currentVersion
    && hasConsent
  );
}

$.entwine('ss', function($){
  // TODO Hook into React app lifecycle once we no longer have entwine-powered views
  $('.js-react-boot').entwine({
    onmatch: function() {
      const consentData = readConsent();
      const container = document.createElement('div');
      const config = Config.getSection('SilverStripe\\Admin\\LeftAndMain').cmsAnalytics;
      container.setAttribute('class', 'tracking-consent-modal-container');
      if (!consentData || !hasConsent(config.version, consentData)) {
        ReactDOM.render(
          <TrackingConsentModal
            content={config.content}
            onGrant={() => {
              writeConsent({ hasConsent: true, version: config.version})
            }}
            onDeny={() => {
              writeConsent({ hasConsent: false, version: config.version})
            }}
          />,
          document.body.appendChild(container)
        );
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {

  // gtag('js', new Date());
  // gtag('config', window.ss.analytics['primary_ua']);
  // ga('create', window.ss.analytics['primary_ua']);

  // ga('set', {
  //   'dimension1': window.ss.analytics['environment'],
  //   'dimension2': window.ss.analytics['cms_version'],
  //   'dimension3': window.ss.analytics['cms_version_number'],
  //   'dimension4': window.ss.analytics['permissions'],
  //   'dimension4': window.ss.analytics['controller'],
  // });

  // window.ss.router.subscribe(({path}) => {
  //   ga('set', 'page', path);
  //   console.log(path);
  //   ga('send', 'pageview', path);
  // });

  // jQuery( "body" ).on( "click", ".btn.action", (event) => {
  //   const target = jQuery(event.currentTarget);
  //   console.dir(target);
  //   ga(
  //     'send',
  //     'event',
  //     window.ss.analytics['controller'],
  //     target.attr('name'),
  //     target.text(),
  //     1
  //   );
  // })

  // reactRouteRegister.add({
   //   path: sectionConfig.url,
   //   component: AssetAdminRouter,
   //   indexRoute: { component: AssetAdminRouter },
   //   childRoutes: [
   //     {
   //       path: 'show/:folderId/:viewAction/:fileId',
   //       component: AssetAdminRouter,
   //     },
   //     {
   //       path: 'show/:folderId/:viewAction',
   //       component: AssetAdminRouter,
   //     },
   //     {
   //       path: 'show/:folderId',
   //       component: AssetAdminRouter,
   //     },
   //   ],
   // });

 });
