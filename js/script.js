//.......................................
//Vars
//
$matrixValue = [];
$matrixLength = 5;
$g = {
          nodes: [],
          edges: []
        };
var pnts = "";
var articulatPoints = [];


$(document).ready(function(){
     var i,t="";
    var j;
    for(i = 1; i <= $matrixLength+1; i++){
        $matrixValue[i] = [];
        for(j = 1; j <= $matrixLength+1; j++){
            $matrixValue[i][j] = 0;
        }
    }
//    for(i = 1; i <= $matrixLength; i++){
//        for(j = 1; j <= $matrixLength; j++){
//            t+=""+$matrixValue[i][j];
//        }
//        t+="\n";
//    }
//    alert(t);
 });

var updateGraphMatrix = function () {
    $matrixLength = $('#node-number-input').val();
    //Initialising the matrixValue by 0
    var i,t="";
    var j;
    for(i = 1; i <= $matrixLength+1; i++){
        $matrixValue[i] = [];
        for(j = 1; j <= $matrixLength+1; j++){
            $matrixValue[i][j] = 0;
        }
    }
//    for(i = 1; i <= $matrixLength; i++){
//        for(j = 1; j <= $matrixLength; j++){
//            t+=""+$matrixValue[i][j];
//        }
//        t+="\n";
//    }
//    alert(t);

    i=1;j=0;
    var tableHeader = $('#table-header');tableHeader.empty();
    var tableBody = $('#table-body');tableBody.empty();
    var trTableHeaderNumber = tableHeader.children().length;
    //Create a Matrix of matrixLength
    var trHeader = "<th></th>";
    var trBody;
    var thToAdd = $matrixLength-trTableHeaderNumber;
    for(;i<=$matrixLength;i++){
        trHeader += "<th>"+(trTableHeaderNumber+i)+"</th>";
        trBody += "<tr><th>"+(trTableHeaderNumber+i)+"</th>";
        for(j=0;j<$matrixLength;j++){
            trBody += "<td>" + "<input id=\""+i+(j+1)+"\" type=\"checkbox\" onclick=\"updateCell()\" class=\"form-control\"";
            if(i===j+1) trBody += " disabled ";
            trBody += "/>"+
                      "</td>";
        }
        trBody += "</tr>";
    }
    tableHeader.append(trHeader);
    tableBody.append(trBody);
}

    
var updateCell = function(){
    var ii;
    var ji,t;
    
    var x = document.activeElement.getAttribute('id').charAt(0);
    var y = document.activeElement.getAttribute('id').charAt(1);
    if(document.activeElement.getAttribute('id') > 100){
     x = document.activeElement.getAttribute('id').charAt(0) + document.activeElement.getAttribute('id').charAt(1);
     y =  document.activeElement.getAttribute('id').charAt(2) ;
    }
    if (document.activeElement.getAttribute('id')>1000){
        x = document.activeElement.getAttribute('id').charAt(0) + document.activeElement.getAttribute('id').charAt(1);
     y =  document.activeElement.getAttribute('id').charAt(2) +document.activeElement.getAttribute('id').charAt(3);
    }
    if($('#'+x+y).prop('checked')){
        $('#'+y+x).prop('checked',true);
        //Create a boolean matrix
        $matrixValue[x][y] = 1;
        $matrixValue[y][x] = 1;
    }
    else{
        $('#'+y+x).prop('checked',false);
        //Create a boolean matrix
        $matrixValue[x][y] = 0;
        $matrixValue[y][x] = 0;
    }

}

var drawGraph = function(){
    $('#graph-container').empty();
    var i,
        j,
        n=0,
        s,
        N = $matrixLength,
        E = 30;
    $g = undefined;
    $g = {
          nodes: [],
          edges: []
        };
    // Generate the graph:
    for (i = 1; i <= N; i++){
        $g.nodes.push({
            id: 'n' + i,
            label: 'Noeud ' + i,
            x: Math.random(),
            y: Math.random(),
            size: 20,
            color: '#666'
        });  
    }
      
    for(i = 1; i <= $matrixLength; i++){
        for (j = i+1; j <= $matrixLength; j++){
            if($matrixValue[i][j]==1){
                $g.edges.push({
                    id: 'e' + n,
                    source: 'n' + i,
                    target: 'n' + j,
                    size: Math.random(),
                    color: '#ccc'
                });
                n++;
            }
        }
    }
    
    sigma.renderers.def = sigma.renderers.canvas
    // Instantiate sigma:
    s = new sigma({
      graph: $g,
      container: 'graph-container'
    });

    // Initialize the dragNodes plugin:
    sigma.plugins.dragNodes(s, s.renderers[0]);
}

