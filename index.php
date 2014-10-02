<?php
function base64_url_decode($input) {
    return base64_decode(strtr($input, '-_', '+/'));
}
function parse_signed_request($signed_request) {
    list($encoded_sig, $payload) = explode('.', $signed_request, 2);

    $secret = "123c8610bc4b2fbe1c726696388661da"; // Use your app secret here
    // decode the data
    $sig = base64_url_decode($encoded_sig);
    $data = json_decode(base64_url_decode($payload), true);

    // confirm the signature
    $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
    if ($sig !== $expected_sig) {
        error_log('Bad Signed JSON signature!');
        return null;
    }

    return $data;
}

if (($signed_request = parse_signed_request($_REQUEST['signed_request']))) {
    if ($signed_request->page->liked) {
        echo "This content is for Fans only!";
    } else {
        echo "Please click on the Like button to view this tab!";
    }
}
