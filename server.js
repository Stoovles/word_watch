const app = require('./app')
const express = require("express");

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🏃🏼‍🏃🏼‍🏃🏼‍`)
});
