var request = require('request');
const fs = require("fs");

const secrets = require("./secrets.js");

console.log('Welcome to the GitHub Avatar Downloader!');


const owner = process.argv[2];
const repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN

    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}





function downloadImageByURL(url, filePath) {
  console.log(filePath);
  const stream = fs.createWriteStream(filePath);
  request({url: url})
  .pipe(stream);
}





getRepoContributors(owner, repo, function(err, result) {

  if (!owner || !repo) {
    console.log("ADD OWNER AND REPO NAME IN THE NODE ARUGUMENTS PAL !");
    return;
  }
console.log(result);
  console.log('test');

  const contributors = JSON.parse(result);



  contributors.forEach(function(contributor) {


    let url = contributor.avatar_url;

    let path = `./avatars/${contributor.login}.jpg`;

    downloadImageByURL(url, path);
  });
});