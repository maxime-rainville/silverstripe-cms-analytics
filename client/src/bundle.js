import gtag from './gtag';


document.addEventListener('DOMContentLoaded', () => {

  gtag('js', new Date());
  gtag('config', window.ss.analytics['primary_ua']);
  ga('create', window.ss.analytics['primary_ua']);

  ga('set', {
    'dimension1': window.ss.analytics['environment'],
    'dimension2': window.ss.analytics['cms_version'],
    'dimension3': window.ss.analytics['cms_version_number'],
    'dimension4': window.ss.analytics['permissions'],
    'dimension4': window.ss.analytics['controller'],
  });

  window.ss.router.subscribe(({path}) => {
    ga('set', 'page', path);
    console.log(path);
    ga('send', 'pageview', path);
  });

  jQuery( "body" ).on( "click", ".btn.action", (event) => {
    const target = jQuery(event.currentTarget);
    console.dir(target);
    ga(
      'send',
      'event',
      window.ss.analytics['controller'],
      target.attr('name'),
      target.text(),
      1
    );
  })

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
