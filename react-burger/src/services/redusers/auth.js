import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  GET_FORGOT_REQUEST,
  GET_FORGOT_SUCCESS,
  GET_FORGOT_FAILED,
  GET_RESET_REQUEST,
  GET_RESET_SUCCESS,
  GET_RESET_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_SAVE_REQUEST,
  GET_SAVE_SUCCESS,
  GET_SAVE_FAILED,
  CHECK_COMPLETE,
} from "../actions/auth";

const authState = {
  isUserChecked: false,

  loginRequest: false,
  loginFailed: false,
  loginAnswer: "",
  loginSuccess: false,

  registerRequest: false,
  registerFailed: false,
  registerAnswer: "",
  registerSuccess: false,

  forgotRequest: false,
  forgotFailed: false,
  forgotAnswer: null,
  forgotSuccess: false,

  resetRequest: false,
  resetFailed: false,
  resetAnswer: null,
  resetSuccess: false,

  userRequest: false,
  userFailed: false,
  userAnswer: null,
  userSuccess: false,

  userEmail: "",
  userName: "",

  saveRequest: false,
  saveFailed: false,
  saveAnswer: null,
  saveSuccess: false,
};

export const AuthReducer = (state = authState, action) => {
  switch (action.type) {
    case CHECK_COMPLETE: {
        return {
          ...state,
          isUserChecked: true,
        };
      }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      console.log(action);
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        loginSuccess: true,
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        loginAnswer: "неверный пароль или почта",
      };
    }

    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case GET_REGISTER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        registerSuccess: true,
      };
    }
    case GET_REGISTER_FAILED: {
      console.log(action);
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
        registerAnswer: "пользователь уже существует",
      };
    }
    case GET_FORGOT_REQUEST: {
      return {
        ...state,
        forgotRequest: true,
      };
    }
    case GET_FORGOT_SUCCESS: {
      console.log(action);
      return {
        ...state,
        forgotFailed: false,
        forgotRequest: false,
        forgotSuccess: true,
        forgotAnswer: "прошло",
      };
    }
    case GET_FORGOT_FAILED: {
      console.log(action);
      return {
        ...state,
        forgotFailed: true,
        forgotRequest: false,
        forgotAnswer: "нет такого имейла",
      };
    }
    case GET_RESET_REQUEST: {
      return {
        ...state,
        resetRequest: true,
      };
    }
    case GET_RESET_SUCCESS: {
      console.log(action);
      return {
        ...state,
        resetFailed: false,
        resetRequest: false,
        resetSuccess: true,
        resetAnswer: "прошло",
      };
    }
    case GET_RESET_FAILED: {
      console.log(action);
      return {
        ...state,
        resetFailed: true,
        resetRequest: false,
        resetAnswer: "нет такого имейла",
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        userSuccess: true,
        userAnswer: "прошло",
        userEmail: action.email,
        userName: action.name,
      };
    }
    case GET_USER_FAILED: {
      console.log(action);
      return {
        ...state,
        userFailed: true,
        userRequest: false,
        userAnswer: "чтото не так",
      };
    }
    case GET_SAVE_REQUEST: {
      return {
        ...state,
        saveRequest: true,
      };
    }
    case GET_SAVE_SUCCESS: {
      console.log(action);
      return {
        ...state,
        saveFailed: false,
        saveRequest: false,
        saveSuccess: true,
        saveAnswer: "прошло",
        userEmail: action.email,
        userName: action.name,
      };
    }
    case GET_SAVE_FAILED: {
      console.log(action);
      return {
        ...state,
        saveFailed: true,
        saveRequest: false,
        saveAnswer: "чтото не так",
      };
    }
    default:
      return state;
  }
};
