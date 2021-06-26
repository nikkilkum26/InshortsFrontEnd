const initialState = [{}];
let val = {};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORY":
      return { ...state, category: action.payload };
    case "HOME":
      return { ...state, flag: action.payload };
    case "NEWS":
      return { ...state, result: action.payload };
    case "ISLOGGEDIN":
      return { ...state, isLoggedIn: action.payload };

    default:
      return state;
  }
};
