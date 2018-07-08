

var memoryArray = [
                   'A', 'A', 'B', 'B', 'C','C', 'D', 'D',
                   'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H',
                   'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 
                   ];
var memoryValue = [];
var memoryTileIds = [];
var tilesFlipped = 0;


Array.prototype.memoryTileShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
      
    }
}

function newBoard() {
    tilesFlipped = 0;
    var output = '';
    memoryArray.memoryTileShuffle();
    for(var i = 0; i < memoryArray.length; i++) {
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>'
    }
    document.getElementById('memoryboard').innerHTML = output;
   
}




function memoryFlipTile(tile,val) {
    if(tile.innerHTML == "" && memoryValue.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if(memoryValue.length == 0) {
            memoryValue.push(val);
            memoryTileIds.push(tile.id);
        } else if(memoryValue.length == 1) {
            memoryValue.push(val);
            memoryTileIds.push(tile.id);
            if(memoryValue[0] == memoryValue[1]) {
                tilesFlipped += 2;
                //clear both arrays
                memoryValue = [];
                memoryTileIds = [];
                //check if whole board is cleared
                if(tilesFlipped == memoryArray.length) {
                    alert('Generating new board');
                    document.getElementById('memoryboard').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // flip the two tiles back over
                    var tile_1 = document.getElementById(memoryTileIds[0]);
                    var tile_2 = document.getElementById(memoryTileIds[1]);
                    tile_1.style.background = 'rgba(255, 0, 0, 0.623)';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'rgba(255, 0, 0, 0.623)';
                    tile_2.innerHTML = "";
                    //clear both arrays
                    memoryValue = [];
                    memoryTileIds = [];
                }
                setTimeout(flip2Back, 700);
            }

        }
    }
}

