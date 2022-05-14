# 23-Contract
A gambling game which is like similar to blackjack but not with all of the functions. Users can start a game by giving any amount of deposit 
he/she want within the call. After the initiator starts the game, a second player can come with depositing exact amount of the game bet and 
join that game. After that both of the players make a play call and take own card within the range of 1 to 11 (1 and 11 includes). They must play 
sequentially and every time they draw a card, card value is adding to the player sum. Whoever exceeds 23, loses and bet value is transferred to 
the winner.

## Installing Dependencies
```
yarn
```
## Deploy and Test
```
yarn dev
```

```
export CONTRACT=YOUR-CONTRACT-ID
```
By using export command we can keep the contract id in a variable.

## Functions Of The Contract

### startGame
Does not contain parameters.
Initiator must deposit minimum 1 NEAR to start the game.
Returns the game_id.

```near call $CONTRACT startGame --accountId $NEAR_ACCOUNT --amount 1 ```

### learnBet
Contain game id as a parameter.
Returns the bet of the game.

```near call $CONTRACT learnBet '{"gameId":<game_id>}' --accountId $NEAR_ACCOUNT ```

### joinGame
Contain game id as a parameter.
Guest player must deposit exact amount of NEAR to join the game.
Returns a string declaring that guest player has joined the game. And should wait for the initiator move to take a turn.

```near call $CONTRACT joinGame '{"gameId":<game_id>}' --accountId $NEAR_ACCOUNT --amount 1 ```

### play
Contain game id as a parameter.
- If one of the sum of the player's drawed card numbers is exceeds the 23, other player wins. And all of the bet is transferring to winner account.
- But if no one exceeds 23 yet, at the each step function returns a string contains his/her drawed card number, and sum of his/her drawed card numbers.

```near call $CONTRACT play '{"gameId":1558933879}' --accountId $INITIATOR_NEAR_ACCOUNT ```
```near call $CONTRACT play '{"gameId":1558933879}' --accountId $GUEST_NEAR_ACCOUNT ```


