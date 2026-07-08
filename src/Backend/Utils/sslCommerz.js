import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;

const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";

const sslcz = new SSLCommerzPayment(store_id, store_passwd, isLive);

export default sslcz;
