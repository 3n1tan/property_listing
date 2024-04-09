/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname:'lh3.googleusercontent.com',
            pathname: "**",
          },
          {
            protocol: 'https',
            hostname:'res.cloudinary.com',
            pathname: "**"
          },
          {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
            pathname: "**"
          },
          {
            protocol: 'https',
            hostname: 'www.vectorstock.com',
            pathname: "**"
          },
          ],
      },
};

export default nextConfig;
