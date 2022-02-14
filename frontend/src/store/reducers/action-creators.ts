import { AppActionCreators } from "./app/action-creators";
import { AuthActionCreators } from "./auth/action-creators";
import { ProgTestsActionCreators } from "./progTests/action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...ProgTestsActionCreators,
  ...AppActionCreators,
};
