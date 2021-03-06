const url = require('url');

html = {
  render(path, response){
    fs.readFile(path, null, function(error, data){
      if(error){
        response.writeHead(404);
        response.write('file not found');
      }
      else{
        response.write(data);
      }
      response.end();
      });

  }
}

module.exports = {
    handleRequest(request, response) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        let path = url.parse(request.url).pathname;

        switch(path){
          case '/':
            html.render('./pages/index.html', response);
            break;
          case '/about':
            html.render('./pages/about.html', response);
            break;
          default:
                response.writeHead(404);
                response.write('Route not found');
                response.end();
        }
    }
}
