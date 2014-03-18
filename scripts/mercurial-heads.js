var colors = require('colors');
var S = require('string');

process.stdin.setEncoding('utf8');

var hgOutput = '';
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    hgOutput += chunk;
  }
});

function parse(input) {
  return input.split('\n')
  .filter(function(line) {
    return line.trim().length > 0;
  })
  .map(function(line) {
    var parts = line.replace(/ +/, ' ').split('|');
    return {
      branch: parts[0],
      changeset: parts[1],
      age: parts[2],
      author: parts[3]
    };
  });
}

function getBranchesMatching(heads, regex) {
  return heads.filter(function(head) {
    return head.branch.match(regex) !== null;
  });
}

function printSection(title) {
  console.log(title.cyan.underline);
}

function printSpacer() {
  console.log();
}

function isOutdated(head) {
  return head.age.match(/years|months|weeks/) !== null;
}

function printHead(head, longest) {
  var line = '  ';

  line += S(head.branch).padRight(longest.branch).s;
  line += '  ';
  line += S(head.changeset).padRight(longest.changeset).s;
  line += '  ';
  var age = S(head.age).padRight(longest.age).s;
  if (isOutdated(head)) {
    age = age.red;
  }
  line += age;
  line += '  ';
  line += S(head.author).padRight(longest.author).s;

  console.log(line);
}

function determineLongestParts(heads) {
  var longest = {};

  heads.forEach(function(head) {
    Object.keys(head).forEach(function(prop) {
      longest[prop] = longest[prop] || 0;
      var length = head[prop].toString().length;
      if (length > longest[prop]) {
        longest[prop] = length;
      }
    });
  });

  return longest;
}

function compareBranchNames(head1, head2) {
  return head1.branch.localeCompare(head2.branch, 'de');
}

function print(heads) {
  var longest = determineLongestParts(heads);
  var printedBranches = [];

  var printHeads = function(branchRegex) {
    getBranchesMatching(heads, branchRegex)
    .sort(compareBranchNames)
    .forEach(function(head) {
      printedBranches.push(head.branch);
      printHead(head, longest);
    });
  };

  printSection('Main');
  printHeads(/^develop$/);
  printHeads(/^master|default$/);
  printSpacer();
  printSection('Feature Branches');
  printHeads(/^ICISCRM-.*/);
  printSpacer();
  printSection('Other Branches');
  heads.filter(function(head) {
    return printedBranches.indexOf(head.branch) === -1;
  })
  .sort(compareBranchNames)
  .forEach(function(head) {
    printHead(head, longest);
  });
}

process.stdin.on('end', function() {
  print(parse(hgOutput));
});
