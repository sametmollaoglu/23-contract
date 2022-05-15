#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call startGame function for initiator'
echo 'If you call startGame you will be set as initiator'
echo near call $CONTRACT startGame --accountId accountId.testnet --amount  
echo  
echo \$CONTRACT is $CONTRACT
echo  'You should write accountId.testnet as initiator'
echo  'You should write accountId.testnet as initiator'
echo  'You should write accountId.testnet as initiator'
echo 
echo  'You can change amount before using script'
echo  'You can change amount before using script'
echo  'You can change amount before using script'
near call $CONTRACT startGame --accountId smtmllgl.testnet --amount 1