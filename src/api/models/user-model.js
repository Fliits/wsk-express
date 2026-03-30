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

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return { user_id: newId };
};

export { listAllUsers, findUserById, addUser };
