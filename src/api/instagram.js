// This config info for generating access
// eslint-disable-next-line no-unused-vars
const facebookdev_config = {
  instagram_app_id: "338609591078354",
  instagram_secret: "feb01246a8966bc27aa937c0539d3457",
  short_access_token:
    "IGQVJVbGpzY3IxdkxyM3QtbVV3M2VYS0h1b0F6MlkwX1pMSEhNdFY3R2hpME52Ym9xYThoRmoxUWNrXzZAXdFEwYnB4bXA2NE9uMW9acXdYQ2N6TkpCSS10bzJMUzlQYm5fTEpuTy1OM1VCYk1PMUl2bEQzMi1KWFNlSVNB",
  user_id: 17841448489335119,
  redirect_uri: "https://www.jong-sun.com/auth",
};

// https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens
const long_access_token = {
  access_token:
    "IGQVJWRldGVVUzdTdBbVpTVDcwMFJEeVo0aUJEVzRPYkVUOVp2NDlnTTdiTVl0RTkyUUVWNFhxWlYzZAkYyQXU2cmNzVVh4RzMzclZABeGg0VDFJckdTTzcyTW1Ob2NSamthUWtGMGFn",
  token_type: "bearer",
  expires_in: 5101238,
  expires: "Sat, 01 Jan 2000 00:00:00 GMT",
};

export const instagramEndpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_type,permalink,media_url,username,timestamp&access_token=${long_access_token.access_token}`;
