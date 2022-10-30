import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OnlineService from "../../config/OnlineService";
import UserService from "../../config/UserService";

const initialStateUser = {
  userProfileList: [],
  onlineUserList: [],
  isLoading: false,
  isLoadMoreLoading: false,
  page: 0,
  userProfile: {
    authid: 0,
    username: "",
    email: "",
  },
};
/**
 * yönetilebilir fetch işlemleri için kullanılır. yapılan
 * api isteğinin durumunu kontrol ederek loading,error v.s.
 * konularını otomatize eder.
 * DİKKAT!! her thunk için benzersiz bir isim verin
 */
export const fetchSaveUserProfile = createAsyncThunk(
  "user/fetchSaveUserProfile",
  async (user) => {
    const result = await fetch(
      "http://34.69.208.110:9092/v1/api/user/newcreateuser",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Encoding": "br;q=1.0, gzip;q=0.8, *;q=0.1",
        },
        body: JSON.stringify(user),
      }
    )
      .then()
      .catch((err) => console.log("hata oldu....: ", err));
    return result;
  }
);

export const fetchGetAllUsers = createAsyncThunk(
  "user/fetchGetAllUsers",
  async (currentPage, thunkAPI) => {
    const result = await fetch(
      `http://34.69.208.110:9092/v1/api/user/findallslice?currentPage=${currentPage}&pageSize=8&sortParameter=id&direction=desc`
    )
      .then((p) => p.json())
      .catch((err) => console.log(err));
    return result;
  }
);

export const fetchDoOnline = createAsyncThunk(
  "user/fetchDoOnline",
  async (token) => {
    await axios
      .post(UserService.online, {
        token: token,
      })
      .then((res) => console.log("İşlem başarılı.....: ", res))
      .catch((err) => console.log("Hata....: ", err));
  }
);
export const fetchDoOffline = createAsyncThunk(
  "user/fetchDoOffline",
  async (token) => {
    await axios
      .post(UserService.offline, {
        token: token,
      })
      .then((res) => console.log("İşlem başarılı.....: ", res))
      .catch((err) => console.log("Hata....: ", err));
  }
);
export const fetchGetQuestions = createAsyncThunk(
  "user/fetchGetQuestions",
  async (token) => {
    return await axios
      .get(UserService.getquestion)
      .then((res) => res.data)
      .catch((err) => console.log("Hata....: ", err));
  }
);
export const fetchOnlineList = createAsyncThunk(
  "user/fetchOnlineList",
  async () => {
    const result = await axios
      .get(OnlineService.online)
      .then((res) => res.data)
      .catch((err) => console.log("Hata....: ", err));
    return result;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  /**
   * Daha çok elle müdehale edeceğini kodlamalar için
   * kullanılan methodlardır.
   */
  reducers: {
    /**
     * Burada state, yukarıda yazıdğımız  initialState
     * kavramını ifade eder. içindeki değerleri
     * değiştirmek için kullanılır.
     * Action, bu method a dışarıdan girilen dataları
     * ifade eder.
     */
    nextPage: (state) => {
      state.page = state.page++;
    },
    resetPage: (state) => {
      state.page = 0;
    },
    setAuthId: (state, action) => {
      state.userProfile = { ...state.userProfile, authid: action.payload };
    },
    setUsername: (state, action) => {
      state.userProfile = { ...state.userProfile, username: action.payload };
    },
    setEmail: (state, action) => {
      state.userProfile = { ...state.userProfile, email: action.payload };
    },
    setUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchSaveUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(fetchSaveUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    build.addCase(fetchSaveUserProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    build.addCase(fetchGetAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(fetchGetAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.page === 0) state.userProfileList = action.payload.content;
      else
        state.userProfileList = [
          ...state.userProfileList,
          ...action.payload.content,
        ];
    });
    build.addCase(fetchGetAllUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
    build.addCase(fetchOnlineList.fulfilled, (state, action) => {
      state.onlineUserList = action.payload;
    });
  },
});
export const {
  nextPage,
  setAuthId,
  setUsername,
  setEmail,
  setUserProfile,
  resetPage,
} = userSlice.actions;
export default userSlice.reducer;
