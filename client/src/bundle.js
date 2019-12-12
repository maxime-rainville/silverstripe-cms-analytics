document.addEventListener('DOMContentLoaded', () => {
  window.ss.router((context, next) => {
    let path = context.path;

    // update the current page
    ga('set', 'page', path);

    // send the pageview event
    ga('send', 'pageview', path);

    // trigger the next callback
    next();
  });

  // send click events
  jQuery("body").on("click", ".btn.action", (event) => {
    const target = jQuery(event.currentTarget);
    ga(
      'send',
      'event',
      window.ss.analytics['controller'],
      target.attr('name'),
      target.text(),
      1
    );
  })

  // send react router events
  // todo:
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
