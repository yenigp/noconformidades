var Validator       = require('sequelize').Validator;
exports.CheckParams = class CheckParams {
  constructor(errors) {
    this.errors           = errors;
    this.checkSimpleTypes = {
      "FLOAT"   : this.checkFloat,
      "INTEGER" : this.checkInteger,
      "DATE"    : this.checkDate,
      "BOOLEAN" : this.checkBoolean,
      "STRING"  : this.checkString,
      "ENUM"    : this.checkEnum,
      "excluded": this.checkExcluded,
      "-"       : this.checkExcluded,
      "@"       : this.checkEmail,
      "EMAIL"   : this.checkEmail,
    };

    this.checkComplexTypes = {
      '{}'         : this.checkStruct,
      'struct'     : this.checkStruct,
      'object'     : this.checkStruct,
      "[{}]"       : this.checkArrayStruct,
      "arrayStruct": this.checkArrayStruct,
      "[]"         : this.checkArray,
      "array"      : this.checkArray
    };
  }

  /**
   * @description                    funcion para chequear dado una estructura que los parametros
   *                                 requeridos vengan, y que los parametros que lleguen tengan
   *                                 la estrucura esperada
   *
   * @param listToCheck              listado de parametros a revisar
   * @param listOfExpectedParams     listado de parametros posibles en la estructura a proveer
   * @param path=""                  path hasta la estructura que se este procesando
   *
   * */

  run(listToCheck, listOfExpectedParams, path = "") {
    return this.checkParams(this, listToCheck, listOfExpectedParams, path = "")
  }

  /**
   * @description                          agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkExcluded(self, value, fullCheck, path) {
    if (fullCheck.defaultValue==value){
      return;
    }
    if (value != undefined) {
      /**
       * add error, Not expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'No permitido'
      })
    }
  }

  /**
   * @description                         revisa si el value es de tipo float
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkFloat(self, value, fullCheck, path) {
    if (fullCheck.capture!=undefined){
      fullCheck.capture(value)
    }
    if (isNaN(value)) {
      /**
       * add error, float expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'decimal esperado'
      })
    }
  }

  /**
   * @description                         revisa si el value es de tipo email
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkEmail(self, value, fullCheck, path) {
    if (fullCheck.capture!=undefined){
      fullCheck.capture(value)
    }
    if (!Validator.isEmail(value)) {
      /**
       * add error, float expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Email esperado'
      })
    }
  }



  /**
   * @description                         revisa si el value es de tipo enum
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkEnum(self, value, fullCheck, path) {
    if (fullCheck.capture!=undefined){
      fullCheck.capture(value)
    }
    if (fullCheck.values.indexOf(value)==-1) {
      /**
       * add error, enum expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: fullCheck.value.join(" o ")+' esperado'
      })
    }
  }
  
  /**
   * @description                         revisa si el value es de tipo integer
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkInteger(self, value, fullCheck, path) {
    if (fullCheck.capture!=undefined){
      fullCheck.capture(value)
    }
    if (isNaN(value) || value === "") {
      /**
       * add error, integer expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Entero esperado',
        code : 2
      })
    }
    else {
      /**
       * check if is float
       * */
      var pointPosition = value.toString().split('.')[1]
      if (pointPosition != undefined && parseInt(pointPosition) != 0) {
        self.errors.push({
          field: path + '.' + fullCheck.name,
          title: 'Entero esperado',
          code : 3
        })
      }
    }
  }

  /**
   * @description                         revisa si el value es de tipo date
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkDate(self, value, fullCheck, path) {
    value = new Date(value);
    if (value.toString() == 'Invalid Date') {
      /**
       * add error, date expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Fecha ínválida',
        code : 4
      })
    }
  }

  /**
   * @description                         revisa si el value es de tipo boolean
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkBoolean(self, value, fullCheck, path) {
    if (value !== true && value !== false && value !== 1 && value !== 0) {
      /**
       * add error, boolean expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Boolean esperado',
        code : 5
      })
    }
  }

  /**
   * @description                         revisa si el value es de tipo string
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura completa contra la que tenemos que chequear la data
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   * */

  checkString(self, value, fullCheck, path) {
    if (fullCheck.capture!=undefined){
      fullCheck.capture(value)
    }
    if (value.constructor != String) {
      /**
       * add error, string expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'texto esperado',
        code : 6
      })
    }
  }

  /**
   * @description                         revisa si el value es de tipo struct,
   *                                      en caso de serlo verifica recursivamente los sub objetos
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura a chequear
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   *
   *
   * @example     {
      name     : "downLeftPoint",
      type     : 'struct',
      struct   : [
        {
          name     : "lat",
          type     : 'float',
          required: true
        },
        {
          name     : "long",
          type     : 'float',
          required: true
        },
      ],
      required: false
    },
   *
   * */

  checkStruct(self, value, fullCheck, path) {
    if (value.constructor != Object) {
      /**
       * add error, structure expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Objeto esperado',
        code : 7
      })
    }
    else {
      /**
       * acceder al arreglo del struct (ver ejemplo) y chequear cada parametro
       * */
      var struct = fullCheck.struct;
      if (struct.constructor != Array) {
        struct = [struct];
      }
      self.checkParams(self, value, struct, path + '.' + fullCheck.name)
    }
  }

  /**
   * @description                         revisa si el value es de tipo arrayStruct,
   *                                      en caso de serlo verifica recursivamente los sub objetos
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura a chequear
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   *
   * @example      {
      name     : "rooms",
      type     : 'arrayStruct',
      struct   : [
        {
          name     : "adults",
          type     : 'integer',
          required: true
        },
        {
          name     : "children",
          type     : 'array',
          subType  : 'integer',
          required: true
        },
      ],
      required: false
    },
   *
   * */

  checkArrayStruct(self, values, fullCheck, path) {
    if (values.constructor != Array) {
      /**
       * add error, Array expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Arreglo esperado',
        code : 9
      })
    }
    else {
      /**
       * pasar por cada struct
       * */
      var struct = fullCheck.struct;
      for (var j = 0; j < values.length; j++) {
        if (fullCheck.capture!=undefined){
          fullCheck.capture(values[j]);
        }
        for (var i = 0; i < struct.length; i++) {
          /**
           * pasar por cada struct y ver si es required entonces
           * verificar en el value que exista o error
           * */

          if (values[j][struct[i].name] == undefined && struct[i].defaultValue != undefined) {
            console.log('asignando nuevo nombre');
            values[j][struct[i].name] = struct[i].defaultValue
          }
          if (struct[i].required == true) {
            if (values[j][struct[i].name] != undefined) {
              self.checkParams(self, values[j], [struct[i]], path + '.' + fullCheck.name + '.[' + j.toString() + ']');
            }
            else {
              self.errors.push({
                field: path + '.' + fullCheck.name + '.[' + j.toString() + '].' + struct[i].name,
                title: struct[i].type + ' esperado',
                code : 10
              })
            }
          }else{
            if (values[j][struct[i].name] != undefined) {
              self.checkParams(self, values[j], [struct[i]], path + '.' + fullCheck.name + '.[' + j.toString() + ']');
            }
          }
        }
      }
    }
  }

  /**
   * @description                         revisa si el value es de tipo array,
   *                                      en caso de serlo verifica que todos los elementos sean del subtype
   *                                      en caso de no serlo agrega un error a la lista de errores
   *
   * @param value                         valor del atributo, este es el que vamos a chequear
   * @param fullCheck                     extructura a chequear
   * @param path                          previa ruta hasta llegar al valor del que hacemos referencia
   *                                      en el chequeo
   *
   * @example
   * {
          name     : "children",
          type     : 'array',
          subType  : 'INTEGER',
          required: true
        },


   * */

  checkArray(self, value, fullCheck, path) {
    if (value.constructor != Array) {
      /**
       * add error, Array expected
       * */
      self.errors.push({
        field: path + '.' + fullCheck.name,
        title: 'Arreglo esperado',
        code : 8
      })
    }
    else {
      /**
       * acceder al arreglo (ver ejemplo) y chequear cada elemento que sea del subType
       * */
      var subType = fullCheck.subType;
      /**
       * Chequear si el subType no existe lanzar error
       * */
      if (self.checkSimpleTypes[subType] != undefined) {
        var tempFunction = self.checkSimpleTypes[subType];
        for (var i = 0; i < value.length; i++) {
          tempFunction(self, value[i], {name: '[' + i.toString() + ']'}, path + '.' + fullCheck.name);
        }
      }
      else {
        console.trace(subType);
        throw new Error('Unknown sub type ' + subType)
      }
    }
  }

  /**
   * @description                    funcion para chequear dado una estructura que los parametros
   *                                 requeridos vengan, y que los parametros que lleguen tengan
   *                                 la estrucura esperada
   *
   * @param listToCheck              listado de parametros a revisar
   * @param listOfExpectedParams     listado de parametros posibles en la estructura a proveer
   * @param path=""                  path hasta la estructura que se este procesando
   *
   * */

  checkParams(self, listToCheck, listOfExpectedParams, path = "") {
    var check = false;
    for (var i = 0; i < listOfExpectedParams.length; i++) {
      check = false;
      if (listToCheck[listOfExpectedParams[i].name] != undefined && listOfExpectedParams[i].dependsOf != undefined) {
        for (var r = 0; r < listOfExpectedParams[i].dependsOf.length; r++) {
          if (listToCheck[listOfExpectedParams[i].dependsOf[r]] == undefined) {
            self.errors.push({
              field   : path + '.' + listOfExpectedParams[i].name,
              title   : 'Depende de un campo indefinido',
              depended: listOfExpectedParams[i].dependsOf[r],
              code    : 16
            })
          }
        }
      }
      if (listOfExpectedParams[i].defaultValue != undefined && listToCheck[listOfExpectedParams[i].name] == undefined) {
        /**
         * Si le tengo un valor por defecto y no viene ninguno, entonces pongo ese
         * */
        listToCheck[listOfExpectedParams[i].name] = listOfExpectedParams[i].defaultValue;
      }
      if (listOfExpectedParams[i].required == true) {
        if (listToCheck[listOfExpectedParams[i].name] == undefined) {
          /**
           * add undefined field error
           * */
          self.errors.push({
            field: path + '.' + listOfExpectedParams[i].name,
            title: 'Es requerido',
            code : 1
          })
        }
        else {
          check = true;
        }
      }
      else if (listToCheck[listOfExpectedParams[i].name] != undefined) {
        /**
         * es opcional, pero si viene hay que chequear que este bien
         * */
        check = true;
      }

      if (check) {
        /**
         * chequear valor a ver si es del tipo esperado
         * */
        /**
         * chequear si es de tipo de dato simple
         * */
        if (self.checkSimpleTypes[listOfExpectedParams[i].type] != undefined) {
          /**
           * es un atributo simple
           * */
          self.checkSimpleTypes[listOfExpectedParams[i].type](self, listToCheck[listOfExpectedParams[i].name], listOfExpectedParams[i], path)
        }
        else if (self.checkComplexTypes[listOfExpectedParams[i].type] != undefined) {
          /**
           * es un atributo complejo
           * */
          self.checkComplexTypes[listOfExpectedParams[i].type](self, listToCheck[listOfExpectedParams[i].name], listOfExpectedParams[i], path)
        }
        else {
          console.trace(listOfExpectedParams[i].type);
          throw new Error('Unknown type ' + listOfExpectedParams[i].type);
        }
      }
    }
  }
};
