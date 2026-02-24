/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const { hostname, protocol } = apiUrl
  ? new URL(apiUrl)
  : { hostname: 'localhost', protocol: 'https:' }

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: protocol.replace(':', ''),
                hostname: hostname,
            },
        ],
    },
}

module.exports = nextConfig
