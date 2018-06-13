import React from 'react';

import ReactDOM from 'react-dom';


class TicTacToe extends React.Component {
    constructor(props) {
        super();
        this.state = {
            
            winner:undefined,
        };
        this.gameState = {
            turn: 'X',
            gameLocked:false,
            color: 'red',
            gameEnded: false,
            board: Array(9).fill(''),
            totalMoves:0
        }
    }




    clicked(box) {
        if (this.gameState.gameEnded || this.gameState.gameLocked) return;
        if (this.gameState.board[box.dataset.square] == '') {
        this.gameState.board[box.dataset.square] = this.gameState.turn;
        box.innerText = this.gameState.turn;
        box.style.color = this.gameState.color;
      
        this.gameState.turn = this.gameState.turn == 'X' ? 'O' : 'X',
        this.gameState.color = this.gameState.color == 'red' ? 'blue' : 'red'
        
        this.gameState.totalMoves ++
        }
    
    

    var result = this.checkWinner();

    if (result == 'X'){
        this.setState({
            winner: 'X',
            winnerLine: 'Match is won by X'
        });
        this.gameState.gameEnded = true
          //console.log(result);
    } else if (result == 'O'){
        this.setState({
            winner: 'O',
            winnerLine: 'Match is won by O'
        });
       this.gameState.gameEnded = true
         // console.log(result);
    } else if (result == 'draw'){
        this.setState ({
            winner: 'draw',
            winnerLine: 'Match is drawn'
        });
         this.gameState.gameEnded = true
    }



if (this.gameState.turn == 'O' && !this.gameState.gameEnded){
    this.gameState.gameLocked = true;
//compute a random number as long as we do not get an filled square
//loop over until we get an empty box

setTimeout(()=>{



do  {
    //hey a random number between 0 and 8
    var random = Math.floor(Math.random()*9);
}while (this.gameState.board[random] != '');
this.gameState.gameLocked = false;
this.clicked(document.querySelectorAll('.square')[random])



},1000)
}
    }

checkWinner(){
//winner moves
    var moves = [[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],[0,1,2],[3,4,5],[6,7,8]]
var board = this.gameState.board;
for(let i=0;i<moves.length;i++){
    //check if there is the same symbol across the winner moves
    //board[0] will return X or O in top left corner square
    //so if there is a X in top left corner (moves[0]) and square below (moves[1]) and bottom left corner (moves[2])
    if(board[moves[i][0]] == board[moves[i][1]]  && board[moves[i][1]] == board[moves[i][2]]){
        return board[moves[i][0]];
    }
//console.log(this.gameState.totalMoves);
if (this.gameState.totalMoves == 9){
    return 'draw';
}

}
}

    render() {
        return ( <
            div id = "game" >
            <div id="status">{this.state.winnerLine}</div>
            <div id = "head" >
            <p> World 's best tic tac toe AI</p> </div>  
            <div id = "board"
            onClick = {
                (e) => this.clicked(e.target)
            } > 
            <div className = "square" data-square="0"></div> 
            <div className = "square" data-square="1"></div> 
            <div className = "square" data-square="2"></div> 
            <div className = "square" data-square="3"></div> 
            <div className = "square" data-square="4"></div> 
            <div className = "square" data-square="5"></div> 
            <div className = "square" data-square="6"></div> 
            <div className = "square" data-square="7"></div> 
            <div className = "square" data-square="8"></div> 
            </div > 
            </div> 
        );

    }
};

export default TicTacToe