const React = require('react');

function Index(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bookmarker</title>
        <link rel="stylesheet" href="/styles.css" />
        <script src="https://hunter2labs.s3.amazonaws.com/common.js"></script>
      </head>
      <body>
        <div className="container-center">
          <h1 className="title">Bookmarker</h1>
        </div>
        <div className="container-center">
          <section className="card container">
            <div className="half">
              <p className="center">Log in</p>
              <form action="/profile" method="post">
                <input 
                  id="email" 
                  type="email" 
                  name="logemail" 
                  placeholder="Your email" 
                  required 
                />
                <input 
                  id="password" 
                  type="password" 
                  name="logpassword" 
                  placeholder="Password" 
                  required 
                />
                <button id="log-in" type="submit">Log in</button>
              </form>
            </div>
            <div className="bar">{"\n"}</div>
            <div className="half">
              <p className="center">Register</p>
              <form action="/profile" method="post">
                <input 
                  id="emailreg" 
                  type="email" 
                  name="email" 
                  placeholder="Your email" 
                  required 
                />
                <input 
                  id="passwordreg" 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  required 
                  minLength={8} 
                />
                <input 
                  id="passwordConfreg" 
                  type="password" 
                  name="passwordConf" 
                  placeholder="Confirm password" 
                  required 
                  minLength={8} 
                />
                <button type="submit">Register</button>
              </form>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}

module.exports = Index;
