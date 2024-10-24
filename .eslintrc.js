module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {
    // Disable specific rules
    "react-hooks/exhaustive-deps": "off",   // Disable missing dependencies in useEffect
    "react/no-unescaped-entities": "off",   // Disable unescaped entities in JSX
    "@next/next/no-img-element": "off",     // Allow usage of <img> instead of <Image /> from next/image
  },
};
