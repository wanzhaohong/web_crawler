# Web_crawler_For_Indeed_Job

Website link: http://18.220.70.6/

## After Clone:
Command to launch client, API and crawler:
```bash
npm start
```

## Web Crawler
Technologies: 
- Cheerio, Node.js, Express.js, MongoDB

How does it work? 
- Separate from the client and API server. Store data into MongoDB after scraping.

## API Server
Features: 
- GET, PUT, DELETE

## React Client
Features: 
- Realtime Search, Responsive design, Interactive API.

How to search for job posts?
- The users can use the Realtime Searchbar to find what they are looking for. The result will be displayed to them immediately without pressing the Enter key.

How to edit a job post?
- The users can edit the job posts by clicking the edit button on the right side. After they click it, the changeable area will be switched to textarea and input field for the users to edit. After the users finished editing, they have to click the update button(also on the right side) to update the info they edited.

How to add custom tags?
- The custom tag is part of the job post, so the user needs to press the edit button first. The area of the custom tag is different from the others, which is an input field that the users have to press Enter from their keyboard, then they can create a custom tag. But in order to save the created tags, the users have to press the Update button.

How do Delete and Soft Delete work?
- The Delete button will remove the job post from the database.
- The Soft Delete button will hide the post from the user, but the post still remains in the database.
