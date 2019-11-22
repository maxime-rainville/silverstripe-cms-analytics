<?php

namespace MaximeRainville\SilverstripeCmsAnalytics;

use SilverStripe\Control\Director;
use SilverStripe\Core\Extension;
use SilverStripe\Security\Permission;
use SilverStripe\View\Requirements;

class LeftAdminExtension extends Extension
{
    public function init()
    {
        // get the UA token and abort if its not configured yet
        $ua = $this->getOwner()->config()->get('primary_ua');
        if (!$ua) {
            return;
        }

        // window.ss
        Requirements::customScript(<<<JS
window.ss = window.ss || {};
window.ss.analytics = {$this->getAnalyticsConfig()};
JS
        );

        // We initialise Google Analytics in the header of the page so it tracks load times correctly

        // gtag
        Requirements::javascript('https://www.googletagmanager.com/gtag/js?id=' . $ua);
        Requirements::customScript(<<<JS
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '$ua');
JS
        );

        // ga
        Requirements::customScript(<<<JS
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', '$ua');

ga('set', {
'dimension1': window.ss.analytics['environment'],
'dimension2': window.ss.analytics['cms_version'],
'dimension3': window.ss.analytics['cms_version_number'],
'dimension4': window.ss.analytics['permissions'],
'dimension5': window.ss.analytics['controller'],
});
JS
        );

        // bundle
        Requirements::javascript('maxime-rainville/silverstripe-cms-analytics:client/dist/js/bundle.js');
    }

    public function getAnalyticsConfig()
    {
        $permissions = array_filter(
            Permission::get()->column('Code'),
            Permission::class . '::check'
        );

        $analytics = [
            'primary_ua' => $this->getOwner()->config()->get('primary_ua'),
            'environment' => Director::get_environment_type(),
            'cms_version' => $this->getOwner()->CMSVersion(),
            'cms_version_number' => $this->getOwner()->CMSVersionNumber(),
            'permissions' => implode(" ", $permissions),
            'controller' => get_class($this->getOwner())
        ];
        return json_encode($analytics);
    }
}
