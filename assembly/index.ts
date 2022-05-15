import { context, ContractPromiseBatch, u128, math, logging} from "near-sdk-as";
import { game_23, games, player ,} from "./model";

export function startGame(): u32 {
  
  assert(
      context.attachedDeposit >= u128.from('1000000000000000000000000'),
      "You must bet at least 1 amount of NEAR to create a game."
  );
  
  let gameClass = new game_23();
  let initiatorClass = new player();
  initiatorClass.gameId=gameClass.gameId;
  gameClass.initiatorPlayer=initiatorClass;
  games.set(gameClass.gameId, gameClass);
  
  logging.log("Game is started, wait for opponent.");
  return gameClass.gameId;
}

export function learnBet(gameId: u32): string {
  assert(games.contains(gameId), "There is no game with this number");
  let betOfGame =games.getSome(gameId).bet;
  return `Bet of this game is : ${betOfGame}`;
}


export function joinGame(gameId: u32): string {
  assert(games.contains(gameId), "There is no game with this number");
  let gameClass = games.getSome(gameId);

  assert(gameClass.initiatorPlayer.playerId!=context.sender, "You are already in this game as initiator player.");
  assert(gameClass.guestPlayer.playerId!=context.sender, "You are already in this game as guest player.");

  assert(
      context.attachedDeposit == gameClass.bet,
      `Please deposit exact value of the bet, must be ${gameClass.bet} NEAR.`
  )

  let guestPlayer = new player();
  guestPlayer.gameId=gameId;
  gameClass.guestPlayer = guestPlayer;
  gameClass.readyToStart=true;
  gameClass.initiatorPlayer.isMyTurn=true;
  games.set(gameId, gameClass);

  return `Joined the game. You should wait initiator player turn to make your turn.`;
}

function random32(): u32 {
  let bytes = math.randomBuffer(4);
  let result= bytes[3] << 0 | bytes[2] << 8 | bytes[1] << 16 | bytes[0] << 24;
  let rand = result % 11;
  return rand;
}

export function play(gameId: u32): string {
  assert(games.contains(gameId), "There is no game with this number.")
  let gameClass = games.getSome(gameId);
  
  assert(context.sender == gameClass.guestPlayer.playerId || context.sender == gameClass.initiatorPlayer.playerId , "You are not included to this game.")
  assert(games.getSome(gameId).readyToStart, "There is no opponent yet.")

  let currentPlayer = new player();
  if(context.sender == gameClass.guestPlayer.playerId){
    currentPlayer = gameClass.guestPlayer;
  }else{
    currentPlayer = gameClass.initiatorPlayer;
  }

  assert(currentPlayer.isMyTurn==true, `Please wait for the ${currentPlayer.playerId == gameClass.guestPlayer.playerId ? gameClass.initiatorPlayer.playerId : gameClass.guestPlayer.playerId} turn.`)
  
  let card=random32();
  currentPlayer.sum+=card;
  currentPlayer.isMyTurn=false;
  if(currentPlayer.playerId == gameClass.guestPlayer.playerId){
    gameClass.initiatorPlayer.isMyTurn = true;
    gameClass.guestPlayer=currentPlayer
  }else{
    gameClass.guestPlayer.isMyTurn = true;
    gameClass.initiatorPlayer=currentPlayer
  }

  games.set(gameId, gameClass);


  if (gameClass.initiatorPlayer.sum>23 || gameClass.guestPlayer.sum>23) {
    let winnerPlayer= new player();
    winnerPlayer= gameClass.initiatorPlayer.sum>21 ? gameClass.guestPlayer : gameClass.initiatorPlayer;
    
    ContractPromiseBatch.create(winnerPlayer.playerId).transfer(u128.add(gameClass.bet, gameClass.bet));
    games.delete(gameClass.gameId);
    return `Game is over! Congratulations: ${winnerPlayer.playerId} is the winner and received ${u128.add(gameClass.bet, gameClass.bet)}`;
    
  }else{
    return `${currentPlayer.playerId} draws ${card}. And sum of current player is ${currentPlayer.sum}. Draw your cards carefully.`;
  }
  
}
