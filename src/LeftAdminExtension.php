<?php

namespace MaximeRainville\SilverstripeCmsAnalytics;

use SilverStripe\Control\Director;
use SilverStripe\Core\Extension;
use SilverStripe\Security\Group;
use SilverStripe\Security\Member;
use SilverStripe\Security\Permission;
use SilverStripe\Security\Security;
use SilverStripe\View\Requirements;
use SilverStripe\Admin\LeftAndMain;

class LeftAdminExtension extends Extension
{
    public function init()
    {
        $ua = $this->getOwner()->config()->get('primary_ua');
        if ($ua) {
            Requirements::customScript( <<<JS
window.ss = window.ss || {};
window.ss.analytics = {$this->getAnalyticsConfig()};
JS
            );
            Requirements::javascript('https://www.googletagmanager.com/gtag/js?id=' . $ua);
            Requirements::javascript('maxime-rainville/silverstripe-cms-analytics:client/dist/js/bundle.js');
            Requirements::add_i18n_javascript('maxime-rainville/silverstripe-cms-analytics:client/lang', false, true);
        }

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

    public function updateClientConfig(&$config)
    {
        $config['cmsAnalytics'] = [
            'version' => LeftAndMain::config()->get('cmsAnalyticsVersion'),
            'content' => LeftAndMain::config()->get('cmsAnalyticsContent'),
        ];
    }
}
