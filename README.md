# SimpleYoutubeSearch

## Usage
```
const { youtube } = require('simpleyoutubesearch');
const params = {term:'naruto',
key:'your youtube api  key',
maxResults:10
};

youtube.search(params).then(console.log);  //returns a list of objects with the request data

