/**
 * 获取公共静态图片资源
 */
export const GetPublicSource = (name) => {
    const path = `/src/assets/images/${name}`;
    const modules = import.meta.globEager('@/assets/images/*');
    return modules?.[path]?.default;
}

// 获取assets静态资源
export const getAssetsFile = (url) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href
}

// 获取assets静态资源
export const getAssets = (url) => {
    return new URL(`../assets/images/${url}`, import.meta.url)
}