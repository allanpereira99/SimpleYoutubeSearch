const axios = require("axios");
const { stringify } = require("querystring");
const url = "https://www.googleapis.com/youtube/v3/search?";

class youtube {
  static search(params) {
    return new Promise((resolve, reject) => {
      let properties = {
        q: params?params.term:'',
        part: "snippet",
        maxResults: params?params.maxResults||10:'',
        key: params?params.key:'',
      };
      if (properties.key) {
        resolve(
          axios.get(url + stringify(properties)).then((resolve) => {
            const result = resolve.data.items;
            let find = result.map((item) => {
              let id = "";
              let link = "";
              switch (item.id.kind) {
                case "youtube#channel":
                  link = "https://www.youtube.com/channel/" + item.id.channelId;
                  id = item.id.channelId;
                  break;
                case "youtube#playlist":
                  link =
                    "https://www.youtube.com/playlist?list=" +
                    item.id.playlistId;
                  id = item.id.playlistId;
                  break;
                default:
                  link = "https://www.youtube.com/wacth?v=" + item.id.videoId;
                  id = item.id.videoId;
              }
              return {
                id: id,
                kind: item.id.kind,
                link: link,
                publishedAt: item.snippet.publishedAt,
                channelId: item.snippet.channelId,
                channelTitle: item.snippet.channelTitle,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails:
                  item.snippet.thumbnails.high ||
                  item.snippet.thumbnails.default,
              };
            });
            return find;
          })
        );
      } else {
        resolve("missing api key");
      }
       reject("failed to access data");
    });
  }
}

module.exports = {youtube:youtube};
