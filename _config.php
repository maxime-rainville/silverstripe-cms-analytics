<?php

use SilverStripe\Core\Manifest\ModuleLoader;

// Avoid creating global variables
call_user_func(function () {
    $module = ModuleLoader::inst()->getManifest()->getModule('maximerainville/silverstripe-cms-analytics');
});
