
newTool( 'arena_toolkit_history' );


arenaContext.then( context => {

  let current_slug = context.slug;
  let current_title = context.title;

  let getStored = ( callback ) => {
    chrome.storage.local.get(
      [ 'slugs', 'titles' ],

      ( data ) => {

        var slugs;
        var titles;

        if ( data.slugs && data.titles && current_slug && current_title ) {
          slugs  = [ current_slug ].concat( data.slugs );
          titles = [ current_title ].concat( data.titles );
        } else if ( data.slugs && data.titles ){
          slugs  = data.slugs;
          titles = data.titles;
        } else if ( current_slug && current_title ) {
          slugs  = [ current_slug ]
          titles = [ current_title ]
        }

        callback( { slugs: slugs, titles: titles } )
      }
    )
  }

  let history_canvas      = document.getElementById( 'arena_toolkit_history' ).getElementsByClassName( 'arena_tool_canvas' )[ 0 ];
  let history_canvas_list = document.createElement( 'ul' );

  getStored( ( data ) => {

    if ( data.slugs && data.titles ) {

      let slugs  = data.slugs;
      let titles = data.titles;

      chrome.storage.local.set( { 'slugs': slugs, 'titles': titles } )

      for( var i = 0; i < slugs.length; i++ ) {
        history_canvas_list.innerHTML += '<li><a href="https://are.na/' +  slugs[ i ] + '">' + titles[ i ] + '</a></li>';
      }

      history_canvas.appendChild( history_canvas_list );
    }
  } );

  let refresh = document.createElement( 'div' );
  refresh.innerHTML = '<div class="arena_toolkit_history_refresh">♺</div>';
  document.getElementById( 'arena_toolkit_history' ).appendChild( refresh );

  refresh.onclick = () => {

    chrome.storage.local.remove(
      [ 'slugs', 'titles' ],
      () => {
        var error = chrome.runtime.lastError;
        if ( error ) { console.error( error ); }
      }
    )

    history_canvas_list.innerHTML = '';
  }

});