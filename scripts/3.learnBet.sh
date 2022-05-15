#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call learnBet function for any player'
echo 'If you call learnBet function you will learn bet of the given id game.'
echo  near call $CONTRACT learnBet '{"gameId":1558933879}'  --accountId accountId.testnet
echo
echo \$CONTRACT is $CONTRACT
echo 
echo  'You must write gameid before using script'
echo  'You must write gameid before using script'
echo  'You must write gameid before using script'
near call $CONTRACT learnBet '{"gameId":1558933879}'  --accountId test.smtmllgl.testnet
