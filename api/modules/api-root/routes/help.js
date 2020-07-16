'use strict';
module.exports = function (req, res) {


  var data = `
  //------------------------------------------------------------------------------------------
    status 204://no content
  
  //------------------------------------------------------------------------------------------
    status 400: //error en la peticion del cliente
      {
        errors:[
          {
            code: "",
            title: "",
            field: ""
          }
        ]
      }
  
  //------------------------------------------------------------------------------------------
    status 401: //not allowed
      {
        errors:[
          {
            code: "",
            title: "",
            field: ""
          }
        ]
      }
      
  //------------------------------------------------------------------------------------------
    status 403: //forbidden
      {
        errors:[
          {
            code: "",
            title: "",
            field: ""
          }
        ]
      }
  
      
  //------------------------------------------------------------------------------------------
    status 500: //error en el api
      {
        errors:[
          {
            code: "",
            title: "",
            field: ""
          }
        ]
      }    
  `;

  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(data);
  return res.end();
};