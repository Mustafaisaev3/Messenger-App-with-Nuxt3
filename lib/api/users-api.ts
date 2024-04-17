// import { ResponseStatus } from "~/types";
// import type { ResponseType } from "~/types";

// Функция для получения всех пользователей
// export const getUsers = async () => {
//   try {
//     const response = await $fetch('/api/users/users');
//     console.log(response)

//     return {
//       status: ResponseStatus.SUCCESS,
//       data: response
//     }
//   } catch (error) {
//     console.log('Fetch users:', error)

//     return {
//       status: ResponseStatus.ERROR,
//       message: error
//     }
//   }
// };

export const USERS_API_URL = {
    getUser: '/api/users/user',
    getUsers: '/api/users/users',
}