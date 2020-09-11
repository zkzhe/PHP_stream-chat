<?php

require_once(__DIR__ . "/vendor/autoload.php");

$STREAM_API_KEY = "k98ge8cknrsz";
$STREAM_API_SECRET = "4vr572hqh3d5y67xcxkvp6dd8wjfwtbcqa75eg8tgj8kuzqtfqrrb4nep5wj5au2";

// Initialize the SDK
$client = new \GetStream\StreamChat\Client(
   $STREAM_API_KEY,
   $STREAM_API_SECRET
);

if (isset($_REQUEST["create-token"])) {
  die(json_encode([
     "status" => "success",
     "token"  => $client->createToken($_REQUEST["create-token"])
  ]));
}
