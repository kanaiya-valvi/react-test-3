module.exports = function (api) {
  api.cache.forever(true); // api.cache(true)
  // api.cache.never(); // api.cache(false)
  // api.cache.using(fn); // api.cache(fn)
  return {
    plugins: ["macros"],
  };
};
