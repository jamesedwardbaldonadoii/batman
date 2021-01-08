export const API_URL =  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_PORT}`;
export const DOMAIN_TITLE = process.env.VUE_APP_DOMAIN_TITLE;
