(async function () {
  if (process.env.NODE_ENV === 'development' || process.env.CI === 'true')
    process.exit(0);
  const husky = (await import('husky')).default;
  console.log(husky());
})();
