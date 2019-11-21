<?php

namespace MaximeRainville\SilverstripeCmsAnalytics\GraphQL;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\OperationResolver;

class ConsentResolver implements OperationResolver
{
    public function resolve($object, array $args, $context, ResolveInfo $info)
    {
//        $post = Post::get()->byID($args['ID']);
//        $post->Title = $args['NewTitle'];
//        $post->write();
    }
}