<?php

namespace MaximeRainville\SilverstripeCmsAnalytics\Model;

use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBBoolean;
use SilverStripe\ORM\FieldType\DBVarchar;
use SilverStripe\Security\Member;
use SilverStripe\Security\Permission;
use SilverStripe\Security\Security;

/**
 * Enables tracking of user consent to track anonymised usage behavior.
 * The advantage of tracking this server-side (vs. cookies)
 * is that consent can be permanent (or for the duration consented to),
 * and across devices.
 *
 * The consent date is implied by the "Created" date.
 * The records are treated as "append only",
 * meaning that withdrawing consent should result in a new record with HasConsented=false.
 *
 * @property boolean HasConsented Consent status
 * @property string Version Version of a consent. Makes sense to increment numerically,
 * but could also be tied to a date, or some other marker (e.g. version control SHAs).
 * Needs to be related to version-controlled version of the content which the user agreed on
 * (e.g. the specific data providers and processors involved).
 */
class CmsTrackingConsent extends DataObject
{
    private static $db = [
        'HasConsented' => DBBoolean::class,
        'Version' => DBVarchar::class,
    ];

    private static $indexes = [
        'Version' => true,
        'HasConsented' => true,
    ];

    private static $has_one = [
        'Member' => Member::class,
    ];

    private static $table_name = 'CmsTrackingConsent';

    public function canCreate($member = null, $context = array())
    {
        if (!$member) {
            $member = Security::getCurrentUser();
        }

        // Any member with CMS access can create consents, for themselves
        return $member && Permission::checkMember($member, 'CMS_ACCESS');
    }

    public function canEdit($member = null, $context = array())
    {
        // Append-only data set
        return false;
    }

    public function canDelete($member = null, $context = array())
    {
        // Append-only data set
        return false;
    }

    public function validate()
    {
        $result = parent::validate();

        if (!$this->Version) {
            $result->addFieldError(
                'Version',
                _t('CmsTrackingConsent.VERSION_REQUIRED', 'Version is required')
            );
        }

        $member = Security::getCurrentUser();
        if (!$this->MemberID || $this->MemberID != $member->ID) {
            $result->addError(
                _t('CmsTrackingConsent.MEMBER_SAME', 'Can only create for current user')
            );
        }

        return $result;
    }

    /**
     * Inspect the latest consent status for a specific version of data usage.
     * Returns tri-state: Boolean defines consent status,
     * null defines a user has not granted or declined consent on this version.
     *
     * Note that the logic doesn't account for consents on *newer* versions,
     * it's up to the implementation to keep track of the current version to inspect.
     *
     * @param Member $member
     * @param string $version
     * @return boolean|null
     */
    public static function hasMemberConsented(Member $member, $version)
    {
        $consents = self::get()
            ->filter('MemberID', $member->ID)
            ->filter('Version', $version)
            // Consent can be denied after being granted on the same versoin
            ->sort(['Created' => 'DESC', 'ID' => 'DESC']);

        // No consent has been granted or denied
        if (!$consents->Count()) {
            return null;
        }

        return $consents->First()->HasConsented;
    }
}