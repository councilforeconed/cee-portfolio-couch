var couchapp = require('couchapp');

ddoc = { _id:'_design/publications' };

ddoc.views = {
  "publications": {
    map: function (doc) {
      emit(doc.source, 1);
    },
    reduce: "_count"
  }
};

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  } 
}

module.exports = ddoc;