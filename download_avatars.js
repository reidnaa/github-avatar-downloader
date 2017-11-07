var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


const owner = process.argv[2];
const repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}





function downloadImageByURL(url, filePath) {

  request.get(url);

  request.pipe(fs.createWriteStream(filePath));

   };





getRepoContributors(owner, repo, function(err, result) {

  if (!owner || !repo) {
    console.log("owner and repo name in node");
    return;
  }

  const contributors = JSON.parse(result);



  contributors.forEach(function(contributor) {


    let url = contributor.avatar_url;

    let path = `./avatars/${contributor.login}.jpg`;


    downloadImageByURL(url, path);
  });
});