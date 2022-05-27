const app = require('express')();
const port = 8080;

class User {

}

app.listen(
    port,
    () => console.log('API berjalan di Port : ' + port)
);

