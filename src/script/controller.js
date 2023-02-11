import axios from "axios";

export const AddUser = async (item) => {
  const baseURL = "https://cookclick-api.code.in.th/user/signup";
  try {
    const response = await axios.post(baseURL, item);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const UserLogin = async (item) => {
  const baseURL = "https://cookclick-api.code.in.th/user/login";
  try {
    const response = await axios.post(baseURL, item);
    return response.data;
  } catch (err) {
    console.error(err.response.data.message);
    return err.response.data;
  }
};

export const CheckSignupExist = async (type, value) => {
  const baseURL =
    "https://cookclick-api.code.in.th/user/signup/check?type=" +
    type +
    "&value=" +
    value;
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const GetSystemIngredient = async () => {
  const baseURL = "https://cookclick-api.code.in.th/systems/ingredients";
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const GetSystemKitchenware = async () => {
  const baseURL = "https://cookclick-api.code.in.th/systems/kitchenwares";
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const AddSysIngredient = async (token, ingredient) => {
  const baseURL = "https://cookclick-api.code.in.th/systems/ingredients";
  try {
    const response = await axios.post(baseURL, ingredient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const AddSysKitchenware = async (token, kitchenware) => {
  const baseURL = "https://cookclick-api.code.in.th/systems/kitchenwares";
  try {
    const response = await axios.post(baseURL, kitchenware, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const AddMenu = async (token, menu) => {
  const baseURL = "https://cookclick-api.code.in.th/me/menu";
  try {
    const response = await axios.post(baseURL, menu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return err.response.data;
  }
};

export const UpdateMenu = async (token, menu, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/me/menu/${menuId}`;
  try {
    const response = await axios.post(baseURL, menu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return err.response.data;
  }
};

export const AddorEditIngredient = async (token, ingredient) => {
  const baseURL = "https://cookclick-api.code.in.th/me/ingredients";
  try {
    const response = await axios.post(baseURL, ingredient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const AddorEditKitchenware = async (token, kitchenware) => {
  const baseURL = "https://cookclick-api.code.in.th/me/kitchenwares";
  try {
    const response = await axios.post(baseURL, kitchenware, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const AddMenuComment = async (token, comment, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}/comments`;
  try {
    const response = await axios.post(baseURL, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MemberReport = async (token, comment, memberId) => {
  const baseURL = `https://cookclick-api.code.in.th/reports/member/${memberId}`;
  try {
    const response = await axios.post(baseURL, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetMenuInfo = async (menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}`;
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const GetAllMeMenu = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/me/menu";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetAllMeFavMenu = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/menu/favorite";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetAllMeIngredient = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/me/ingredients";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetAllMeKitware = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/me/kitchenwares";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetAllMeMenuStatus = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/me/menu/status";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetWaitMeMenuStatus = async (token) => {
  const baseURL =
    "https://cookclick-api.code.in.th/me/menu/status?type=waitapprove";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetDraftMeMenuStatus = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/me/menu/status?type=draft";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelMeMenu = async (token, menu, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/me/menu/${menuId}`;
  try {
    const response = await axios.post(baseURL, menu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const RatingMenu = async (token, score, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}/rating`;
  try {
    const response = await axios.post(baseURL, score, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MenuApproveOrUnapprove = async (token, menuId, status, desc) => {
  const baseURL = `https://cookclick-api.code.in.th/requests/menu/${menuId}?status=${status}`;
  try {
    const response = await axios.put(baseURL, desc, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const CommentReport = async (token, comment, menuId, commentId) => {
  const baseURL = `https://cookclick-api.code.in.th/reports/menu/${menuId}/comments/${commentId}`;
  try {
    const response = await axios.post(baseURL, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MenuReport = async (token, comment, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/reports/menu/${menuId}`;
  try {
    const response = await axios.post(baseURL, comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MenuRequest = async (token, type) => {
  const baseURL = `https://cookclick-api.code.in.th/requests/menu?type=${type}`;
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MenuEdit = async (token, menuid) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/edit/${menuid}`;
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelMenu = async (token, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelComment = async (token, menuId, commentId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}/comments/${commentId}`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelMyComment = async (token, menuId, commentId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}/comments/${commentId}`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const SearchMenu = async (name) => {
  const baseURL = `https://cookclick-api.code.in.th/search/menu?name=${name}`;
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const SearchAdvance = async (token) => {
  const baseURL =
    "https://cookclick-api.code.in.th/search/ingredients_kitchenwares";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MenuReportedList = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/reports/menu";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const CommentReportedList = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/reports/menu/comments";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MemberReportedList = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/reports/member";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const EditMemberRole = async (token, memberID, role) => {
  const baseURL = `https://cookclick-api.code.in.th/member/${memberID}/roles?role=${role}`;
  try {
    const response = await axios.put(baseURL, "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetAdsList = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/adscontent";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const AdsEditing = async (token, adscontent) => {
  const baseURL = `https://cookclick-api.code.in.th/adscontents`;
  try {
    const response = await axios.post(baseURL, adscontent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const MemberBan = async (token, member, memberId) => {
  const baseURL = `https://cookclick-api.code.in.th/member/${memberId}/ban`;
  try {
    const response = await axios.put(baseURL, member, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const AddIngredientCategory = async (token, category) => {
  const baseURL = `https://cookclick-api.code.in.th/systems/categories`;
  try {
    const response = await axios.post(baseURL, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelIngredientCategory = async (token, category) => {
  const baseURL = `https://cookclick-api.code.in.th/systems/categories`;
  try {
    const response = await axios.post(baseURL, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelIngredient = async (token, ingredient) => {
  const baseURL = `https://cookclick-api.code.in.th/systems/ingredients`;
  try {
    const response = await axios.post(baseURL, ingredient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelKitware = async (token, kitwares) => {
  const baseURL = `https://cookclick-api.code.in.th/systems/kitchenwares`;
  try {
    const response = await axios.post(baseURL, kitwares, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const ImageUpload = async (token, menu, menuId) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}/image`;
  try {
    const response = await axios.post(baseURL, menu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const StepImageUpload = async (token, menu, menuId, stepnumber) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuId}/step_image/${stepnumber}`;
  try {
    const response = await axios.post(baseURL, menu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetPopularMenuDay = async () => {
  const baseURL =
    "https://cookclick-api.code.in.th/search/menu/popular?type=day";
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const GetPopularMenuMonth = async () => {
  const baseURL =
    "https://cookclick-api.code.in.th/search/menu/popular?type=month";
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const GetPopularMenuAll = async () => {
  const baseURL =
    "https://cookclick-api.code.in.th/search/menu/popular?type=all";
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const GetAllMember = async (token) => {
  const baseURL = "https://cookclick-api.code.in.th/admin/member";
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelMemberReport = async (token, reportID) => {
  const baseURL = `https://cookclick-api.code.in.th/reports/user/${reportID}`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const UnfavoriteMenu = async (token, menuid) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuid}/favorite`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelMenuReport = async (token, menuID) => {
  const baseURL = `https://cookclick-api.code.in.th/reports/menu/${menuID}`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DelMenuCommentReport = async (token, commentID) => {
  const baseURL = `https://cookclick-api.code.in.th/reports/comment/${commentID}`;
  try {
    const response = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const FavoriteMenu = async (token, menuid) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuid}/favorite`;
  try {
    const response = await axios.post(baseURL, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetCurrentMenuIfFavorited = async (token, menuid) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuid}/favorite`;
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const GetMyRatingOnMenu = async (token, menuid) => {
  const baseURL = `https://cookclick-api.code.in.th/menu/${menuid}/rating`;
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};

export const DecreaseMyIngredient = async (token, payload) => {
  const baseURL = "https://cookclick-api.code.in.th/me/ingredients";
  console.log(token);
  try {
    const response = await axios.delete(
      baseURL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      },
      
    );
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      return window.location.reload(false);
    }
    return null;
  }
};
