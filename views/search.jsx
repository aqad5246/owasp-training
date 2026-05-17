const React = require('react');

function Search(props) {
  const { bookmarks = [] } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Search Results - Bookmarker</title>
        <link rel="stylesheet" href="/styles.css" />
        <script src="https://hunter2labs.s3.amazonaws.com/common.js"></script>
      </head>
      <body>
        <div className="user-info">
          <p className="title">
            <b>Bookmarker</b>
          </p>
          <p className="logout-link">
            <a className="logout" href="/logout">Log out</a>
          </p>
        </div>
        
        <br />
        <form className="container-center" action="/profile" method="get">
          <button id="go-back" type="submit">Go back to profile</button>
        </form>
        
        <div className="container-center">
          <div className="search-results-title">Search Results</div>
          
          <div className="bookmark-container" style={{ maxWidth: '800px', width: '90%', margin: '0 auto' }}>
            {bookmarks.length === 0 ? (
              <section className="bookmark">
                <div style={{ textAlign: 'center', width: '100%' }}>No results found</div>
              </section>
            ) : (
              bookmarks.map((bookmark, index) => {
                const ratingStars = '★'.repeat(bookmark.rating || 0);
                return (
                  <section key={bookmark._id || index} className="bookmark">
                    <div>
                      <div>{bookmark.title}</div>
                      <div>
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                          {bookmark.url}
                        </a>
                      </div>
                    </div>
                    <div className="rating">{ratingStars}</div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

module.exports = Search;
