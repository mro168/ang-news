'use strict';

app.controller('PostViewCtrl', function($scope, $routeParams, Post) {

  $scope.post = Post.find($routeParams.postId);

  $scope.addComment = function() {
    Post.addComment($routeParams.postId, $scope.comment);
    $scope.comment = '';
  };

  $scope.removeComment = function(comment, commentId) {
    Post.deleteComment($scope.post, comment, commentId);
  };

  $scope.upVotePost = function (postId, upVoted) {
    if ( upVoted ) {
      Post.clearVote(postId, upVoted);
    } else {
      Post.upVote(postId);
    }
  };

  $scope.downVotePost = function (postId, downVoted) {
    if (downVoted) {
      Post.clearVote(postId, downVoted);
    } else {
      Post.downVote(postId);
    }
  };

  $scope.upVoted = function(post) {
    return Post.upVoted(post);
  };

  $scope.downVoted = function(post) {
    return Post.downVoted(post);
  };
});
