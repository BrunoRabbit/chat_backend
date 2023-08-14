class ErrorGenerator extends Error {
    constructor(code, message) {  
      super(message);
      this.code = code;
      this.name = message;
    }
  }
  
  module.exports = ErrorGenerator;