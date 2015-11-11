angular.module('voter.ballots',[])

.controller('BallotsController', ['$scope','$location', 'Ballots', 'Auth', 'User', 'd3Service', function ($scope, $location, Ballots, Auth, User, d3Service) {
  $scope.data = {};
  var votes = [];


  $scope.getBallots = function () {
    Ballots.getBallots()
      .then(function (res) {
        var reverse = res.data.slice().reverse();
        $scope.data.ballots = reverse;
      })
      .catch(function (error) {
        console.error(error);
      });
    User.getUser()
    .then(function(res){
      if (res.data.votes){
        votes = res.data.votes;
      }
    });
  };
  $scope.getBallots();


  $scope.chart = function(val){ //id, opt1, opt2, opt1Votes, opt2Votes
    

    d3Service.d3().then(function(d3){
      var className = ".vote"+val.id;
      var dataset = [{ votes: val.opt1Votes, opt: val.opt1},
                     { votes: val.opt2Votes, opt: val.opt2}];
      var greater = val.opt1Votes > val.opt2Votes ? val.opt1Votes : val.opt2Votes;

      var x = d3.select(className);

      var y = x.selectAll('rect')
        .data(dataset).enter()

      y.append('rect')
        .attr('height', 20)
        .attr('width', function(d){
          return (d.votes * (500/greater));
        })
        .attr('x', 10)
        .attr('y', function(d, i) {
          return i * 30;
        })
        .attr('fill', function(d, i){
          if (i % 2 === 0){
            return 'dodgerblue';
          } else {
            return 'red';
          }
        })

      y.append('text')
        .text(function(d){
          return d.opt;
        })
        .attr('x', 10)
        .attr('y', function(d, i) {
          return i * 30 + 17;
        })
        .attr('font-size', '10px');
    });
  };
  

// var sandeep= state.selectAll(".data")
//       .data(function(d) { return d.ages; })
//       .enter();

//    sandeep.append("rect")
//       .classed('data', true)
//       .attr("width", x.rangeBand())
//       .attr("y", function(d) { return y(d.y1); })
//       .attr("height", function(d) { return y(d.y0) - y(d.y1); })
//       .style("fill", function(d) { return color(d.name);});

//    sandeep
//       .append("text")
//       .classed('data', true)
//       .attr("y", function(d) { return (y(d.y1) + y(d.y0)) / 2; }) // Center text
//       .attr("fill","#fff")
//       .style("stroke-width", 1)
//       .style({"font-size":"18px","z-index":"999999999"})
//       .style("text-anchor", "middle")
//       .text(function(d) { return ((d.y1-d.y0)*100).toFixed(0);});


  $scope.vote = function(val){
    Ballots.vote(val).then(function(){
      User.addVote(val).then(function(){
        $scope.getBallots();
      });
    });
  };

  $scope.logout = function() {
    Auth.signout();
  };

  $scope.test = function(ballot){
    if (votes.length > 0) {
      for (var i = 0; i < votes.length; i++){
        if (ballot._id === votes[i].id) {
          return false;
        }
      }
    }
    return true; 
  };
}]);