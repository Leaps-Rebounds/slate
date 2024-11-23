function toShortName(name) {
  const segments = name.split('.').map(segment => {
    switch(segment) {
      case 'template':
        return 'TE';
      case 'product':
        return 'PR';
      case 'page':
        return 'PA';
      case 'blog':
        return 'BL';
      case 'article':
        return 'AR';
      case 'collection':
        return 'CO';
      default:
        return segment;
    }
  });
  return segments.join('.');
};

function toOriginalName(name) {
  const segments = name.split('.').map(segment => {
    switch(segment) {
      case 'TE':
        return 'template';
      case 'PR':
        return 'product';
      case 'PA':
        return 'page';
      case 'BL':
        return 'blog';
      case 'AR':
        return 'article';
      case 'CO':
        return 'collection';
      default:
        return segment;
    }
  });
  return segments.join('.');
}

module.exports = {
  toShortName,
  toOriginalName
}
