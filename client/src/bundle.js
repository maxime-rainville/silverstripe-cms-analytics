// require google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

document.addEventListener('DOMContentLoaded', () => {

  ga('create', window.ss.analytics['primary_ua']);

  ga('set', {
    'dimension1': window.ss.analytics['environment'],
    'dimension2': window.ss.analytics['cms_version'],
    'dimension3': window.ss.analytics['cms_version_number'],
    'dimension4': window.ss.analytics['permissions'],
    'dimension5': window.ss.analytics['controller'],
  });

  // window.ss.router('*', ({path}) => {
  //   ga('set', 'page', path);
  //   console.log(path);
  //   ga('send', 'pageview', path);
  // });

  // send click events
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