var drawGraph222 = function(){
    $('#graph-container').empty();
    var i,
        j,
        n=0,
        s,
        N = $matrixLength,
        E = 30,
        g2 = {
          nodes: [],
          edges: []
        };
    go();
    // Generate the graph:
    for (i = 1; i <= N; i++){
        if(articulatPoints[i-1] == 1){
            g2.nodes.push({
                id: 'n' + i,
                label: 'Noeud ' + i,
                x: $g.nodes[i-1].x,
                y: $g.nodes[i-1].y,
                size: 20,
                color: '#bf0404'
            });  
        }
        else{
            g2.nodes.push({
                id: 'n' + i,
                label: 'Noeud ' + i,
                x: $g.nodes[i-1].x,
                y: $g.nodes[i-1].y,
                size: 20,
                color: '#666'
            });  
        }
    }   

      
    for(i = 1; i <= $matrixLength; i++){
        for (j = i+1; j <= $matrixLength; j++){
            if($matrixValue[i][j]==1){
                g2.edges.push({
                    id: 'e' + n,
                    source: 'n' + i,
                    target: 'n' + j,
                    size: Math.random(),
                    color: '#ccc'
                });
                n++;
            }
        }
    }
    
    sigma.renderers.def = sigma.renderers.canvas
    // Instantiate sigma:
    s = new sigma({
      graph: g2,
      container: 'graph-container'
    });

    // Initialize the dragNodes plugin:
    sigma.plugins.dragNodes(s, s.renderers[0]);
}



function NumberOfArticulationPoints(nbNodes) {
    this.pile = [];
    this.nbNoeuds = nbNodes;
    this.pointArticulations = [];
    this.matriceGraph = [];

}
NumberOfArticulationPoints.prototype.nbCompoConn= function (matrix, root , taille  ) {
   // console.log("nb composantes connexes ... \n");
    let visites = [];
    let start = root;
    let nbcomposantes=0;
    for (let i=0 ; i<taille ; i++) {
        visites[i] = 0;
    }
   // console.log(matrix);
    while (start >=0 ){
        this.pile.push(start);
       // console.log(this.pile);
        visites[start] = 1;
        while (this.pile.length > 0){
            let noeud = this.pile.pop();
            //console.log("noeud = "+noeud);
            visites[noeud]= 1;
            for (let i = 0; i <taille ; i++) {
                if (matrix[noeud][i] === 1 && visites [i] === 0 )
                    this.pile.push(i);
            }
        }
        start = this.allVisit(visites , taille );
        nbcomposantes++;
    }
    return nbcomposantes;
};
NumberOfArticulationPoints.prototype.allVisit = function( tab , taille) {
    let node = -1;
    for (let i = 0; i <taille ; i++) {
        if (tab[i] ===0)
            return i;
    }
    return node;
};
NumberOfArticulationPoints.prototype.nbPointsArticulations = function() {
    //console.log(" fonction nb points articulations ... ");
    let tai = this.nbNoeuds;
    let matriceInter = [];
    let  nbcompoconnex= this.nbCompoConn(this.matriceGraph,0,tai);
   // console.log(" nombre de composantes connex du graphe de départ = " +nbcompoconnex + "\n");
    let c;

    for (let i = 0; i <tai ; i++) {
        this.pointArticulations[i] = 0;
    }
    for (let i = 0; i <tai ; i++) {
        matriceInter = this.copier_matrice(this.matriceGraph, i,tai);
        c=this.nbCompoConn(matriceInter,0,tai-1);
        if (c>nbcompoconnex) {
            this.pointArticulations[i]=1;
        }

    }
};

NumberOfArticulationPoints.prototype.copier_matrice = function( matrice ,  p,  taille){
    let matriceInter = [];
    let ligne, col;
    for (let i = 0; i < taille-1 ; i++) {
        matriceInter[i] = [];
        for (let j = 0; j < taille-1 ; j++) {
            if (i<p) ligne =i;
            else
                ligne=i+1;
            if (j<p) col=j;
            else col=j+1;

            matriceInter[i][j] = matrice[ligne][col];
        }
    }
    return matriceInter;
};

NumberOfArticulationPoints.prototype.initMatrice= function( taille) {
    for (let i = 0; i < taille ; i++) {
        this.matriceGraph[i] = [];
        this.matriceGraph[i][i]=0;
    }
    this.matriceGraph[0][1] = 1;
    this.matriceGraph[0][2] = 0;
    this.matriceGraph[0][3] = 1;

    this.matriceGraph[1][0] = 1;
    this.matriceGraph[1][2] = 0;
    this. matriceGraph[1][3] = 0;

    this.matriceGraph[2][0] = 0;
    this.matriceGraph[2][1] = 0;
    this.matriceGraph[2][3] = 1;

    this.matriceGraph[3][0] = 1;
    this.matriceGraph[3][1] = 0;
    this.matriceGraph[3][2] = 1;
};
 NumberOfArticulationPoints.prototype.afficher_pts_articulations = function(){
    for (let i = 0; i < this.nbNoeuds ; i++) {
        console.log(i+": " + this.pointArticulations[i]+" ,");
    }
};

function go(){
    var __source = 1;

    var numOfArticulatePoints = new NumberOfArticulationPoints($matrixLength);

    numOfArticulatePoints.matriceGraph=transfoMatrice($matrixValue);
    numOfArticulatePoints.nbPointsArticulations();
    articulatPoints = numOfArticulatePoints.pointArticulations;
    //numOfArticulatePoints.afficher_pts_articulations();
    
    
    //alert("Nombre de points d'articulation " + num + "\n" + pnts);
}
function transfoMatrice(matriceEnter) {
    let matrice = [];
    let i, j ;
    for (i=0; i<$matrixLength ; i++) {
        matrice[i]= [];
        for (j=0; j <$matrixLength; j++) {
            matrice[i][j] = matriceEnter [i+1][j+1];
        }
    }
    return matrice;
}