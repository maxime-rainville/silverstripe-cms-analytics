<?php

namespace MaximeRainville\SilverstripeCmsAnalytics;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class LeftAdminExtension extends Extension
{
    public function init()
    {
        Requirements::javascript('maxime-rainville/silverstripe-cms-analytics:client/dist/js/bundle.js');
    }
}
