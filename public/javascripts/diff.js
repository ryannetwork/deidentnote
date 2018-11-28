
var diff = JsDiff.diffWords($("#ident").html() , $("#deid").html(), {ignoreCase: true} ),
    display = document.getElementById('display'),
    fragment = document.createDocumentFragment();

diff.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  color = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
  span = document.createElement('span');
  span.style.color = color;
  span.appendChild(document
    .createTextNode(part.value.replace(/\. /g, ". \r\n")));
  fragment.appendChild(span);
});

display.appendChild(fragment);
