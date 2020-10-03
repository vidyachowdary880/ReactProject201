const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const path = require("path");
var cors = require("cors");
const server = jsonServer.create();
const userdb = JSON.parse(
  fs.readFileSync(path.join(__dirname, "users.json"), "UTF-8")
);
const router = jsonServer.router(path.join(__dirname, "db.json"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
const SECRET_KEY = "123456789";
const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    console.log(decode);
    decode !== undefined ? decode : err;
  });
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return userdb.find(
    (user) => user.email === email && user.password === password
  );
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = isAuthenticated({ email, password });
  if (!user) {
    const status = 400;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  let role = user.role;
  const access_token = createToken({ email, role });

  res.status(200).json({ access_token });
});

server.post("/auth/signup", (req, res) => {
  const { email } = req.body;

  if (userdb.findIndex((user) => user.email === email) !== -1) {
    const status = 400;
    const message = "Email already present";
    res.status(status).json({ status, message });
    return;
  } else {
    const { users } = userdb;
    let userSize = users.length;
    req.body.id = userSize + 1;
    req.body.role = "basic";
    users.push(req.body);
    console.log(users);
    fs.writeFile(
      path.join(__dirname, "users.json"),
      JSON.stringify(users),
      function (err) {
        err
          ? res.status(400).json({ status: "400", message: "error occured" })
          : res.status(201).json({ status: "201", message: "successfull" });
      }
    );
  }
});
/* server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.method !== "GET") {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      const status = 401;
      const message = "Bad authorization header";
      res.status(status).json({ status, message });
      return;
    }
    try {
      verifyToken(req.headers.authorization.split(" ")[1]);
      next();
    } catch (err) {
      const status = 401;
      const message = "Error: access_token is not valid";
      res.status(status).json({ status, message });
    }
  }
}); */

server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
