import { Action, ACTION_TYPES, StateType } from './contextUtils';

export const AppReducer = (state: StateType, action: Action) => {
  // const router = useRouter();
  // const { t, locale } = useTranslation();
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return { ...state, user: action.payload } as StateType;
    }
    case ACTION_TYPES.SET_COMPARING: {
      let comparingList = [...state.comparing];
      // Get the index of id in the array
      const index = comparingList
        .map(function (x) {
          return x.id;
        })
        .indexOf(action.payload.id);
      console.log(index);
      if (index > -1) {
        // This means id is present in the array, so remove it
        comparingList.splice(index, 1);
        console.log('not adding');
      } else {
        // This means id is not present in the array, so add it
        comparingList.push(action.payload);
        console.log('adding');
      }
      console.log(comparingList);
      return { ...state, comparing: comparingList } as StateType;
    }
    case ACTION_TYPES.CLEAR_COMPARING: {
      return { ...state, comparing: [] };
    }

    default:
      return state;
  }
};
