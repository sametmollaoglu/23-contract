#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call joinGame function for guest player'
echo 'If you call joinGame you will be set as guest player'
echo  near call $CONTRACT joinGame '{"gameId":1558933879}' --accountId accountId.testnet --amount
echo
echo \$CONTRACT is $CONTRACT
echo 
echo  'You should write accountId.testnet as guest player'
echo  'You should write accountId.testnet as guest player'
echo  'You should write accountId.testnet as guest player'
echo 
echo  'You must write gameid before using script'
echo  'You must write gameid before using script'
echo  'You must write gameid before using script'
echo
echo  'You must write same bet amount as game amount before using script'
echo  'You must write same bet amount as game amount before using script'
echo  'You must write same bet amount as game amount before using script'
near call $CONTRACT joinGame '{"gameId":1558933879}' --accountId test.smtmllgl.testnet --amount 1