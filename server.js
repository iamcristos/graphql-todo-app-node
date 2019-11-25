const { app, server } = require('./api/graphqlRouter');
const mongoConnection = require('./db');

const PORT = process.env.PORT || 9000;

mongoConnection('mongodb://localhost/test');

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
