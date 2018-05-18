
arenaContext.then( context => {

  if ( context.type == 'channel' || context.type == 'user' ) {

    newTool( 'there' );

    let there_canvas     = document.getElementById( 'arena_toolkit_there' ).getElementsByClassName( 'arena_tool_canvas' )[ 0 ];

    there_canvas.innerHTML = '<iframe src="https://there.am/' + context.slug + '" height="100%" width="100%" frameborder="0">Your browser does not support iframes<a href="https://there.am' + context.slug + '">' + context.title + '</a></iframe>';

  }

} );
