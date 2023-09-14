import { User } from "../entities";

async function userFindById(id: number) {
  const user = await User.findOneBy({ id });

  if (!user) throw new Error("NOT_FOUND");

  return user;
}

async function userEditById(id: number, data: any) {
  const user = await User.findOneBy({ id });

  if (!user) throw new Error("BAD_REQUEST");

  user.username = user.username || data.username;
  user.firstname = user.firstname || data.firstname;
  user.lastname = user.lastname || data.lastname;

  await user.save();

  return "user updated successfully";
}

async function userDeleteById(id: number) {
  const user = await User.delete({ id });

  if (user.affected === 0) throw new Error("BAD_REQUEST");

  return "user deleted successfully";
}

export { userEditById, userDeleteById, userFindById };
