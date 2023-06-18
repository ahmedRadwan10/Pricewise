import { fetchBanners } from "../redux/slices/bannerSlice";


export async function getBanners(dispatch, lang) {
    const response = await fetch(`/data/banners_${lang}.json`);
    const data = await response.json();
    dispatch(fetchBanners(data.banners));
}