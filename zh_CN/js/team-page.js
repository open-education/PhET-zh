// Copyright 2002-2015, University of Colorado

(function() {
  function initializeBioExpandableText() {
    var teamMemberBios = $( '.team-member-div .bio' );
    teamMemberBios.each( function( index, bio ) {
      var bioDiv = $( bio );
      var socialIcons = bioDiv.find( 'a' );
      var bioTextSpan = bioDiv.find( 'span.bio-text' );
      var shortText = bioTextSpan.text();
      var fullText = bioTextSpan.attr( 'data-full-bio' );
      var more = bioDiv.find( 'span.more' );
      var less = bioDiv.find( 'span.less' );
      more.click( function() {
        bioTextSpan.text( fullText );
        socialIcons.show();
        more.hide();
        less.show();
      } );
      less.click( function() {
        bioTextSpan.text( shortText );
        socialIcons.hide();
        less.hide();
        more.show();
      } );
    } );

    var directorBios = $( '.director-div .bio' );
    directorBios.each( function( index, bio ) {
      var bioDiv = $( bio );
      var socialIcons = bioDiv.find( 'a' );
      var bioTextSpan = bioDiv.find( 'span.bio-text' );
      var shortText = bioTextSpan.text();
      var fullText = bioTextSpan.attr( 'data-full-bio' );
      var more = bioDiv.find( 'span.more' );
      var less = bioDiv.find( 'span.less' );
      more.click( function() {
        bioTextSpan.text( fullText );
        socialIcons.show();
        more.hide();
        less.show();
      } );
      less.click( function() {
        bioTextSpan.text( shortText );
        socialIcons.hide();
        less.hide();
        more.show();
      } );
    } );
  }

  var interval = setInterval( function() {
    if ( typeof $ !== 'undefined' ) {
      $( document ).ready( function() {
        initializeBioExpandableText();
      } );
      clearInterval( interval );
    }
  }, 100 );
})();