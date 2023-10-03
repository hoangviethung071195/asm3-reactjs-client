const currentUserKW = "currentUser";

// Hàm để thiết lập cookie
function setCookie(name: string, value: any, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
}

// Hàm để lấy giá trị từ cookie
function getCookie(name: string) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return JSON.parse(cookie.substring(cookieName.length, cookie.length));
    }
  }
  return null;
}

// Hàm để xóa cookie
function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function updateCurrentUser(user: UserModel) {
  setCookie(currentUserKW, user, 30); // Lưu user trong cookie trong 30 ngày
}

export function getCurrentUser(): UserModel {
  return getCookie(currentUserKW);
}

export function removeCurrentUser() {
  deleteCookie(currentUserKW);
}
