// **DO THIS**:
//   Replace BUCKET_NAME with the bucket name.
//
var albumBucketName = 'petersphotogallery';

// **DO THIS**:
//   Replace this block of code with the sample code located at:
//   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
//
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:cc56fc78-98c9-45fd-aca1-a6f98aa1892f',
});

// Create a new service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

// A utility function to create HTML.
function getHtml(template) {
  return template.join('\n');
}


//
// Functions
//

// List the photo albums that exist in the bucket.
function listAlbums() {
  s3.listObjects({Delimiter: '/'}, function(err, data) {
    if (err) {
      return alert('There was an error listing your albums: ' + err.message);
    } else {
      var albums = data.CommonPrefixes.map(function(commonPrefix) {
        var prefix = commonPrefix.Prefix;
        var albumName = decodeURIComponent(prefix.replace('/', ''));
        return getHtml([
          '<div class = "btn-group" style = "padding: 20px">',
            '<button class="btn btn-sm" style="margin-top:20px; border:2px solid #000000;" onclick="viewAlbum(\'' + albumName + '\')">',
              albumName,
            '</button>',
            '</div>'
        ]);
      });
      var message = albums.length ?
        getHtml([
          '<p style = "text-align: center;">Click on an album name to view it.</p>',
        ]) :
        '<p style = "text-align: center;">You do not have any albums. Please Create album.';
      var htmlTemplate = [
        '<h2 style = "text-align: center; padding: 25px" >Albums</h2>',
        message,
        '<div style = "margin: 0; position: absolute; left: 50%;  -ms-transform: translate(-50%, 0%) ;  transform: translate(-50%, 0%);">',
          getHtml(albums),

          '</div>'
      ]
      document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
    }
  });
}

// Show the photos that exist in an album.
function viewAlbum(albumName) {
  var albumPhotosKey = encodeURIComponent(albumName) + '/';
  s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
    if (err) {
      return alert('There was an error viewing your album: ' + err.message);
    }
    // 'this' references the AWS.Response instance that represents the response
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + '/';


    //gets photo from s3
    var photos = data.Contents.map(function(photo) {
      var photoKey = photo.Key;
      var photoUrl = bucketUrl + encodeURIComponent(photoKey);
      return getHtml([
          "<div class='col-sm-4'>",

            "<figure class='photo-frame'>",
            "<img src=' " + photoUrl + "' class='gallery'/>",
            "</figure>",
          '</div>',
      ]);
    });


    //if there are photos in the album, display first message, otherwise display second message
    var message = photos.length ?
      '<p>The following photos are present.</p>' :
      '<p>There are no photos in this album.</p>';

      //template for how website is going to be formated

    var htmlTemplate = [
//button to go back


      //photo
      '<div class= "col-lg-12">',
        '<div class="gallery-backdrop">',
          '<div id = "gallery" class="case photo-gallery">',
            getHtml(photos),
          '</div>',
        '</div>',
      '</div>',

  //end of album and button to go back to list of albums

  '<div class = "col-sm-5" style=  "margin: auto; padding-bottom: 10px; width: 60%; transform: translate(-50%, -50%); ">',
    '<button type="button" onclick="listAlbums()" class="btn btn-sm" style="margin-top:20px; border:2px solid #000000;">',
      'Back To Albums',
    '</button>',
  '</div>',
    ]
    document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
    document.getElementsByTagName('div')[6].setAttribute('style', 'display:none !important;');
  });
}



function viewMainAlbum(albumName) {
  albumName = 'Favorites';
  var albumPhotosKey = encodeURIComponent(albumName) + '/';
  s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
    if (err) {
      return alert('There was an error viewing your album: ' + err.message);
    }
    // 'this' references the AWS.Response instance that represents the response
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + '/';


    //gets photo from s3
    var photos = data.Contents.map(function(photo) {
      var photoKey = photo.Key;
      var photoUrl = bucketUrl + encodeURIComponent(photoKey);
      return getHtml([
          "<div class='col-sm-4'>",

            "<figure class='photo-frame'>",
            "<img src=' " + photoUrl + "' class='gallery'/>",
            "</figure>",
          '</div>',
      ]);
    });


    //if there are photos in the album, display first message, otherwise display second message
    var message = photos.length ?
      '<p>The following photos are present.</p>' :
      '<p>There are no photos in this album.</p>';

      //template for how website is going to be formated

    var htmlTemplate = [
//button to go back


      //photo
      '<div class= "col-lg-12">',
        '<div class="gallery-backdrop">',
          '<div id = "gallery" class="case photo-gallery">',
            getHtml(photos),
          '</div>',
        '</div>',
      '</div>',
  //end of album and button to go back to list of albums

      '<div class = "col-sm-5" style=  "margin: auto; padding-bottom: 10px; width: 60%; transform: translate(-50%, -50%); ">',
        '<button type="button" onclick="listAlbums()" class="btn btn-sm" style="margin-top:20px; border:2px solid #000000;">',
          'Back To Albums',
        '</button>',
      '</div>',
    ]
    document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
    document.getElementsByTagName('div')[6].setAttribute('style', 'display:none !important;');
  });
}
