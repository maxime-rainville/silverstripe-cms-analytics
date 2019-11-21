<?php

namespace MaximeRainville\SilverstripeCmsAnalytics\Tests\Model;

use MaximeRainville\SilverstripeCmsAnalytics\Model\CmsTrackingConsent;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Security\Group;
use SilverStripe\Security\Member;
use SilverStripe\Security\Permission;
use SilverStripe\Security\Security;

class CmsTrackingConsentTest extends SapphireTest
{
    protected $usesDatabase = true;

    public function testValidatesVersion()
    {
        $member = new Member([
            'Email' => 'test@example.com',
        ]);
        $member->write();

        $consentWithoutVersion = new CmsTrackingConsent([
            'MemberID' => $member->ID
        ]);
        $result = $consentWithoutVersion->validate();
        $this->assertFalse($result->isValid());
        $this->assertContains(
            'Version is required',
            array_map(function ($msg) {
                return $msg['message'];
            }, $result->getMessages())
        );
    }

    public function testValidatesMember()
    {
        $member = new Member([
            'Email' => 'test@example.com',
        ]);
        $member->write();
        Security::setCurrentUser($member);

        $otherMember = new Member([
            'Email' => 'other@example.com',
        ]);
        $otherMember->write();

        $consent = new CmsTrackingConsent([
            'MemberID' => $otherMember->ID
        ]);
        $result = $consent->validate();
        $this->assertFalse($result->isValid());
        $this->assertContains(
            'Can only create for current user',
            array_map(function ($msg) {
                return $msg['message'];
            }, $result->getMessages())
        );
    }

    public function testCanCreateWithCmsAccessOnly()
    {
        $author = new Member([
            'Email' => 'author@example.com',
        ]);
        $author->write();
        $group = new Group([
            'Name' => 'Authors'
        ]);
        $group->write();
        $author->Groups()->add($group);
        $perm = new Permission([
            'Code' => 'CMS_ACCESS_LeftAndMain'
        ]);
        $perm->write();
        $group->Permissions()->add($perm);

        $otherMember = new Member([
            'Email' => 'other@example.com',
        ]);
        $otherMember->write();

        $consent = new CmsTrackingConsent([
            'MemberID' => $author->ID
        ]);
        $this->assertTrue($consent->canCreate($author));
        $this->assertFalse($consent->canCreate($otherMember));
    }

    public function testHasMemberConsented()
    {
        $member = new Member([
            'Email' => 'test@example.com'
        ]);
        $member->write();
        Security::setCurrentUser($member);

        $consents = [
            new CmsTrackingConsent([
                'MemberID' => $member->ID,
                'Version' => '1',
                'HasConsented' => false
            ]),
            new CmsTrackingConsent([
                'MemberID' => $member->ID,
                'Version' => '3',
                'HasConsented' => true
            ]),
        ];
        foreach ($consents as $consent) {
            $consent->write();
        }

        $this->assertFalse(
            CmsTrackingConsent::hasMemberConsented($member, '1'),
            'Explicit consent denied'
        );

        $this->assertNull(
            CmsTrackingConsent::hasMemberConsented($member, 'some-other-version'),
            'No consent granted for this version'
        );

        $this->assertTrue(
            CmsTrackingConsent::hasMemberConsented($member, '3'),
            'Explicit consent granted'
        );

        $overruleConsent = new CmsTrackingConsent([
            'MemberID' => $member->ID,
            'Version' => '3',
            'HasConsented' => false
        ]);
        $overruleConsent->write();

        $this->assertFalse(
            CmsTrackingConsent::hasMemberConsented($member, '3'),
            'Explicit consent denied through newer consent on same version'
        );
    }
}