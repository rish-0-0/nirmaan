const templates = [
  "react-redux",
  "react-native-redux",
  "express-sequelize-redis",
  "express-sequelize-postgres",
  "express-static-serve-react",
  "express-graphql-subscriptions"
];

const project_map = {
  "react-redux": "https://gitlab.com/caarya-base/react-redux.git",
  "react-native-redux": "https://gitlab.com/caarya-base/react-native-redux.git",
  "express-sequelize-postgres":
    "https://gitlab.com/caarya-base/express-sequelize-postgres.git",
  "express-sequelize-redis":
    "https://gitlab.com/caarya-base/express-sequelize-redis.git",
  "express-static-serve-react":
    "https://gitlab.com/caarya-base/express-static-serve-react.git",
  "express-graphql-subscriptions": "https://github.com/rish-0-0/express-graphql-subscriptions.git",
};

module.exports = { templates, project_map };
