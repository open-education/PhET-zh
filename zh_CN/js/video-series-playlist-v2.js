// Copyright 2002-2016, University of Colorado

(function() {


  var initPlaylist = function() {

    $( '.playlist-arrow-right' ).bind( 'click', function( event ) {
      event.preventDefault();
      $( '.playlist-vid-list-container' ).stop().animate( {
        scrollLeft: '+=335'
      }, 750 );
    } );
    $( '.playlist-arrow-left' ).bind( 'click', function( event ) {
      event.preventDefault();
      $( '.playlist-vid-list-container' ).stop().animate( {
        scrollLeft: '-=335'
      }, 750 );
    } );

    var playlistVideos = [
      'https://www.youtube-nocookie.com/embed/dsdSiyytv5E',
      'https://www.youtube-nocookie.com/embed/biBwtj0Gf-U',
      'https://www.youtube-nocookie.com/embed/1YGuGyBwFn4',
      'https://www.youtube-nocookie.com/embed/JxAiffhSzgw',
      'https://www.youtube-nocookie.com/embed/g9oQLvL2Oz0',
      'https://www.youtube-nocookie.com/embed/vGiNot1ixnI',
      'https://www.youtube-nocookie.com/embed/4pVmVY-r7FI',
      'https://www.youtube-nocookie.com/embed/sa7KAPpwWdI',
      'https://www.youtube-nocookie.com/embed/v0koJ1Ukmqw',
      'https://www.youtube-nocookie.com/embed/qmqc3xU1fBM',
      'https://www.youtube-nocookie.com/embed/kCaDcrDbxRw'

    ];
    var playlistThumbnails = [
      'https://img.youtube-nocookie.com/vi/dsdSiyytv5E',
      'https://img.youtube-nocookie.com/vi/biBwtj0Gf-U',
      'https://img.youtube-nocookie.com/vi/1YGuGyBwFn4',
      'https://img.youtube-nocookie.com/vi/JxAiffhSzgw',
      'https://img.youtube-nocookie.com/vi/g9oQLvL2Oz0',
      'https://img.youtube-nocookie.com/vi/vGiNot1ixnI',
      'https://img.youtube-nocookie.com/vi/4pVmVY-r7FI',
      'https://img.youtube-nocookie.com/vi/sa7KAPpwWdI',
      'https://img.youtube-nocookie.com/vi/v0koJ1Ukmqw',
      'https://img.youtube-nocookie.com/vi/qmqc3xU1fBM',
      'https://img.youtube-nocookie.com/vi/kCaDcrDbxRw'

    ];

    // This is the first video in the series i.e. '[1] Title. . . '
    $( '#playlist-vid_frame' ).attr( 'src', playlistVideos[ 2 ] );

    $( '.playlist-vid-list .playlist-vid-item' ).each( function( index ) {
      // Set the iframe source onClick
      $( this ).click( function() {
        $( '#playlist-vid_frame' ).attr( 'src', playlistVideos[ index ] + '?autoplay=1&rel=0&showinfo=0&autohide=1' );
      } );
      // Set the img source
      $( this ).find( 'img' ).attr( 'src', playlistThumbnails[ index ] + '/0.jpg' );
    } );

  };

  var interval = setInterval( function() {

    if ( typeof $ !== 'undefined' ) {
      $( document ).ready( function() {
        initPlaylist();
        clearInterval( interval );
      } );
    }
  }, 100 );

})();