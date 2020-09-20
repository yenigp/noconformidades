'use strict';
module.exports = function (req, res) {
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    req.query = {
      getByid: true,
      get    : true,
      post   : true,
      patch  : true,
      delete : true
    }
  }
  var data    = `
    params:
      get=1
      post=1
      patch=1
      delete=1
      show=1


  `;
  var getHelp = `
    //------------------------------------------------------------------------------------------
    get: /v1/producto
    headers:
          Authorization: Bearer tokenxyz
    query params:
      {
        ?limit=10
        ?offset=0
        ?order=-createdAt,id
        ?filter[id][$gte]=4
        // For more information check out http://sequelize.readthedocs.org/en/latest/docs/querying.
      }
    return:
      status 200:
        {
          links:{
            client: "http://localhost:4000/v1/client/:id"
          },
          meta:{
            pagination:{
              count: 10,
              total: 57
            }
          },
        }
  `;

  var postHelp = `
  //------------------------------------------------------------------------------------------
  post: /v1/producto
    headers:
        Content-Type: application/json
        Authorization: Bearer tokenxyz
    body params:
      {
      }
    return:
      status 201:
        {
          data:[
            {
            }
          ]
        }
  `;

  var patchHelp = `
  //------------------------------------------------------------------------------------------
  patch: /v1/producto
    headers:
          Content-Type: application/json
          Authorization: Bearer tokenxyz
    body params:
      {
      }
    return:
      status 200:
        {
          data:[
            {
            }
          ]
        }
  `;

  var deleteHelp = `
  //------------------------------------------------------------------------------------------
    delete: /v1/producto/:id
    headers:
          Authorization: Bearer tokenxyz

    return:
      status 204
      // no content
  `;

  var getByIdHelp = `
  //------------------------------------------------------------------------------------------
    get: /v1/producto/:id
    headers:
          Authorization: Bearer tokenxyz
    return:
      status 200:
        {
          data:[
            {
            }
          ]
        }
  `;

  if (req.query.get == true || req.query.get == 'true') {
    data += getHelp;
  }
  if (req.query.getByid == true || req.query.getByid == 'true') {
    data += getByidHelp;
  }
  if (req.query.post == true || req.query.post == 'true') {
    data += postHelp;
  }

  if (req.query.patch == true || req.query.patch == 'true') {
    data += patchHelp;
  }

  if (req.query.delete == true || req.query.delete == 'true') {
    data += deleteHelp;
  }

  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(data);
  return res.end();
};
