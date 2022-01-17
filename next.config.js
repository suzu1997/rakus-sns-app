/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true, // Minify(コード圧縮)をSWCで実施するopt-in(高速になる)
  images: {
    domains: ["imgfp.hotp.jp"], // 外部URLの画像を使いたい時はここに登録
  },
};
