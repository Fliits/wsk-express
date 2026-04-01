// mock data
const userItems = [
  {
    user_id: 9592,
    name: "Frank",
    username: "Frank",
    email: "frank@example.com",
    role: "admin",
    password: "password123",
  },
  {
    user_id: 9590,
    name: "Bob",
    username: "Mittens",
    email: "mittens@example.com",
    role: "user",
    password: "password456",
  },
];

import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  console.log("rows", rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",
    [id],
  );
  console.log("rows", rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, role, password];
  const [result] = await promisePool.execute(sql, params);
  console.log("result", result);
  if (result.affectedRows === 0) {
    return false;
  }
  return { user_id: result.insertId };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  console.log("sql", sql);
  const [result] = await promisePool.execute(sql);
  console.log("result", result);
  if (result.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

const removeUser = async (id) => {
  const sql = promisePool.format(`DELETE FROM wsk_users WHERE user_id = ?`, [
    id,
  ]);
  console.log("sql", sql);
  const [result] = await promisePool.execute(sql);
  console.log("result", result);
  if (result.affectedRows === 0) {
    return false;
  }
  return { message: "success" };
};

export { listAllUsers, findUserById, addUser, modifyUser, removeUser };
// export only the functions that are used in the controller, the rest is homework
