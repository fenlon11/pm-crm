/** @type {import('next').NextConfig} */
const withLinaria = require('next-with-linaria');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/user-guide',
        destination: 'https://docs.twenty.com/user-guide/introduction',
        permanent: true,
      },
      {
        source: '/user-guide/section/:folder/:slug*',
        destination: 'https://docs.twenty.com/user-guide/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/user-guide/:folder/:slug*',
        destination: 'https://docs.twenty.com/user-guide/:folder/:slug*',
        permanent: true,
      },

      {
        source: '/developers',
        destination: 'https://docs.twenty.com/developers/introduction',
        permanent: true,
      },
      {
        source: '/developers/section/:folder/:slug*',
        destination: 'https://docs.twenty.com/developers/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/developers/:folder/:slug*',
        destination: 'https://docs.twenty.com/developers/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/developers/:slug',
        destination: 'https://docs.twenty.com/developers/:slug',
        permanent: true,
      },

      {
        source: '/pm-ui',
        destination: 'https://docs.twenty.com/pm-ui/introduction',
        permanent: true,
      },
      {
        source: '/pm-ui/section/:folder/:slug*',
        destination: 'https://docs.twenty.com/pm-ui/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/pm-ui/:folder/:slug*',
        destination: 'https://docs.twenty.com/pm-ui/:folder/:slug*',
        permanent: true,
      },
      {
        source: '/pm-ui/:slug',
        destination: 'https://docs.twenty.com/pm-ui/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = withLinaria(nextConfig);
