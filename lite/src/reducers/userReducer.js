// const initialState = {
//   user: {
//     id : null,
//     email: '',
//     is_admin: false,
//     created_at: '',
//   }
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_TASK':
//       return {
//         ...state,
//         tasks: [...state.tasks, action.payload]
//       };
//     case 'DELETE_TASK':
//       return {
//         ...state,
//         tasks: state.tasks.filter(task => task.id !== action.payload)
//       };
//     default:
//       return state;
//   }
// };

// export default rootReducer;