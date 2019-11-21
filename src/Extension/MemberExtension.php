<?php

namespace MaximeRainville\SilverstripeCmsAnalytics\Extension;

use MaximeRainville\SilverstripeCmsAnalytics\Model\CmsTrackingConsent;
use SilverStripe\ORM\DataExtension;

/**
 * Ensures any consents are deleted when the related member is deleted (right to be forgotten).
 * If you want to retain this data for legal purposes, then create a backup regime.
 */
class MemberExtension extends DataExtension
{
    public function onBeforeDelete()
    {
        parent::onBeforeDelete();

        CmsTrackingConsent::get()
            ->filter('MemberID', $this->owner->ID)
            ->removeAll();
    }
}