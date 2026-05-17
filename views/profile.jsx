const React = require('react');

function Profile(props) {
  const { user, bookmarks = [] } = props;
  const userEmail = user ? user.email : '';
  
  // Create a copy of bookmarks and reverse it so we don't mutate the original array
  const reversedBookmarks = [...bookmarks].reverse();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile - Bookmarker</title>
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
        
        <div className="container">
          <div className="left">
            <div className="container-center">
              <section className="card">
                <div className="profile-meta">
                  Logged in as: <span>{userEmail}</span>
                </div>
                <form action="/add" method="post">
                  <input 
                    id="title" 
                    type="text" 
                    name="title" 
                    placeholder="New link title" 
                    required 
                  />
                  <input 
                    id="link" 
                    type="text" 
                    name="url" 
                    placeholder="New link url" 
                    required 
                  />
                  <input 
                    id="rating" 
                    type="number" 
                    name="rating" 
                    min={0} 
                    max={5} 
                    placeholder="0 to 5 Rating" 
                    required 
                  />
                  <button type="submit">Add new bookmark</button>
                </form>
              </section>
            </div>
          </div>
          
          <div className="right">
            <div className="container-center">
              <section className="card">
                <form action="/search" method="get">
                  <input 
                    type="text" 
                    name="q" 
                    placeholder="Title" 
                    required 
                  />
                  <button type="submit">Search for a bookmark by title</button>
                </form>
              </section>
              
              <div className="bookmark-container">
                {reversedBookmarks.map((bookmark, index) => {
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
                })}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

module.exports = Profile;
