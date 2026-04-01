window.goToDashboard = function () {
  if (window.location.pathname.includes("/htmlfolders/")) {
    window.location.href = "../index.html";
    return;
  }
  window.location.href = "./index.html";
};

window.goToExplore = function () {
  if (window.location.pathname.includes("/htmlfolders/")) {
    window.location.href = "./explore.html";
    return;
  }
  window.location.href = "./htmlfolders/explore.html";
};

window.goToFavourites = function () {
  if (window.location.pathname.includes("/htmlfolders/")) {
    window.location.href = "./";
    return;
  }
  window.location.href = "./htmlfolders/";
};