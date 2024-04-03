import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const error = ref();
  const user = ref();
  const userId = useCookie("USER_ID", {
    maxAge: 60 * 60,
  });
  const token = useCookie("MY_COOKIE", {
    maxAge: 60 * 60,
  });

  const setToken = (data) => (token.value = data);
  const setUser = (data) => (user.value = data);
  const setUserId = (data) => (userId.value = data);
  const setError = (data) => (error.value = data);

  const authUrl = "https://my.1tool.com/suite/api/auth/user";
  const userUrl = "https://my.1tool.com/suite/api/users";

  const signIn = async (data) => {
    try {
      const response = await $fetch(authUrl, {
        method: "POST",
        body: data,
      });
      setToken(response.api_token);
      setUserId(response.id);
      await fetchUser();
    } catch (err) {
      setToken();
      setUser();
      setError(err.data["message"]);
      console.log(err);
    }
  };

  const fetchUser = async () => {
    if (token.value && userId.value) {
      try {
        const response = await $fetch(userUrl + `/${userId.value}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        setUser(response);
      } catch (err) {
        setError(err.data["message"]);
        console.log(err);
      }
    }
  };
  const logout = async () => {
    setToken();
    setUser();
    setUserId();
    setError();
    const userIDCookie = useCookie("USER_ID");
    userIDCookie.value = null;
    await navigateTo("/welcome");
  };

  return {
    user,
    token,
    logout,
    signIn,
    fetchUser,
    setToken,
    setUser,
    setError,
    error,
  };
});
