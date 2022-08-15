export const actionType = {
  SET_USER: "SET_USER",
  SET_ALLUSERS: "SET_ALLUSERS",
  SET_ALLALBUMS: "SET_ALLALBUMS",
  SET_ALLSONGS: "SET_ALLSONGS",
  SET_ALLARTIST: "SET_ALLARTIST",
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

    default:
      return state;
  }
};

export default reducer;
