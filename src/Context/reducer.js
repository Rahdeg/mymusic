export const actionType = {
  SET_USER: "SET_USER",
  SET_ALLUSERS: "SET_ALLUSERS",
  SET_ALLALBUMS: "SET_ALLALBUMS",
  SET_ALLSONGS: "SET_ALLSONGS",
  SET_ALLARTIST: "SET_ALLARTIST",
  SET_FILTERTERM: "SET_FILTERTERM",
  SET_ARTISTFILTER:"SET_ARTISTFILTER",
  SET_LANGUAGEFILTER:"SET_LANGUAGEFILTER",
  SET_ALBUMFILTER:"SET_ALBUMFILTER",
  SET_ALERTTYPE:"SET_ALERTTYPE"
};

const reducer = (state, action) => {
  console.log(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_ALLUSERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case actionType.SET_ALLALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };
    case actionType.SET_ALLSONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };
    case actionType.SET_ALLARTIST:
      return {
        ...state,
        allArtists: action.allArtists,
      };
      case actionType.SET_FILTERTERM:
        return {
          ...state,
          filterTerm: action.filterTerm,
        };
        case actionType.SET_ARTISTFILTER:
        return {
          ...state,
          artistFilter: action.artisFilter,
        };
        case actionType.SET_LANGUAGEFILTER:
        return {
          ...state,
          languageFilter: action.languageFilter,
        };
        case actionType.SET_ALBUMFILTER:
        return {
          ...state,
          albumFilter: action.albumFilter,
        };
        case actionType.SET_ALERTTYPE:
        return {
          ...state,
          alertType: action.alertType,
        };
    default:
      return state;
  }
};

export default reducer;
