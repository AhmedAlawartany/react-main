module.exports = {
    '*.{ts,tsx}': (filenames) => ['yarn format:fix', 'npm run validate'],
};
