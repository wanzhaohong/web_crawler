# take_home

Website link: http://18.220.70.6/

After Clone:
- Launch command for client, API and crawler:  _npm start_

Web Crawler
- Technologies: Cheerio, Node.js, Express.js, MongoDB
- How it works? Separate from the client and API server. Store data into MongoDB after scraping.
- Next Step: I can set up a cron job for the crawler to scrape the data from indeed.com frequently.

API Server
- Features: GET, PUT, DELETE
- Warning: Load 500 job posts each time will take at least 13 sec(tested by Postman). I suggest we can limit the number to 50 to get a better loading speed.
- Next Step: Can use API caching to guarantee the high performance of the API server. Or create pagination method if I don't need to load large amount of data everytime.

React Client
- Features: Realtime Search, Responsive design, Interactive API.
- 


