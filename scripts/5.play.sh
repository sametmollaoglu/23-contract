#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call play function for players'
echo 'You need to call joinGame function before using this script'
echo 'You need to call joinGame function before using this script'
echo 'You need to call joinGame function before using this script'
echo  near call $CONTRACT play '{"gameId":1558933879}' --accountId accountId.testnet   
echo 
echo \$CONTRACT is $CONTRACT
echo  'You should write accountId.testnet as player'
echo  'You should write accountId.testnet as player'
echo  'You should write accountId.testnet as player'
echo 
echo  'You can change gameId before using script'
echo  'You can change gameId before using script'
echo  'You can change gameId before using script'
near call $CONTRACT play '{"gameId":1558933879}' --accountId smtmllgl.testnet 