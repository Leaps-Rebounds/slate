const crypto = require('crypto');
const name_shortener = require('./config/utilities/name-shortener');

module.exports = function(module, chunks, cacheGroup) {
  let containsLayout = false;
  let names = chunks
    .map((chunk) => {
      if (chunk.name.includes('layout.')) {
        containsLayout = true;
      }
      return chunk.name;
    })
    .filter(
      (name) => !containsLayout || (containsLayout && name.includes('layout.')),
    );

  if (!names.every(Boolean)) return;

  names = names.map(name => name_shortener.toShortName(name)).sort();
  // names.sort();
  let name =
    (cacheGroup && cacheGroup !== 'default' ? `${cacheGroup}@` : '') +
    names.join('@');

  // Filenames and paths can't be too long otherwise an
  // ENAMETOOLONG error is raised. If the generated name is too
  // long, it is truncated and a hash is appended. The limit has
  // been set to 100 to prevent `[name].[chunkhash].[ext]` from
  // generating a 256+ character string.

  // Using this leads to a hellish webpack issue where it compiles
  // correctly but doesn't run javascript in certain entrypoints
  // if (name.length > 200) {
  //   name = `${name.slice(0, 200)}.${hashFilename(name)}`;
  // }

  /* eslint-disable-next-line consistent-return */
  return name;
};

function hashFilename(name) {
  return crypto
    .createHash('md4')
    .update(name)
    .digest('hex')
    .slice(0, 8);
}
