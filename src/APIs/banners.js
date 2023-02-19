import { fetchBanners } from "../redux/redux/slices/bannerSlice";


export async function getBanners(dispatch) {
    const response = await fetch("/data/banners.json");
    const data = await response.json();
    dispatch(fetchBanners(data.banners));
}