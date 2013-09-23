var couchapp = require('couchapp');

ddoc = { _id:'_design/publications' };

ddoc.views = {
  "publications": {
    map: function (doc) {
      if (!doc.dead) emit(doc.source, doc);
    },
    reduce: "_count"
  },
  "publications-economics-standards": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        emit([doc.source, standard], doc)
      });
    },
    reduce: "_count"
  },
  "publications-personal-finance-standards": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        emit([doc.source, standard], doc)
      });
    },
    reduce: "_count"
  },
  "economics-standards-publications": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        emit([standard, doc.source], doc)
      });
    },
    reduce: "_count"
  },
  "personal-finance-standards-publications": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        emit([standard, doc.source], doc)
      });
    },
    reduce: "_count"
  },
  "count-format": {
    map: function (doc) {
      if (!doc.dead) emit(doc.format, doc)
    },
    reduce: "_count"
  },
  "student-targetted-lessons": {
    map: function(doc) {
      if (doc.audience === 'student' && doc.format === "print") emit({_id: doc._id, _rev: doc._rev}, null);
    }
  },
  "ms-world-history": {
    map: function(doc) {
      if (doc._id.match(/focus-middle-school-world-history-\d+/)) emit(null, doc);
    }
  }
};

ddoc.lists = {
  "publications": function (doc, req) {
    start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});
    
    send('<table class="table">');
    send('\t<thead>');
    send('\t\t<tr>');
    send('\t\t\t<th>Publication</th>');
    send('\t\t\t<th>Lessons</th>');
    send('\t\t</tr>');
    send('\t</thead>');
    send('\t<tbody>');
    
    var row;
    while (row = getRow()) {
      var publication = row.key;
      var count = row.value;
      send('\t\t<tr>\n\t\t\t<td>' + publication + '</td>\n\t\t\t<td>' + count + '</td>\n\t\t</tr>');
    }
    
    send('\t<tbody>');
    send('</table>');
    
  }
};

module.exports = ddoc;